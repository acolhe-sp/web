import React from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/auto';

function ChartAnalytics({ chartData }) {
    return <Line data={chartData} style={{ maxHeight: '300px', width: '100%', height: '200px'}} />
}

export default ChartAnalytics;