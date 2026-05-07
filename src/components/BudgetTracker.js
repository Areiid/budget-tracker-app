import React, { useState } from "react";
import "./BudgetTracker.css";

function BudgetTracker({ user, onLogout }) {
  const [inputValue, setInputValue] = useState("");
  const [balance, setBalance] = useState(0);
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

  const handleAmountChange = (event) => {
    setInputValue(event.target.value);
    setMessage("");
  };

  const updateBalance = (amount, type) => {
    const nextBalance = type === "income" ? balance + amount : balance - amount;
    setBalance(Number(nextBalance.toFixed(2)));

    const entry = {
      id: Date.now(),
      type,
      amount,
      label: type === "income" ? "Income" : "Expense",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setHistory((current) => [entry, ...current]);
    setInputValue("");
  };

  const handleAction = (type) => {
    const amount = parseFloat(inputValue);
    if (Number.isNaN(amount) || amount <= 0) {
      setMessage("Please enter a valid positive amount.");
      return;
    }

    updateBalance(amount, type);
    setMessage(`Recorded ${type === "income" ? "income" : "expense"} of $${amount.toFixed(2)}.`);
  };

  const handleReset = () => {
    setBalance(0);
    setHistory([]);
    setInputValue("");
    setMessage("Budget reset.");
  };

  return (
    <div className="budget-wrapper">
      <div className="budget-container">
        {user && (
          <div className="budget-login-row">
            <p className="budget-welcome">Welcome, {user}.</p>
            <button className="logout-button" type="button" onClick={onLogout}>
              Log out
            </button>
          </div>
        )}

        <h1 className="budget-title">Budget Tracker</h1>
        <p className="budget-balance">Current balance: ${balance.toFixed(2)}</p>

        <div className="input-section">
          <div className="input-row">
            <label className="input-label" htmlFor="amount">
              Amount
            </label>
            <input
              id="amount"
              className="amount-input"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter an amount"
              value={inputValue}
              onChange={handleAmountChange}
            />
          </div>

          <div className="input-row">
            <button className="action-button" type="button" onClick={() => handleAction("income")}>Income</button>
            <button className="action-button" type="button" onClick={() => handleAction("expense")}>Expense</button>
          </div>

          <button className="reset-button" type="button" onClick={handleReset}>
            Reset Budget
          </button>

          {message && <div className="reset-notice">{message}</div>}
        </div>

        <div className="history-box">
          <h2 className="history-title">Transaction History</h2>
          {history.length === 0 ? (
            <p className="reset-notice">No transactions yet. Add income or expense to get started.</p>
          ) : (
            <ul className="history-list">
              {history.map((entry) => (
                <li key={entry.id}>
                  <strong>{entry.label}:</strong> {entry.type === "income" ? "+" : "-"}${entry.amount.toFixed(2)} <span>• {entry.timestamp}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default BudgetTracker;
