'use client'

import React from 'react'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js'
import { PieChart } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);


export default function BestSellingProductsChart() {
    // <block:setup:1>
    const data = {
        labels: [
            'Green Leaf Lettuce',
            'Rainbow Chard',
            'Clementine',
            'Parsley'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100, 200],
            backgroundColor: [
                '#36a23f',
                '#ff6361',
                '#6200ff',
                '#516395'
            ],
            borderColor: [
                '#ffcc70',
                '#86a8e7',
                '#eece13',
                '#516395'
            ],
            borderWidth: 1
        }]
    };

  
    return (
        <div className='  bg-white dark:bg-black p-8 rounded-lg shadow-xl sm:grid-col-1' >
            <h2 className='text-xl font-bold mb-4 text-black dark:text-white '>Best Selling Charts</h2>
            {/* Chart */}
            <div className='p-4'>
                <Pie data={data}  width={80} height={80} />
            </div>
        </div>

    )
}