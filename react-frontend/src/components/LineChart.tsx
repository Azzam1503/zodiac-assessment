import cube, {
  PivotConfig,
  Query,
  TimeDimension,
  Filter,
} from "@cubejs-client/core";
import { CubeProvider } from "@cubejs-client/react";
import WebSocketTransport from "@cubejs-client/ws-transport";
import { ChartViewer } from "../ChartViewer.tsx";
import { extractHashConfig } from "../config";
import { QueryRenderer } from "../QueryRenderer.tsx";
import { ChartType, Config } from "../type";
import ChartLayout from "./Layout.tsx";
import { useState } from "react";

type Props = {
  filters: Filter[];
  timeDimensions?: TimeDimension[];
};

function LineChart({ filters, timeDimensions }: Props) {
  const [granularity, setGranularity] = useState<
    "day" | "week" | "month" | "year"
  >("week");

  const {
    apiUrl,
    apiToken,
    query,
    pivotConfig,
    chartType,
    useWebSockets,
    useSubscription,
  } = extractHashConfig({
    apiUrl: import.meta.env.VITE_CUBE_API_URL || "",
    apiToken: import.meta.env.VITE_CUBE_API_TOKEN || "",
    query: JSON.parse(import.meta.env.VITE_CUBE_QUERY || "{}") as Query,
    pivotConfig: JSON.parse(
      import.meta.env.VITE_CUBE_PIVOT_CONFIG || "{}"
    ) as PivotConfig,
    chartType: "line" as ChartType,
    websockets: import.meta.env.VITE_CUBE_API_USE_WEBSOCKETS === "true",
    subscription: import.meta.env.VITE_CUBE_API_USE_SUBSCRIPTION === "true",
  } as Config);

  let transport = undefined;

  if (useWebSockets) {
    transport = new WebSocketTransport({ authorization: apiToken, apiUrl });
  }

  const cubeApi = cube(apiToken, { apiUrl, transport });

  const configuredQuery: Query = {
    ...query,
    filters: filters.length > 0 ? filters : query.filters || [],
    timeDimensions: timeDimensions?.length
      ? timeDimensions
      : [
          {
            dimension: "metrics.timestamp",
            granularity,
          },
        ],
  };

  function handleGranularityChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ): void {
    setGranularity(event.target.value as "day" | "week" | "month" | "year");
  }

  return (
    <div>
      <div className="w-full max-w-xs absolute top-45 left-200">
        <select
          id="granularity"
          value={granularity}
          onChange={handleGranularityChange}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <ChartLayout>
        <CubeProvider cubeApi={cubeApi}>
          {/* Add the select tag above the chart title */}
          <QueryRenderer query={configuredQuery} subscribe={useSubscription}>
            {({ resultSet }) => (
              <ChartViewer
                chartType={chartType}
                resultSet={resultSet}
                pivotConfig={pivotConfig}
                title="Value distribution over timestamp"
              />
            )}
          </QueryRenderer>
        </CubeProvider>
      </ChartLayout>
    </div>
  );
}

export default LineChart;
