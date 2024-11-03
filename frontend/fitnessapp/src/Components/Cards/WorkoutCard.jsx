import { FitnessCenterRounded, TimelapseRounded } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { MdDeleteOutline, MdDelete } from "react-icons/md";
import { deleteWorkout } from "../../api";

const Card = styled.div`
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  padding: 16px 18px;
  background-color:${({theme})=>theme.card_background};
  border: 1px solid ${({ theme }) => theme.text_secondary};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  display: flex;
  flex-direction: column;
  gap: 6px;
  @media (max-width: 600px) {
    padding: 12px 14px;
  }
`;

const HeaderContainer =styled.div`
  display:flex;
  align-items:center;
  wdith:100%;
  flex-direction:row;
  justify-content:space-between;
`;
const DeleteIcon =styled.div`
  color:#f03920;
  font-size:22px;
  cursor:pointer;
`;

const Category = styled.div`
  width: fit-content;
  font-size: 14px;
  color: ${({ theme }) => theme.primary};
  font-weight: 500;
  background: ${({ theme }) => theme.primary + 20};
  padding: 4px 10px;
  border-radius: 8px;
`;
const Name = styled.div`
  font-size: 20px;
  color: ${({ theme }) => (theme.theme==='true'?theme.white:theme.text_primary)};
  font-weight: 600;
`;
const Sets = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  display: flex;
  gap: 6px;
`;
const Flex = styled.div`
  display: flex;
  gap: 16px;
`;
const Details = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;
const Calories = styled.div`
font-size: 15px;
color: ${({ theme }) => theme.text_primary};
font-weight: 500;
display: flex;
align-items: center;
gap: 6px;
`;
const WorkoutCard = ({ workout, deleteWorkout }) => {
  return (
    <Card>
      <HeaderContainer>
        <Category>#{workout?.category}</Category>
        <DeleteIcon><MdDeleteOutline onClick={() => deleteWorkout(workout._id)}/></DeleteIcon> 
      </HeaderContainer>
      <Name>{workout?.exercise}</Name>
      <Sets>
        Count: {workout?.sets} sets X {workout?.reps} reps
      </Sets>
      <Flex>
        <Details>
          <FitnessCenterRounded sx={{ fontSize: "20px" }} />
          {workout?.weight} kg
        </Details>
        <Details>
          <TimelapseRounded sx={{ fontSize: "20px" }} />
          {workout?.duration} min
        </Details>
      </Flex>
      <Calories>
          Calories Burnt: {workout.caloriesBurned}
        </Calories>
    </Card>
  );
};

export default WorkoutCard;