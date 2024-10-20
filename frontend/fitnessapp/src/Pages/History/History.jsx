import React from "react";
import "./History.css"; 

const workoutHistory = [
  {
    date: "2024-10-18",
    workouts: ["Push-ups", "Running", "Squats"],
    totalCalories: 450,
    totalDuration: "1 hour",
    weight: "60kg",
  },
  {
    date: "2024-10-17",
    workouts: ["Cycling", "Pull-ups"],
    totalCalories: 350,
    totalDuration: "45 minutes",
    weight: "61kg",
  },
];

const History = () => {
  return (
    <div className="workout-history-container">
      <table className="workout-history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Workouts</th>
            <th>Total Duration</th>
            <th>Total Calories</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {workoutHistory.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>
                <select className="workout-dropdown">
                  {entry.workouts.map((workout, i) => (
                    <option key={i}>{workout}</option>
                  ))}
                </select>
              </td>
              <td>{entry.totalDuration}</td>
              <td>{entry.totalCalories} kcal</td>
              <td>{entry.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
