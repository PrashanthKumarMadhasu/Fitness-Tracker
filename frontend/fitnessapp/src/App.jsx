import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./Utils/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./Pages/Authentication";
//import { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Workouts from "./pages/Workouts";
import ForgotForm from "./Components/ForgotPassword/ForgotForm";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/forgot-password" element={<ForgotForm/>} />
        </Routes>
        {currentUser ? (
          <Container>
            <Navbar currentUser={currentUser} />
            <Routes>
              <Route path="/" exact element={<Dashboard />} />
              <Route path="/workouts" exact element={<Workouts/>} />  
            </Routes>
          </Container>
        ) : (
          <Container>
            <Authentication />
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
