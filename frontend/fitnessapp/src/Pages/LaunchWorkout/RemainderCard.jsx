import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Form from 'react-bootstrap/Form';
import AccessAlarmRoundedIcon from '@mui/icons-material/AccessAlarmRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import FlagRoundedIcon from '@mui/icons-material/FlagRounded';

const Card = styled.div`
  min-width: 250px;
  max-width: 450px;
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

const Details = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
  width:100%;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Flex = styled.div`
  display: flex;
  gap: 16px;
`;
const ToggleSwitch =styled.div`
  display:flex;
  width:100%;
  justify-content:flex-end;
  align-items:flex-end;
`;
const RemainderCard = ({ remainderData }) => {
  const[remainder,setRemainder] = useState(true);

  const handleRemainder = ()=>{
    setRemainder(!remainder);
  };

    return (
        <Card>
            <Flex>
                <Details>
                    <CalendarMonthRoundedIcon sx={{ fontSize: "20px" }} />
                    {remainderData?.remainderDate}
                </Details>
            </Flex>
            <Flex>
            <Details>
                    <AccessAlarmRoundedIcon sx={{ fontSize: "20px" }} />
                    {remainderData?.remainderTime}
                </Details>
            </Flex>
            <Flex>
                <FlagRoundedIcon sx={{ fontSize: "20px" }} />
                {remainderData?.remainderMessage}
            </Flex>
            <Form>
                <Form.Check 
                    type="switch"
                    id="custom-switch"
                    label={`remainder ${remainder?'on':'off'}`}
                    isValid={remainder}
                    isInvalid={!remainder}
                    onChange={handleRemainder}
                    checked={remainder}
                />
            </Form>
        </Card>
    );
};

export default RemainderCard;