import React from 'react'
import { useState } from 'react'
import './Bmi.css'
import { HiRefresh } from "react-icons/hi";

export const Bmi = () => {

  const [height,setHeight] = useState("");
  const [weight,setWeight] = useState("");
  const [bmiValue,setBmivalue] = useState("");
  const [bmiMessage,setBmiMessage] = useState("");

  const calculateBmi = ()=>{
    if(height && weight){
      const bmi = (weight/((height/100)*(height/100))).toFixed(2);

      setBmivalue(bmi);

      if(bmi < 16){
        setBmiMessage("You are Severely Underweight.");
      }else if(bmi < 18.4){
        setBmiMessage("You are Underweight.");
      }else if(bmi < 24.9){
        setBmiMessage("You are Normal Weight.");
      }else if(bmi < 29.9){
        setBmiMessage("You are Overweight.");
      }else if(bmi < 34.9){
        setBmiMessage("You are Moderately Obese");
      }else if(bmi < 39.9){
        setBmiMessage("You are Severely Obese");
      }else{
        setBmiMessage("You are Mobidly Obese")
      }
    }
  }

  const resetBmi = ()=>{
    setBmivalue("");
    setBmiMessage("");
    setHeight("");
    setWeight("");
  }
  return (
    <div className="bmi-calculator">
        <h1 className='header'>BMI Calculator </h1>
        <div className='input-container'> 
          <label htmlFor="height">Enter your height in (cm):</label>
          <input type="number" name="height" value={height} onChange={(e)=>setHeight(e.target.value)}/>
        </div>
        <div className='input-container'>
          <label htmlFor="weight">Enter your weight in (kg):</label>
          <input type="number" step="0.1" name="weight" value={weight} onChange={(e)=>setWeight(e.target.value)}/>
        </div>
        <div className='calculate-refresh'>
        <button type="button" class="btn btn-primary" onClick={calculateBmi}>Calculate BMI</button>
        <button type="button" class="refresh" onClick={resetBmi} ><HiRefresh /></button>
        </div>
        {bmiValue && bmiMessage &&(
          <div className="result">
          <p>Your BMI is: <span className="bmi-value">{bmiValue}</span></p>
          <p>Result: <span className="bmi-message">{bmiMessage}</span></p>
          </div>
        )}
        
    </div>
  )
}
