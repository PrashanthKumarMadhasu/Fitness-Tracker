import React from 'react'
import { useState } from 'react'
import './Bmi.css'
import { HiRefresh } from "react-icons/hi";
import { ReactTyped } from "react-typed";

const Bmi = () => {

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiValue, setBmivalue] = useState("");
  const [bmiMessage, setBmiMessage] = useState("");

  const calculateBmi = () => {
    if (height && weight) {
      const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);

      setBmivalue(bmi);

      if (bmi < 16) {
        setBmiMessage("You are Severely Underweight.");
      } else if (bmi < 18.4) {
        setBmiMessage("You are Underweight.");
      } else if (bmi < 24.9) {
        setBmiMessage("You are Normal Weight.");
      } else if (bmi < 29.9) {
        setBmiMessage("You are Overweight.");
      } else if (bmi < 34.9) {
        setBmiMessage("You are Moderately Obese");
      } else if (bmi < 39.9) {
        setBmiMessage("You are Severely Obese");
      } else {
        setBmiMessage("You are Mobidly Obese")
      }
    }
  }

  const resetBmi = () => {
    setBmivalue("");
    setBmiMessage("");
    setHeight("");
    setWeight("");
  }
  return (
    <div className="bmi-container">
      {bmiValue && bmiMessage && (
        <div className='result'>
          <ReactTyped
            strings={[bmiMessage]}
            typeSpeed={50}
            backSpeed={50}
          />
        </div>
      )}
      <div className='bmi-calculator'>
        <h1 className='header-bmi'>BMI Calculator </h1>
        <div className='layer-1'>
          <div className='layer-2'>
            {bmiValue}
          </div>
        </div>
        <div className='bmi-input-container'>
          <label htmlFor="height" id='input-label'>Enter your height in (cm):</label>
          <input type="number" name="height" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <br />
        <div className='bmi-input-container'>
          <label htmlFor="weight" id='input-label'>Enter your weight in (kg):</label>
          <input type="number" step="0.1" name="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <div className='calculate-refresh'>
          <button type="button" class="calculate-button" onClick={calculateBmi}>Calculate BMI</button>
          <button type="button" class="refresh" onClick={resetBmi} ><HiRefresh /></button>
        </div>
      </div>

    </div>
  )
}

export default Bmi;