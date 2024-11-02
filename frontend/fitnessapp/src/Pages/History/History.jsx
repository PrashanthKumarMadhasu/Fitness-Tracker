import React, { useEffect, useState } from "react";
import "./History.css";
import styled, { keyframes, css } from "styled-components";
import { getWorkoutHistory } from "../../api";
import { LineChart } from '@mui/x-charts/LineChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useContext } from "react";
import { ThemeContext } from "../../Utils/ThemeContext";

const HistoryTab =styled.div`
display:flex;
  font-weight: 600;
  font-size: 16px;
  padding: 10px 0;
  width:100%;
  align-items:center;
  cursor:pointer;
  justify-content:center;
  background-color:${({theme, selected})=>selected?theme.selected_tab_bg:theme.tab_bg};
  border:2px solid ${({theme})=>theme.theme==='true'?theme.card_border:theme.black};
  border-radius:10px;
  color:${({theme, selected})=>selected?theme.selected_tab_text:theme.tab_text};
  transition: background-color 1s ease;
  ${({ animate ,theme ,selected}) =>
    animate &&
    css`
      animation:${selected?blueBackgroundAnimation:whiteBackgroundAnimation}3s forwards;
    `}
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const blueBackgroundAnimation = keyframes`
  0% {
    background-color:  ${({theme})=>theme.tab_bg};
  }
  100% {
    background-color: ${({theme})=>theme.selected_tab_bg};
  }
`;
const GraphTab =styled.div`
display:flex;
  font-weight: 600;
  font-size: 16px;
  padding: 10px 0;
  width:100%;
  align-items:center;
  cursor:pointer;
  justify-content:center;
  background-color:${({theme, selected})=>selected?theme.selected_tab_bg:theme.tab_bg};
  border:2px solid ${({theme})=>theme.theme==='true'?theme.card_border:theme.black};
  border-radius:10px;
  color:${({theme, selected})=>selected?theme.selected_tab_text:theme.tab_text};
  transition: background-color 3s ease;
  ${({ animate ,theme ,selected}) =>
    animate &&
    css`
      animation:${selected?blueBackgroundAnimation:whiteBackgroundAnimation}3s forwards;
    `}
  @media (max-width: 600px) {
    font-size: 14px;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
const whiteBackgroundAnimation =keyframes`
  0% {
    background-color: ${({theme})=>theme.selected_tab_bg};
  }
  100% {
    background-color: ${({theme})=>theme.tab_bg};
  }
`
const History = () => {
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [bodyWeightMap, setBodyWeightMap] = useState({});
  const [graphData, setGraphData] = useState([]);
  const { themeColor, setThemeColor } = useContext(ThemeContext);
  const [historyTab, setHistoryTab] = useState(true);

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

        setGraphData(chartData.reverse());
      } catch (error) {
        console.error("Error fetching workout history:", error);
      }
    };

    fetchWorkoutHistory();
  }, []);

  return (
    <div className="workout-history-container">
      <div className="history-graph-tabs">
        <HistoryTab selected={historyTab} onClick={()=>setHistoryTab(true)}>Workout Hitory</HistoryTab>
        <GraphTab selected={!historyTab} onClick={()=>setHistoryTab(false)}> Weight Graph</GraphTab>
      </div>
      {historyTab ?
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
        :
        <div className="weight-graph">
          <div className="line-chart">
            <LineChart
              sx={{
                [`.${axisClasses.root}`]: {
                  [`.${axisClasses.tickLabel}`]: {
                    fill: themeColor ? "#ddd" : "#000000", // Customize label color for axes
                  },
                  [`& line`]: {
                    stroke: themeColor ? "#ddd" : "#000000", // Customize axis line color
                  },
                },
              }}
              dataset={graphData} // Use the combined dataset
              xAxis={[{ dataKey: "x", scaleType: "time" }]}
              series={[
                {
                  dataKey: "y", // Reference y values
                  label: 'Weight (kg)',
                  color: themeColor ? '#245BFF' : '#245BFF',
                },
              ]}
              grid={{ vertical: true, horizontal: true }}
              width={550}
              height={330}

            />
          </div>
        </div>
      }
    </div>
  );
};

export default History;
