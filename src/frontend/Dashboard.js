import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [turnover, setTurnover] = useState(0);
  const [incomeBreakdown, setIncomeBreakdown] = useState({});
  const [expenseBreakdown, setExpenseBreakdown] = useState({});

  const email = localStorage.getItem("email"); // Your logged-in email

  useEffect(() => {
    axios.post('http://localhost:3003/expensesdetail/summarydashboard', { email })
      .then(res => {
        setIncome(res.data.income);
        setExpenses(res.data.expenses);
        setTurnover(res.data.turnover);
        setIncomeBreakdown(res.data.incomeBreakdown || {});
        console.log("incomeBreakdown:",incomeBreakdown);
        setExpenseBreakdown(res.data.expenseBreakdown || {});
      })
      .catch(err => {
        console.error("Error fetching summary", err);
      });
  }, [email]);

  const pieData = {
    labels: ['Income', 'Expenses'],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#66bb6a', '#ef5350'],
       
      }
    ]
  };

  const pieOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label;
            const value = context.raw;
            const total = income + expenses;
            const percent = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
            return `${label}: ₹${value} (${percent}%)`;
          }
        }
      }
    }
  };

  const renderProgressBars = (data, total, colorClass = 'bg-success') => {

    return Object.entries(data).map(([category, amount]) => {

      const percent = total > 0 ? (amount / total) * 100 : 0;
      return (
        <div key={category} className="mb-3">
          <div className="d-flex justify-content-between">
            <strong>{category}</strong>
            <span>₹{amount} ({percent.toFixed(2)}%)</span>
          </div>
          <div className="progress">
            <div
              className={`progress-bar ${colorClass}`}
              role="progressbar"
              style={{  width: `${percent}%` }}
              aria-valuenow={percent}
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container my-5">
      <div className="row g-4">

        {/* Turnover + Pie */}
        <div className="col-md-4">
          <div className="card h-100 text-center">
            <div className="card-body">
              <h5 className="card-title">Total TurnOver: ₹{turnover}</h5>
              <p>Income: ₹{income}</p>
              <p>Expenses: ₹{expenses}</p>
              <hr />
              <h6>Income vs Expenses</h6>
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>
        </div>

        {/* Income Breakdown */}
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title text-center">Category-wise Income</h5>
              {renderProgressBars(incomeBreakdown,income,'bg-success')}
            </div>
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className="col-md-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title text-center">Category-wise Expenses</h5>
              {renderProgressBars(expenseBreakdown, expenses, 'bg-danger')}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}