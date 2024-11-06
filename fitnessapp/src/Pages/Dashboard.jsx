import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { counts } from "../Utils/Data";
import CountsCard from "../Components/Cards/CountsCard";
import WeeklyStatCard from "../Components/Cards/WeeklyStatCard";
import CategoryChart from "../Components/Cards/CategoryChart";
import WorkoutCard from "../Components/Cards/WorkoutCard";
import { addWorkout, getDashboardDetails, getWorkouts, getProfileData, deleteWorkout } from "../api";
import Dropdowns from "../Components/Cards/Dropdowns";
// import { isMobile } from 'react-device-detect';
import { screenSize  } from "../Utils/responsive";

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

const Dashboard = ({ currentUser }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [todaysWorkouts, setTodaysWorkouts] = useState([]);
  const [workout, setWorkout] = useState({});
  const [bodyWeight, setBodyWeight] = useState();
  const [isMobileView,isTabView,isDesktopView, isLargeDesktopView] = screenSize();

  const dashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("fittrack-app-token");
      const res = await getDashboardDetails(token);
      setData(res.data); // Set data immediately after receiving it
      console.log("Dashboard data:", res.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false); // Ensure loading is set to false after completion
    }
  };

  const getTodaysWorkout = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("fittrack-app-token");
      const res = await getWorkouts(token, "");
      setTodaysWorkouts(res.data);
      console.log("Today's workouts:", res.data);
    } catch (error) {
      console.error("Error fetching today's workouts:", error);
    } finally {
      setLoading(false);
    }
  };


  const addNewWorkout = async (newWorkout) => {
    try {
      setButtonLoading(true);
      const token = localStorage.getItem("fittrack-app-token");
      const res = await addWorkout(token, newWorkout);
      await dashboardData();
      await getTodaysWorkout();
    } catch (error) {
      console.error("Error adding new workout:", error);
      alert(error);
    } finally {
      setButtonLoading(false);
    }
  };

  const deleteExistingWorkout = async (workout_id) => {
    try {
      setButtonLoading(true);
      const token = localStorage.getItem("fittrack-app-token");
      await deleteWorkout(token, workout_id);
      await dashboardData();
      await getTodaysWorkout();
    } catch (error) {
      console.error("Error deleting workout:", error);
      alert(error);
    } finally {
      setButtonLoading(false);
    }
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("fittrack-app-token");
        const res = await getProfileData(token, currentUser.id);
        setBodyWeight(res.data.data.weight);
        console.log(`body weight ${bodyWeight, res.data.data.weight}`);
      } catch (err) {
        console.log(err)
        console.error("Failed to fetch profile data:", err);
      }
    };
    dashboardData();
    getTodaysWorkout();
    fetchProfileData();
  }, []);


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
          {(!isLargeDesktopView) ?
            <CategoryChart data={data} />
            :
            <Dropdowns workout={workout}
              setWorkout={setWorkout}
              addNewWorkout={addNewWorkout}
              buttonLoading={buttonLoading}
              userBodyWeight={bodyWeight} />}

          {(!isLargeDesktopView) ?
            <Dropdowns workout={workout}
              setWorkout={setWorkout}
              addNewWorkout={addNewWorkout}
              buttonLoading={buttonLoading}
              userBodyWeight={bodyWeight} />
            :
            <CategoryChart data={data} />}
        </FlexWrap>

        <Section>
          <Title>Todays Workouts</Title>
          <CardWrapper>
            {todaysWorkouts?.todayTotalWorkoutData?.map((workout) => (
              <WorkoutCard key={workout._id} workout={workout} deleteWorkout={deleteExistingWorkout} />
            ))}
          </CardWrapper>
        </Section>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;