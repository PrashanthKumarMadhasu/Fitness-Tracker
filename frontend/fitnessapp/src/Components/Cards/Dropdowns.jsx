import React, { useState, useEffect } from 'react';
import './DropdownStyles.css';
import { WorkoutData, exerciseDetail } from './WorkoutData';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styled from "styled-components";
import Button from "../Button";
import Lottie from "lottie-react";
import Running from "../Assets/Animations/running_animation.json";
import WeightLifting from "../Assets/Animations/weightLifting.json";
import ToeTouch from "../Assets/Animations/hand_leg.json";
import Warmup from "../Assets/Animations/warmup.json";
import Bench from "../Assets/Animations/bench_crunches.json";
import BoxJump from "../Assets/Animations/box_jump.json";
import { addWorkout } from '../../api';

const Card = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 24px;
  border: 1px solid ${({ theme }) => theme.text_primary + 20};
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

const Dropdowns = ({ workout, setWorkout, addNewWorkout, buttonLoading }) => {
  const animations = [Running, WeightLifting, ToeTouch, Warmup, Bench, BoxJump];
  const [currentAnimationIndex, setCurrentAnimationIndex] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState();
  const [exerciseCategory, setExerciseCategory] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [exerciseProps, setExerciseProps] = useState([]);
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [weight, setWeight] = useState();
  const [speed, setSpeed] = useState();
  const [distance, setDistance] = useState();
  const [time, setTime] = useState();
  const [inputValues, setInputValues] = useState({});

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
    const sample = { ...inputValues, exercise: selectedExercise, category: exerciseCategory };
    addNewWorkout(sample);
    setInputValues({});
    setSelectedExercise();
  }
  return (
    <Card>
      <Title>Add New Workout</Title>
      <div className="dropdown">
        <button onClick={toggleDropdown} className="dropbtn">
          Select Exercise {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
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
          <div>
            <h3>Selected Exercise</h3>
            <p>{`Category: ${exerciseCategory}`}</p>
            <p>{`Exercise: ${selectedExercise}`}</p>
            {exerciseProps.map((inputField, index) => (
              <div key={index}>
                <label htmlFor={inputField}>{inputField}</label>
                <input
                  type="number"
                  name={inputField}
                  id={inputField}
                  step={inputField === 'reps' ? '5' : undefined}
                  value={inputValues[inputField] || ''}
                  onChange={(e) => handleInputChange(e, inputField)}
                />
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
            style={{ height: '200px', width: '200px',}} />
          </div>
        }
      </div>
      <Button
        text="Add Workout"
        small
        onClick={handleWorkout}
      // isLoading={buttonLoading}
      // isDisabled={buttonLoading}
      />
    </Card>
  );
};

export default Dropdowns;
