import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSize } from "../../hooks";
import { getColors } from "../../utils/randomColor";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieGraph = ({
  height,
  title,
  label,
  dataset = [],
  options = {},
}) => {
  const { height: calculatedHeight } = useSize();

  const data = dataset.map(({ data }) => data);
  const labels = dataset.map(({ label }) => label);
  const colors = dataset.every(({ color }) => Boolean(color))
    ? dataset.map(({ color }) => color)
    : getColors(dataset.length);

  const config = {
    labels,
    datasets: [
      {
        label,
        data,
        backgroundColor: colors,
        borderWidth: 3,
      },
    ],
  };

  const doughnutOptions = { maintainAspectRatio: false, ...options };

  const renderHeader = () => {
    if (title) {
      return (
        <header className="card-header">
          <p className="card-header-title">{title}</p>
        </header>
      );
    }

    return null;
  };

  return (
    <div className="card donneve-pie-graph">
      {renderHeader()}

      <div className="card-content">
        <div className="content">
          <Doughnut
            data={config}
            height={height ? height : calculatedHeight - 140}
            options={doughnutOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default PieGraph;
