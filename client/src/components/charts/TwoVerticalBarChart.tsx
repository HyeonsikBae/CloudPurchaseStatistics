import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface VerticalBarChartProps {
  datas1: number[];
  datas2: number[];
  label1: string;
  label2: string;
  title: string;
  labels: string[];
}

const TwoVerticalBarChart = (props: VerticalBarChartProps): JSX.Element => {
  const { datas1, label1, datas2, label2, title, labels } = props;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: label1,
        data: datas1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: label2,
        data: datas2,
        backgroundColor: "rgba(132, 99, 255, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default React.memo(TwoVerticalBarChart);
