// Adapted from: https://medium.com/@ridaarif16/creating-interactive-bar-charts-in-react-a-step-by-step-guide-f20b93ad9783

import { FC } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import { BloodData } from '../types'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
)

interface BarChartProps {
  bloodData: BloodData[]
}

const BarChart: FC<BarChartProps> = ({ bloodData }) => {
  console.log('Data in chart', bloodData)
  /* const data = {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    datasets: [
      {
        label: 'Data Series 1',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [12, 19, 25, 15, 20],
      },
      {
        label: 'Sample Data',
        data: [12, 19, 30, 15, 12],
        backgroundColor: ['green'],
      },
    ],
  } */

  const data = {
    labels: bloodData.map((data) => data.timestamp),
    datasets: [
      {
        label: 'Glucose',
        data: bloodData.map((data) => data.glucose),
        backgroundColor: 'rgba(190, 20, 20, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Carbs',
        data: bloodData.map((data) => data.carbs / 10),
        backgroundColor: 'rgba(10, 10, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Carbs Ratio',
        data: bloodData.map((data) => data.carbsRatio),
        backgroundColor: 'rgba(10, 200, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Sensitivity',
        data: bloodData.map((data) => data.sensitivity),
        backgroundColor: 'rgba(200, 200, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        display: true,
      },
    },
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 10,
        bottom: 5,
      },
      margin: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        border: { dash: [6, 6], display: true },
        grid: {
          display: true, // Display grid lines for the y-axis
        },
        ticks: {
          padding: 15,
        },
      },
      x: {
        beginAtZero: true,
        border: { display: true },
        grid: {
          display: false, // Display grid lines for the y-axis
        },
        ticks: {
          padding: 7,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 2,
        borderWidth: 0.7,
      },
    },
  }

  return (
    <div>
      <Bar
        data={data}
        options={options}
      />
    </div>
  )
}

export default BarChart
