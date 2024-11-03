import React from "react";
import styled from "styled-components";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useContext } from "react";
import { ThemeContext } from "../../Utils/ThemeContext";
import BarchartImage from '../Assets/SvgFiles/bar-chart.svg';

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  background-color:${({ theme }) => theme.card_background};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 16px;
  }
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

const BarGraph = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:100%;
  width:100%;
`;
const sum = (array) => array.reduce((acc, curr) => acc + curr, 0);

const WeeklyStatCard = ({ data }) => {

  const ColorValues = ['violet', 'indigo', 'blue', 'green', 'yellow', 'orange', 'red'];
  const { themeColor, setThemeColor } = useContext(ThemeContext);
  const totalCalories = sum(data?.weeklyCaloriesBurnt?.dayWiseCalories || []);

  return (
    <Card>
      <Title>Weekly Calories Burned</Title>
      {totalCalories > 0
        ? (
          <BarChart
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
            xAxis={[
              {
                scaleType: "band",
                data: data?.weeklyCaloriesBurnt?.weeks,
                colorMap: {
                  type: "ordinal",
                  values: data?.weeklyCaloriesBurnt?.weeks,
                  colors: ColorValues,
                },
              },
            ]}
            series={[{ data: data?.weeklyCaloriesBurnt?.dayWiseCalories }]}
            height={300}
          />
        )
        : (
          <BarGraph>
            <img src={BarchartImage} alt="bar-chart.svg" width={200} height={200} />
          </BarGraph>)
      }
    </Card>
  );
};

export default WeeklyStatCard;