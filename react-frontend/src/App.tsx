import Navbar from "./components/Navbar.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PieChart from "./components/PieChart.tsx";
import BarChart from "./components/BarChart.tsx";
import LineChart from "./components/LineChart.tsx";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<LineChart filters={[]} timeDimensions={[]} />}
        />
        <Route
          path="/bar"
          element={
            <BarChart
              filters={[]}
              timeDimensions={[]}
              dimensions={["metrics.name"]}
            />
          }
        />
        <Route
          path="/pie"
          element={
            <PieChart
              filters={[]}
              timeDimensions={[]}
              dimensions={["metrics.name"]}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
