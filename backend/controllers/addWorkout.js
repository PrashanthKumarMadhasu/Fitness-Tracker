const express=require('express')
const {StatusCodes} =require('http-status-codes')
const { experimental_useEffectEvent } = require('react')
const {WorkoutDetails} =require("../models/workout")

/* 

{ weight: null, sets: null, reps: null },
 { sets: null, reps: null },
  { speed: null, distance: null },//MET's Data (Metabolic Equivalents)

*/
const metValues={
        "Bench Press": { "MET": 3.5 },
        "Incline Bench Press": { "MET": 3.5 },
        "Chest Fly": { "MET": 4.0 },
        "Push-ups": { "MET": 8.0 },
        "Cable Crossover": { "MET": 4.0 },
        "Pull-ups": { "MET": 8.0 },
        "Bent-Over Row": { "MET": 4.0 },
        "Lat Pulldown": { "MET": 4.0 },
        "T-Bar Row": { "MET": 4.5 },
        "Overhead Press": { "MET": 4.5 },
        "Lateral Raise": { "MET": 4.0 },
        "Front Raise": { "MET": 4.0 },
        "Arnold Press": { "MET": 4.5 },
        "Shrugs": { "MET": 4.0 },
        "Bicep Curls": { "MET": 3.5 },
        "Hammer Curls": { "MET": 3.5 },
        "Concentration Curls": { "MET": 3.5 },
        "Preacher Curls": { "MET": 3.5 },
        "Tricep Dips": { "MET": 5.0 },
        "Tricep Pushdown": { "MET": 3.5 },
        "Overhead Tricep Extension": { "MET": 3.5 },
        "Skull Crushers": { "MET": 4.0 },
        "Squats": { "MET": 5.0 },
        "Leg Press": { "MET": 4.0 },
        "Lunges": { "MET": 5.0 },
        "Bulgarian Split Squats": { "MET": 5.0 },
        "Step-Ups": { "MET": 4.0 },
        "Hamstring Curls": { "MET": 3.5 },
        "Good Mornings": { "MET": 4.0 },
        "Hip Thrusts": { "MET": 4.0 },
        "Glute Bridge": { "MET": 4.0 },
        "Cable Kickbacks": { "MET": 4.0 },
        "Calf Raises": { "MET": 3.5 },
        "Seated Calf Raises": { "MET": 3.5 },
        "Crunches": { "MET": 5.0 },
        "Sit-Ups": { "MET": 5.0 },
        "Cable Crunches": { "MET": 5.5 },
        "Leg Raises": { "MET": 4.0 },
        "Reverse Crunches": { "MET": 4.0 },
        "Hanging Leg Raises": { "MET": 6.0 },
        "Russian Twists": { "MET": 5.0 },
        "Side Planks": { "MET": 3.0 },
        "Bicycle Crunches": { "MET": 4.0 },
        "Hyperextensions": { "MET": 3.5 },
        "Superman Exercise": { "MET": 4.0 },
        "Running": { "MET": 10.0 },
        "Cycling": { "MET": 10.0 },
        "Rowing": { "MET": 7.0 },
        "Jump Rope": { "MET": 12.0 },
        "Stair Climber": { "MET": 8.0 },
        "Elliptical": { "MET": 8.0 },
        "Burpees": { "MET": 10.0 },
        "Mountain Climbers": { "MET": 8.0 },
        "Kettlebell Swings": { "MET": 9.0 },
        "Snatches": { "MET": 9.0 },
        "Clean and Press": { "MET": 8.0 },
        "Jumping Jacks": { "MET": 8.0 },
        "Box Jumps": { "MET": 9.0 },
        "High Knees": { "MET": 8.0 },
        "Battle Ropes": { "MET": 8.0 },
        "Sprint Intervals": { "MET": 12.0 }
      }
      
const addWorkout= async(req,res,next)=>
{
    
    //const data=req.body
    //console.log(data)

    //const data={ "weight":25, "sets":3, "reps":30}
    //const data1={"speed": 10, "distance": 3}
    //const data2={"sets": 3, "reps": 30}
    //Calories Burned=MET value×Weight (kg)×Duration (hours)
    //Duration= 3 sets×90 seconds//60*60
    //
        const {userId,email}=req.user
        const {weight,sets,reps,duration,speed,distance,exercise}=req.body
        const newWorkOutDetails={
            user:userId,
            weight:weight?weight:null,
            sets:sets?sets:null,
            reps:reps?reps:null,
            duration:null,
            speed:speed?speed:null,
            distance:distance?distance:null,
            workOutName:exercise,
            caloriesBurned:null

        }
        //get userWeight from profile
        const userWeight=70;
        const metValue=(metValues[exercise])?metValues[exercise]['MET']:0

        if(weight)
        {
            try 
            {
                const time=90 //per set taking 90 seconds to complete
                const duration= (sets*90)/60*60;
                const caloriesBurned=weight*metValue*duration
                const newWorkOutDetails=
                {
                    user:userId,
                    weight:weight?weight:null,
                    sets:sets?sets:null,
                    reps:reps?reps:null,
                    duration:duration,
                    speed:speed?speed:null,
                    distance:distance?distance:null,
                    workOutName:exercise,
                    caloriesBurned:caloriesBurned
                }
                //const workOutData=await workout.
            } 
            catch (error)
            {
                
            }
        }
        else if(speed)
        {

        }
        else
        {

        }



}
       

module.exports={addWorkout}