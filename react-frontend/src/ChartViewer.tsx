import "chart.js/auto";
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2";
import { PivotConfig, ResultSet } from "@cubejs-client/core";
import { type ChartType } from "./type";
import { formatDate } from "./config";

interface ChartViewerProps {
  resultSet: ResultSet;
  pivotConfig: PivotConfig;
  chartType: ChartType;
  title?: string;
}

export function ChartViewer(props: ChartViewerProps) {
  const { resultSet, pivotConfig, chartType, title } = props;

  const data = {
    labels: resultSet.chartPivot(pivotConfig).map((row) => {
      const value = row.x;
      const parsedDate = new Date(value);
      return !isNaN(parsedDate.getTime()) ? formatDate(value) : value;
    }),
    datasets: resultSet.series(pivotConfig).map((item) => {
      return {
        fill: chartType === "area",
        label: item.title,
        data: item.series.map(({ value }) => value),
      };
    }),
  };

  const ChartElement = {
    area: Line,
    bar: Bar,
    doughnut: Doughnut,
    line: Line,
    pie: Pie,
  }[chartType as Exclude<ChartType, "table">];

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: !!title,
        text: title,
        font: {
          size: 18,
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },

    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxTicksLimit: undefined,
        },
        title: {
          display: true,
          text: "X Axis",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Y Axis",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%", minHeight: "300px" }}>
      <ChartElement data={data} options={options} />
    </div>
  );
}
