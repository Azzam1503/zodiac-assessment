import PieChart from "./PieChart";
import BarChart from "./BarChart";
import LineChart from "./LineChart";

const Dashboard = () => {
  return (
    <div className="flex justify-center w-full">
      <div className="w-[30%]">
        <LineChart filters={[]} timeDimensions={[]} />
      </div>
      <div className="w-[30%]">
        <BarChart
          filters={[]}
          timeDimensions={[]}
          dimensions={["metrics.name"]}
        />
      </div>
      <div className="w-[30%]">
        <PieChart
          filters={[]}
          timeDimensions={[]}
          dimensions={["metrics.name"]}
        />
      </div>
    </div>
  );
};

export default Dashboard;
