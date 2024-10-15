import { ThemeProvider, styled } from "styled-components";
import { lightTheme } from "./Utils/Theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./Pages/Authentication";
import { useState, useEffect} from "react";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar";
import Dashboard from "./Pages/Dashboard";
import Workouts from "./pages/Workouts";
import Tutorials from "./Pages/Tutorials";
import Blogs from "./Pages/Blogs";
import Bmi from "./Components/BMI/Bmi";
import Contact from "./Pages/Contact/Contact";
import SplashScreen from "./Components/SplashScreen/SplashScreen";
import ForgotForm from "./Components/ForgotPassword/ForgotForm";
import Dropdowns from "./Components/Cards/Dropdowns";

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
  const [showSplash, setShowSplash] = useState(false);
  
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
    <ThemeProvider theme={lightTheme}>
      <BrowserRouter>
      <Routes>
          {!currentUser && <Route path="/forgot-password" element={<ForgotForm />} />}
        </Routes>
        {currentUser ? (
          showSplash ? (
            <SplashScreen />
          ) : (
            <Container>
              <Navbar currentUser={currentUser} />
              <Routes>
                <Route path="/" exact element={<Dashboard />} />
                <Route path="/workouts" exact element={<Workouts />} />
                <Route path="/tutorials" exact element={<Tutorials />} />
                <Route path="/blogs" exact element={<Blogs />} />
                <Route path="/bmi" exact element={<Bmi />} />
                <Route path="/contact" exact element={<Contact />} />
                <Route path="/dropdown" exact element={<Dropdowns />} />
              </Routes>
            </Container>
          )
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
