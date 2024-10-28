import React from "react";
import styled from "styled-components";
import { PieChart } from "@mui/x-charts/PieChart";
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useContext } from "react";
import { ThemeContext } from "../../Utils/ThemeContext";

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

const CategoryChart = ({ data }) => {
  const {themeColor, setThemeColor} = useContext(ThemeContext);
  return (
    <Card>
      <Title>Workout Categories</Title>
      {data?.pieChartData && (
        <PieChart
          sx={{
            [`.${axisClasses.root}`]: {
              [`.${axisClasses.tickLabel}`]: {
                fill: themeColor ? "#ddd" : "#000000", // Customize label color for axes
              }
            },
          }}
          series={[
            {
              data: data?.pieChartData,
              innerRadius: 20,
              outerRadius: 100,
              paddingAngle: 5,
              cornerRadius: 5,
            },
          ]}
          height={300}
        />
      )}
    </Card>
  );
};

export default CategoryChart;