import React, { useEffect, useState } from "react";
import "./History.css";
import { getWorkoutHistory } from "../../api";

const History = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [bodyWeightMap, setBodyWeightMap] = useState({});

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      const token = localStorage.getItem("fittrack-app-token");
      try {
        const res = await getWorkoutHistory(token);
        const workoutData = res.data.workoutData;
        const weightMap = res.data.userWeightLogDataFormat.reduce((acc, log) => {
          acc[log.date] = log.userBodyWeight;
          return acc;
        }, {});

        setWorkoutHistory(workoutData);
        setBodyWeightMap(weightMap);
      } catch (error) {
        console.error("Error fetching workout history:", error);
      }
    };

    fetchWorkoutHistory();
  }, []);

  return (
    <div className="workout-history-container">
      <div className="scrollable-table-container"> 
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
                <td style={{fontWeight:600}}>{entry.date}</td>
                <td>
                  <select className="workout-dropdown">
                    {entry.exercises.map((workout, i) => (
                      <option key={i}>{workout}</option>
                    ))}
                  </select>
                </td>
                <td>{entry.totalDuration} min</td>
                <td>{entry.totalCalories} kcal</td>
                <td>{bodyWeightMap[entry.date] || '0'} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
