import { ThemeProvider, styled } from "styled-components";
import { lightTheme,darkTheme } from "./Utils/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./Pages/Authentication";
import { useState, useEffect, useContext} from "react";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import History from "./pages/History/History";
import Tutorials from "./Pages/Tutorials/Tutorials";
import LaunchWorkout from "./Pages/LaunchWorkout/LaunchWorkout";
import Bmi from "./Components/BMI/Bmi";
import Contact from "./Pages/Contact/Contact";
import SplashScreen from "./Components/SplashScreen/SplashScreen";
import ForgotForm from "./Components/ForgotPassword/ForgotForm";
import Dropdowns from "./Components/Cards/Dropdowns";
import {ThemeContext} from './Utils/ThemeContext';
import BackImage from './Components/Assets/dark.jpg';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url(${({ theme }) => (theme.theme==='true'?BackImage:'')});
  background-color:${({ theme }) => (theme.theme==='true'?'none':'#f3efe9f5')};
  background-repeat: no-repeat;
  background-size:cover;
  background-position: center;
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
`;

function App() {

  const { currentUser } = useSelector((state) => state.user);
  const [showSplash, setShowSplash] = useState(false);
  const { themeColor, setThemeColor } = useContext(ThemeContext);
  useEffect(() => {
    if (currentUser) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentUser]);

  return (
    <ThemeProvider theme={themeColor? darkTheme:lightTheme}>
      <BrowserRouter>
        {currentUser ? (
          showSplash ? (
            <SplashScreen />
          ) : (
            <Container >
              <Navbar currentUser={currentUser} />
              <Routes>
                <Route path="/" exact element={<Dashboard currentUser={currentUser} />} />
                <Route path="/history" exact element={<History />} />
                <Route path="/tutorials" exact element={<Tutorials />} />
                <Route path="/launchworkout" exact element={<LaunchWorkout />} />
                <Route path="/bmi" exact element={<Bmi />} />
                <Route path="/contact" exact element={<Contact />} />
                <Route path="/dropdown" exact element={<Dropdowns />} />
              </Routes>
            </Container>
          )
        ) : (
          <Container>
            <Routes>
              <Route path="/" element={<Authentication />} />
              <Route path="/forgot-password" element={<ForgotForm />} />
            </Routes>
          </Container>
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App
