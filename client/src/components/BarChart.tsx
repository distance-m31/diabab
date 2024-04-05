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
import { calculateInsulin } from '../utils/insulinCalc'

import Text from './Text'

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
  const pad = (number: number) => ('0' + number).slice(-2)

  const getDateLabel = (dateString: string) => {
    const date = new Date(dateString)
    const ret =
      pad(date.getDay()) +
      '.' +
      pad(date.getMonth() + 1) +
      '.' +
      date.getFullYear()
    return ret
  }

  const getTimeLabel = (dateString: string) => {
    const date = new Date(dateString)
    const ret =
      pad(date.getDay()) +
      '/' +
      pad(date.getMonth() + 1) +
      ' ' +
      pad(date.getHours()) +
      ':' +
      pad(date.getMinutes())
    return ret
  }

  const glucoseData = {
    labels: bloodData.map((data) => getTimeLabel(data.timestamp)),
    datasets: [
      {
        label: 'Glucose Level',
        data: bloodData.map((data) => data.glucose),
        backgroundColor: 'rgba(220, 220, 20, 0.6)',
        borderColor: 'rgba(150, 150, 150, 1)',
        borderWidth: 2,
        barThickness: 40,
        maxBarThickness: 50,
      },
      {
        label: 'Calculated Insulin',
        data: bloodData.map((data) =>
          calculateInsulin(
            6,
            data.glucose,
            data.carbs,
            data.carbsRatio,
            data.sensitivity
          )
        ),
        backgroundColor: 'rgba(22, 220, 20, 0.6)',
        borderColor: 'rgba(150, 150, 150, 1)',
        borderWidth: 2,
        barThickness: 40,
        maxBarThickness: 50,
      },
    ],
  }

  const carbsData = {
    labels: bloodData.map((data) => getTimeLabel(data.timestamp)),
    datasets: [
      {
        label: 'Carbohydrate Intake',
        data: bloodData.map((data) => data.carbs),
        backgroundColor: 'rgba(10, 100, 232, 0.6)',
        borderColor: 'rgba(150, 150, 150, 1)',
        borderWidth: 2,
        barThickness: 40,
        maxBarThickness: 50,
      },
    ],
  }

  const calcPrm = {
    labels: bloodData.map((data) => getTimeLabel(data.timestamp)),
    datasets: [
      {
        label: 'Used Carbohydrate Ratio',
        data: bloodData.map((data) => data.carbsRatio),
        backgroundColor: 'rgba(100, 100, 132, 0.6)',
        borderColor: 'rgba(150, 150, 150, 1)',
        borderWidth: 2,
        barThickness: 40,
        maxBarThickness: 50,
      },
      {
        label: 'Used Sensitivity',
        data: bloodData.map((data) => data.sensitivity),
        backgroundColor: 'rgba(200, 200, 132, 0.6)',
        borderColor: 'rgba(150, 150, 150, 1)',
        borderWidth: 2,
        barThickness: 40,
        maxBarThickness: 50,
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
          display: false, // Display grid lines for the x-axis
        },
        ticks: {
          padding: 7,
        },
      },
    },
    elements: {
      bar: {
        borderRadius: 3,
        borderWidth: 0.7,
      },
    },
  }
  const historyLabel = () => {
    if (bloodData.length === 0) {
      return 'No history available'
    }

    const firstDate = bloodData[0].timestamp
    const lastDate = bloodData[bloodData.length - 1].timestamp

    return (
      'History for ' + getDateLabel(firstDate) + ' - ' + getDateLabel(lastDate)
    )
  }
  return (
    <div className="text-center">
      <Text variant="h2">{historyLabel()}</Text>
      <Bar
        data={glucoseData}
        options={options}
      />
      <Bar
        data={carbsData}
        options={options}
      />
      <Bar
        data={calcPrm}
        options={options}
      />
    </div>
  )
}

export default BarChart
