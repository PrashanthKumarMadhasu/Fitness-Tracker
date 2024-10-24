import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../Utils/Data";
import CountsCard from "../Components/Cards/CountsCard";
import WeeklyStatCard from "../Components/Cards/WeeklyStatCard";
import CategoryChart from "../Components/Cards/CategoryChart";
import WorkoutCard from "../Components/Cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts, getProfileData } from "../api";
import Dropdowns from "../Components/Cards/Dropdowns";

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: center;
  padding: 22px 0px;
  overflow-y: scroll;
`;
const Wrapper = styled.div`
  flex: 1;
  max-width: 1400px;
  display: flex;
  flex-direction: column;
  gap: 22px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Title = styled.div`
  padding: 0px 16px;
  font-size: 22px;
  color: ${({ theme }) => theme.text_primary};
  font-weight: 500;
`;
const FlexWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const Section = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 16px;
  gap: 22px;
  padding: 0px 16px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;
const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 100px;
  @media (max-width: 600px) {
    gap: 12px;
  }
`;

const Dashboard = ({currentUser}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState({});
  const [bodyWeight, setBodyWeight] = useState();

  const dashboardData = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getDashboardDetails(token).then((res) => {
      setData(res.data);
      console.log(`data after setdata${data}`);
      console.log(res.data);
      setLoading(false);
    });
  };
  const getTodaysWorkout = async () => {
    setLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await getWorkouts(token, "").then((res) => {
      setTodaysWorkouts(res.data);
      console.log(`data after todayworkouts${todaysWorkouts}`);
      console.log(res.data);
      setLoading(false);
    });
  };

  
  const addNewWorkout = async (newWorkout) => {
    setButtonLoading(true);
    const token = localStorage.getItem("fittrack-app-token");
    await addWorkout(token, newWorkout )
      .then((res) => {
        dashboardData();
        getTodaysWorkout();
        // setButtonLoading(false);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    const fetchProfileData = async()=>{
      try {
        const token = localStorage.getItem("fittrack-app-token");
        const res = await getProfileData(token, currentUser.id);
        setBodyWeight(res.data.data.weight);
        console.log(`body weight ${bodyWeight,res.data.data.weight}`);
      } catch (err) {
        console.log(err)
        console.error("Failed to fetch profile data:", err);
      }
    };
    dashboardData();
    getTodaysWorkout();
    fetchProfileData();
  }, [currentUser]);

  
  return (
    <Container>
      <Wrapper>
        <Title>Dashboard</Title>
        <FlexWrap>
          {counts.map((item) => (
            <CountsCard item={item} content={data} />
          ))}
        </FlexWrap>

        <FlexWrap>
          <WeeklyStatCard data={data} />
          
          <Dropdowns workout={workout}
            setWorkout={setWorkout}
            addNewWorkout={addNewWorkout}
            buttonLoading={buttonLoading} 
            userBodyWeight={bodyWeight}/>

          <CategoryChart data={data} />
        </FlexWrap>

        <Section>
          <Title>Todays Workouts</Title>
          <CardWrapper>
            {todaysWorkouts?.todayTotalWorkoutData?.map((workout) => (
              <WorkoutCard key={workout._id} workout={workout} />
            ))}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;