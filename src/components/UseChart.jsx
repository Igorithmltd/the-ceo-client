// App.js
import React from 'react';
import ExpenseChart from './ExpenseChart';

const expenseData = {
    January: { Rent: 1000, Food: 300, Utilities: 200, Entertainment: 150 },
    February: { Rent: 1000, Food: 350, Utilities: 220, Entertainment: 100 },
    March: { Rent: 1000, Food: 280, Utilities: 210, Entertainment: 180 },
    // Add more months as needed
};

const App = () => {
    return (
        <div>
            <h1>Monthly Expenses</h1>
            <ExpenseChart
                expenseData={expenseData}
                barColors={['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)']}
                labels={{ current: 'Selected Month Expenses', previous: 'Previous Month Expenses' }}
                defaultMonth="February"
                stacked={true}
            />
        </div>
    );
};

export default App;
