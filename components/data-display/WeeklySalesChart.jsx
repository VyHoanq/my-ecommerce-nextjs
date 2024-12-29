'use client';

import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker'; // Ensure this is the correct import
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title
);

export default function WeeklyBookChart() {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
        text: 'Weekly Book Chart',
      },
    },
  };

  const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const tabs = [
    {
      title: 'Sales',
      type: 'Sales',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Sales',
            data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })), // Corrected Faker API
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      },
    },
    {
      title: 'Orders',
      type: 'Orders',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Orders',
            data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })), // Corrected Faker API
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
          },
        ],
      },
    },
  ];

  const [chartToDisplay, setChartToDisplay] = useState(tabs[0].type);

  return (
    <div className="dark:bg-black bg-slate-50 p-8 rounded-lg shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-50">
        Weekly Sales
      </h2>
      <div className="p-4">
        {/* Tabs */}
        <div className="text-sm font-medium text-center border-b border-gray-100 text-black dark:text-white dark:border-gray-700">
          <ul className="flex flex-wrap -mb-px">
            {tabs.map((tab, i) => (
              <li className="me-2" key={i}>
                <button
                  onClick={() => setChartToDisplay(tab.type)}
                  className={
                    chartToDisplay === tab.type
                      ? 'inline-block p-4 text-orange-600 border-b-2 border-orange-600 rounded-t-lg active dark:text-orange-500 dark:border-orange-500'
                      : 'inline-block p-4 border-b-2 border-transparent rounded-t-lg dark:text-white hover:text-gray-700 hover:border-gray-100 dark:border-gray-300 dark:hover:text-gray-100'
                  }
                >
                  {tab.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content to display */}
        {tabs.map((tab, i) =>
          chartToDisplay === tab.type ? (
            <Line key={i} options={options} data={tab.data} />
          ) : null
        )}
      </div>
    </div>
  );
}
