import React, { useEffect, useState } from "react";
import "./History.css";
import styled from "styled-components";
import { getWorkoutHistory } from "../../api";
import { LineChart } from '@mui/x-charts/LineChart';

const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  padding-top: 5px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const History = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [bodyWeightMap, setBodyWeightMap] = useState({});
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchWorkoutHistory = async () => {
      const token = localStorage.getItem("fittrack-app-token");
      try {
        const res = await getWorkoutHistory(token);
        console.log(
          `resonse history ${JSON.stringify(res.data.userWeightLogDataFormat)}`
        );
        const workoutData = res.data.workoutData;
        const weightMap = res.data.userWeightLogDataFormat.reduce(
          (acc, log) => {
            acc[log.date] = log.userBodyWeight;
            return acc;
          },
          {}
        );

        setWorkoutHistory(workoutData);
        setBodyWeightMap(weightMap);
        const chartData = res.data.userWeightLogDataFormat.map((log) => ({
          x: new Date(log.date), // Convert date string to Date object for time scaling
          y: Number(log.userBodyWeight),
        }));
  
        setGraphData(chartData);
      } catch (error) {
        console.error("Error fetching workout history:", error);
      }
    };

    fetchWorkoutHistory();
  }, []);

  return (
    <div className="workout-history-container">
      <Title> Workout History</Title>
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
                <td style={{ fontWeight: 600 }}>{entry.date}</td>
                <td>
                  <select className="workout-dropdown">
                    {entry.exercises.map((workout, i) => (
                      <option key={i} className="drop-opt">
                        {workout}
                      </option>
                    ))}
                  </select>
                </td>
                <td>{entry.totalDuration} min</td>
                <td>{entry.totalCalories} kcal</td>
                <td>{bodyWeightMap[entry.date] || "0"} kg</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Weight Graph</h3>
        <div>
          <LineChart
            dataset={graphData} // Use the combined dataset
            xAxis={[{ dataKey: "x", scaleType: "time" }]}
            series={[
              {
                dataKey: "y", // Reference y values
              },
            ]}
            // xAxis={[{ data: graphData,scaleType: "time" }]}
            // series={[
            //   {
            //     data: graphValues,
            //   },
            // ]}
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default History;
