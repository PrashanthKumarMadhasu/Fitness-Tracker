import React, { useState, useEffect } from 'react';
import './LaunchWorkout.css';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { addRemainder, getRemainders } from '../../api';
import RemainderCard from './RemainderCard';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Card = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  min-width: 280px;
  width:400px;
  padding: 24px;
  background-color:${({theme})=>theme.card_background};
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
  border-radius: 14px;
  box-shadow: 1px 6px 20px 0px ${({ theme }) => theme.primary + 15};
  flex-direction: column;
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

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Section = styled.div`
  margin-top:20px;
  display: flex;
  width:100%;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const LaunchWorkout = () => {
  const [remainderData, setRemainderData] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [loading, setLoading] = useState(false);


  const getAllRemainders = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    try {
      const res = await getRemainders(token, "");
      setRemainderData(res.data.planData || []);
      console.log(`after getting ${JSON.stringify(res.data.planData)}`);
    } catch (err) {
      console.error("Failed to fetch remainders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllRemainders();
  }, []);

  const addNewRemainder = async (newRemainder) => {
    const token = localStorage.getItem("fittrack-app-token");
    try {
      await addRemainder(token, newRemainder);
      setInputValues({}); // Clear input fields
      getAllRemainders();
    } catch (err) {
      alert(err);
    }
  };

  const handleInputChange = (e, name) => {
    setInputValues({ ...inputValues, [name]: e.target.value });
  };

  const handleRemainder = () => {
    const sample = { ...inputValues, remainder: 'true' };
    console.log(`add after ${JSON.stringify(sample)}`);
    addNewRemainder(sample);
  }


  return (
    <div className="setWorkout-container">
      <div className='Remainder-wrapper'>
      <Card>
        <Title>Add Workout Plan</Title>
        <div className="date-time">
          <input type="date" className='date-field' name='date' value={inputValues['date'] || ''} onChange={(e) => handleInputChange(e, 'date')} />
          <input type="time" className='time-field' name='time' value={inputValues['time'] || ''} onChange={(e) => handleInputChange(e, 'time')} />
        </div>
        <label htmlFor="message" className='plan-label'>List out Workouts/Diet :</label>
        <textarea className='addWorkout-text-field' name='message'
          value={inputValues['message'] || ''}
          onChange={(e) => handleInputChange(e, 'message')}
          rows={10}
          placeholder={`
          #Category
          -Workout Name
          -Sets
          -Reps
          -Weight
          -Duration`} />
        <div className='add-remainder-button'>
          <Button variant="outline-primary" onClick={handleRemainder}>Add</Button>
        </div>
      </Card>
      <Section>
        <Title>Remainders </Title>
        <CardWrapper>
          {remainderData?.map((itemData, index) => (
            <RemainderCard key={index} remainderData={itemData} />
          ))}
        </CardWrapper>
      </Section>
      </div>
    </div>
  )
}

export default LaunchWorkout;