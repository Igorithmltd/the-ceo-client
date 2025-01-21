// ExpenseChart.js
import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const ExpenseChart = ({
    expenseData,
    barColors = ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)'],
    labels = { current: 'Current Month Expenses', previous: 'Previous Month Expenses' },
    defaultMonth,
    stacked = true,
}) => {
    const [selectedMonth, setSelectedMonth] = useState(defaultMonth || Object.keys(expenseData)[0]);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
    };

    const getPreviousMonth = (month) => {
        const months = Object.keys(expenseData);
        const currentIndex = months.indexOf(month);
        return months[currentIndex - 1] || months[months.length - 1];
    };

    const selectedData = expenseData[selectedMonth];
    const previousMonth = getPreviousMonth(selectedMonth);
    const previousData = expenseData[previousMonth];

    const chartData = {
        labels: Object.keys(selectedData),
        datasets: [
            {
                label: labels.current.replace('Current', selectedMonth),
                data: Object.values(selectedData),
                backgroundColor: barColors[0],
                stack: 'Stack 0',
            },
            {
                label: labels.previous.replace('Previous', previousMonth),
                data: Object.values(previousData),
                backgroundColor: barColors[1],
                stack: 'Stack 1',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                stacked: stacked,
            },
            y: {
                stacked: stacked,
            },
        },
    };

    return (
        <div>
            <select value={selectedMonth} onChange={handleMonthChange}>
                {Object.keys(expenseData).map((month) => (
                    <option key={month} value={month}>
                        {month}
                    </option>
                ))}
            </select>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default ExpenseChart;
