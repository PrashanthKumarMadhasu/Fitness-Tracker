import React, { useState, useEffect } from 'react';
import './DropdownStyles.css';
import { WorkoutData, exerciseDetail } from './WorkoutData';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styled from "styled-components";
import Lottie from "lottie-react";
import Running from "../Assets/Animations/running_animation.json";
import WeightLifting from "../Assets/Animations/weightLifting.json";
import ToeTouch from "../Assets/Animations/hand_leg.json";
import Warmup from "../Assets/Animations/warmup.json";
import Bench from "../Assets/Animations/bench_crunches.json";
import BoxJump from "../Assets/Animations/box_jump.json";

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

const Button = styled.button`
  type:"submit";
  background-color:${({ theme }) => theme.button_bg};
  padding: 10px;
  margin-bottom:10px;
  width:100%;
  cursor: pointer;
  border-radius:10px;
  font-size:15px;
  font-weight:600;
  border:none;
  color:#fff;
  &:hover {
      background-color:${({ theme }) => theme.button_hover};
    }
`;

const Dropdowns = ({ workout, setWorkout, addNewWorkout, buttonLoading, userBodyWeight }) => {
  const animations = [Running, WeightLifting, ToeTouch, Warmup, Bench, BoxJump];
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState();
  const [exerciseCategory, setExerciseCategory] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [exerciseProps, setExerciseProps] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [bodyWeight, setBodyWeight] = useState(userBodyWeight);

  useEffect(() => {
    // Update bodyWeight when userBodyWeight prop changes
    setBodyWeight(userBodyWeight);
  }, [userBodyWeight]);

  useEffect(() => {
    const interval = setTimeout(() => {
      setCurrentAnimationIndex((prevIndex) =>
        prevIndex === animations.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearTimeout(interval);
  }, [currentAnimationIndex, animations.length]);

  // Function to handle exercise selection (e.g., when user clicks on an exercise)
  const handleExerciseClick = (exercise, workoutItem) => {
    setSelectedExercise(exercise);
    setExerciseCategory(workoutItem);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedExercise) {
      const props = Object.keys(exerciseDetail[selectedExercise]);
      setExerciseProps(props);
      // console.log(props); // Log updated properties
    }
  }, [selectedExercise]);


  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e, name) => {
    setInputValues({ ...inputValues, [name]: e.target.value });
  };

  const handleWorkout = () => {
    const sample = { ...inputValues, exercise: selectedExercise, category: exerciseCategory, userBodyWeight: bodyWeight };
    addNewWorkout(sample);
    setInputValues({});
    setSelectedExercise();
  };

  return (
    <Card>
      <Title>Add New Workout</Title>
      <div className="dropdown">
        <div>
          <div className='bodyWeight'>
            <label htmlFor="bodyWeight">Set Body Weight</label>
            <input type='number'
              style={{ backgroundColor: `${({ theme }) => theme.black}`, }}
              value={bodyWeight}
              name='bodyWeight'
              onChange={(e) => setBodyWeight(e.target.value)} />
          </div>
          <div>
            <button onClick={toggleDropdown} className="dropbtn">
              Select Exercise {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="dropdown-content" >
            <ul className="first-level">
              {WorkoutData.map((workoutItem, workoutIndex) => (
                <li key={workoutIndex}>
                  {workoutItem[0]} {/* First level: upperbody, lowerbody, etc. */}
                  <ul className="second-level">
                    {workoutItem[1].map((group, groupIndex) => (
                      <li key={groupIndex}>
                        {group[0]} {/* Second level: Chest, Back, etc. */}
                        <ul className="third-level">
                          {group[1].map((exercise, exerciseIndex) => (
                            <li key={exerciseIndex} onClick={() => handleExerciseClick(exercise, workoutItem[0])}>
                              {exercise} {/* Third level: Exercise names */}
                            </li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        {/* Display selected exercise */}
        {selectedExercise ?
          <div className='display-input-workout'>
            <h3>Selected Exercise</h3>
            <p>{`Category: ${exerciseCategory}`}</p>
            <p>{`Exercise: ${selectedExercise}`}</p>
            {exerciseProps.map((inputField, index) => (
              <div key={index}>
                <label htmlFor={inputField}>{inputField}</label>
                <br />
                <input
                  type="number"
                  name={inputField}
                  id={inputField}
                  step={inputField === 'reps' ? '5' : undefined}
                  min="0"
                  value={inputValues[inputField] || ''}
                  onChange={(e) => handleInputChange(e, inputField)}
                />
                <br />
              </div>
            ))}
          </div>
          :
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center' // This makes it take up the full viewport height
          }}>
            <Lottie animationData={animations[currentAnimationIndex]}
              style={{ height: '200px', width: '200px', }} />
          </div>
        }
      </div>
      <Button
        onClick={handleWorkout}>Add Workout</Button>
    </Card>
  );
};

export default Dropdowns;
