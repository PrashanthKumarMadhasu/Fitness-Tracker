import React from "react";
import styled from "styled-components";

const Card = styled.div`
  flex: 1;
  min-width: 200px;
  padding: 24px;
  background-color:${({theme})=>theme.card_background};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 14px;
  display: flex;
  gap: 6px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 600px) {
    gap: 6px;
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
const Value = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  align-items: end;
  gap: 8px;
  color: ${({ theme }) => (theme.theme==='true'?theme.white:theme.text_primary)};
  @media (max-width: 600px) {
    font-size: 22px;
  }
`;
const Unit = styled.div`
  font-size: 14px;
  margin-bottom: 8px;
`;
const Span = styled.div`
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 16px;
  @media (max-width: 600px) {
    font-size: 12px;
  }

  ${({ positive, theme }) =>
    positive
      ? `
  color: ${theme.green};`
      : `
  color: ${theme.red};`}
`;
const Icon = styled.div`
  height: fit-content;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  ${({ color, bg }) => `
  background: ${bg};
  color: ${color};
  `}
`;

const Desc = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.desc};
  margin-bottom: 6px;
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const CountsCard = ({ item, content }) => {
  const value =
    item.name === "Calories Burned"
      ? content?.totalCaloriesBurntPercen || 0
      : item.name === "Workouts"
      ? content?.totalWorkoutsPercen || 0
      : content?.avgCaloriesPerWorkoutPercen || 0;

  // Determine if the value is positive or negative
  const isPositive = value >= 0;
  return (
    <Card>
      <Left>
        <Title>{item.name}</Title>
        <Value>
        {(item.name === "Calories Burned") ? (content?.totalCaloriesBurnt||0):
            (item.name === "Workouts") ? (content?.totalworkouts||0): (content?.avgCaloriesPerWorkOut||0)}
          <Unit>{item.unit}</Unit>
          <Span positive={isPositive}> ({value})%</Span>
        </Value>
        <Desc>{item.desc}</Desc>
      </Left>
      <Icon color={item.color} bg={item.lightColor}>
        {item.icon}
      </Icon>
    </Card>
  );
};

export default CountsCard;