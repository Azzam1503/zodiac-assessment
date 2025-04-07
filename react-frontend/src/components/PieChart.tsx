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

type Props = {
  filters: Filter[];
  timeDimensions?: TimeDimension[];
  dimensions?: string[];
};

function PieChart({ filters, timeDimensions, dimensions }: Props) {
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
    chartType: "pie" as ChartType,
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
    timeDimensions: timeDimensions?.length ? timeDimensions : [], // clear timestamp grouping
    dimensions: dimensions?.length
      ? dimensions
      : query.dimensions || ["metrics.name"],
  };

  return (
    <ChartLayout>
      <CubeProvider cubeApi={cubeApi}>
        <QueryRenderer query={configuredQuery} subscribe={useSubscription}>
          {({ resultSet }) => (
            <ChartViewer
              chartType={chartType}
              resultSet={resultSet}
              pivotConfig={pivotConfig}
              title="Value distribution over name"
            />
          )}
        </QueryRenderer>
      </CubeProvider>
    </ChartLayout>
  );
}

export default PieChart;
