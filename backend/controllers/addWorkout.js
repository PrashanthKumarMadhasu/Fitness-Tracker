const express = require('express');
const { StatusCodes } = require('http-status-codes');
const WorkoutDetails  = require('../models/workout');
const UserProfile = require('../models/profileData');
const RegisterDetails = require('../models/register');

const metValues={

        //Machine Exercise
            "Bench Press": { "MET": 3.5, "repTime": 30, "MachineExercise": true },
            "Incline Bench Press": { "MET": 3.5, "repTime": 30, "MachineExercise": true },
            "Chest Fly": { "MET": 4.0, "repTime": 30, "MachineExercise": true },
            "Cable Crossover": { "MET": 4.0, "repTime": 25, "MachineExercise": true },
            "Bent-Over Row": { "MET": 4.0, "repTime": 25, "MachineExercise": true },
            "Romanian Deadlifts": { "MET": 5.5, "repTime": 30, "MachineExercise": true },
            "Deadlifts": {"MET": 6.0, "repTime": 30, "MachineExercise": true  },
            "Lat Pulldown": { "MET": 4.0, "repTime": 25, "MachineExercise": true },
            "T-Bar Row": { "MET": 4.5, "repTime": 15, "MachineExercise": true },
            "Overhead Press": { "MET": 4.5, "repTime": 25, "MachineExercise": true },
            "Lateral Raise": { "MET": 4.0, "repTime": 20, "MachineExercise": true },
            "Front Raise": { "MET": 4.0, "repTime": 20, "MachineExercise": true },
            "Arnold Press": { "MET": 4.5, "repTime": 25, "MachineExercise": true },
            "Shrugs": { "MET": 4.0, "repTime": 15, "MachineExercise": true },
            "Bicep Curls": { "MET": 3.5, "repTime": 20, "MachineExercise": true },
            "Hammer Curls": { "MET": 3.5, "repTime": 20, "MachineExercise": true },
            "Concentration Curls": { "MET": 3.5, "repTime": 25, "MachineExercise": true },
            "Preacher Curls": { "MET": 3.5, "repTime": 25, "MachineExercise": true },
            "Tricep Pushdown": { "MET": 3.5, "repTime": 25, "MachineExercise": true },
            "Overhead Tricep Extension": { "MET": 3.5, "repTime": 25, "MachineExercise": true },
            "Skull Crushers": { "MET": 4.0, "repTime": 25, "MachineExercise": true },
            "Leg Press": { "MET": 4.0, "repTime": 30, "MachineExercise": true },
            "Good Mornings": { "MET": 4.0, "repTime": 30, "MachineExercise": true },
            "Cable Crunches": { "MET": 5.5, "repTime": 25, "MachineExercise": true },
            "Cable Kickbacks": { "MET": 4.0, "repTime": 25, "MachineExercise": true },
            "Calf Raises": { "MET": 3.5, "repTime": 15, "MachineExercise": true },
            "Seated Calf Raises": { "MET": 3.5, "repTime": 15, "MachineExercise": true },
            "Kettlebell Swings": { "MET": 9.0, "repTime": 20, "MachineExercise": true },
            "Snatches": { "MET": 9.0, "repTime": 30, "MachineExercise": true },
            "Clean and Press": { "MET": 8.0, "repTime": 30, "MachineExercise": true },
        
    

    //weight and bodyweight include both:
            "Squats": { "MET": 5.0 ,"repTime":25},
            "Lunges": { "MET": 5.0,"repTime":25 },
            "Bulgarian Split Squats": { "MET": 5.0 ,"repTime":30},
            "Step-Ups": { "MET": 4.0 ,"repTime":25},
            "Hip Thrusts": { "MET": 4.0,"repTime":25 },
            "Glute Bridge": { "MET": 4.0,"repTime":20 },
            "Russian Twists": { "MET": 5.0,"repTime":25 },
    



    //Body Weight Exercises ()
            "Push-ups": { "MET": 8.0 ,"repTime":15}, //
            "Pull-ups": { "MET": 8.0 ,"repTime":30},
            "Tricep Dips": { "MET": 5.0,"repTime":25 },
            "Hamstring Curls": { "MET": 3.5,"repTime":25 },
            "Crunches": { "MET": 5.0,"repTime":20 },
            "Sit-Ups": { "MET": 5.0 ,"repTime":20},
            "Leg Raises": { "MET": 4.0,"repTime":25 },
            "Reverse Crunches": { "MET": 4.0,"repTime":25 },
            "Hanging Leg Raises": { "MET": 6.0 ,"repTime":30},
            "Side Planks": { "MET": 3.0,"repTime":30 },
            "Bicycle Crunches": { "MET": 4.0,"repTime":25 },
            "Hyperextensions": { "MET": 3.5 ,"repTime":20},
            "Superman Exercise": { "MET": 4.0,"repTime":20 },
            "Rowing": { "MET": 7.0,"repTime":30},
            "Jump Rope": { "MET": 12.0, "repTime":10 },
            "Burpees": { "MET": 10.0,"repTime":30 },
            "Mountain Climbers": { "MET": 8.0,"repTime":30},
            "Jumping Jacks": { "MET": 8.0,"repTime":15 },
            "Box Jumps": { "MET": 9.0,"repTime":20 },
            "High Knees": { "MET": 8.0, "repTime":15},


    //speed and Distance
    "Running": { "MET": 10.0 },
    "Cycling": { "MET": 10.0 },
    "Sprint Intervals": { "MET": 12.0}, //speed and distance (HIIT exercise)
    
    //speed and time
    "Elliptical": { "MET": 8.0,"repTime":25 },

    //Time
    "Battle Ropes": { "MET": 8.0}
}

const addWorkout = async (req, res, next) => {
    const { userId } = req.user;
    const { weight, sets, reps,speed, distance,time, exercise,category } = req.body;

    try {
        const userProfileData = await UserProfile.findOne({ userId }).exec();

        if (!userProfileData?.weight) {
            return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: 'Please enter weight in the profile page.' });
        }

        const userWeight = userProfileData?.weight;
        const metValue = metValues[exercise]?.["MET"] || 0;
        //console.log(metValue)

        let caloriesBurned = 0;
        let calculatedDuration = 0;
        let setsTime=0

        // Case 1: When 'weight', 'sets', and 'reps' 
        if (weight) 
        {
            const repTime=metValues[exercise]?.["repTime"]
            setsTime=(sets*reps*repTime)/5
            console.log(`repTime:${repTime},setsTime:${setsTime},metValue:${metValue}`)
            calculatedDuration=(setsTime)/(60*60)
            totalWeight=weight+userWeight
            caloriesBurned=(metValue*totalWeight*calculatedDuration)

        }
        // Case 2: When 'speed' and 'distance' 
        else if (speed && distance) 
        {
            calculatedDuration = distance / speed;
            caloriesBurned = userWeight * metValue * calculatedDuration;
        }
        //case 3 : speed and Time
        else if(speed && time)
        {
            const repTime=metValues[exercise]?.["repTime"]
            calculatedDuration=(time/60)*repTime
            caloriesBurned=metValue*userWeight*calculatedDuration
        }
        else if(time)
        {
            
            calculatedDuration=time/60
            caloriesBurned=metValue*userWeight*calculatedDuration
        }
        // Case 4: Default 'sets' and 'reps' 

        else 
        {
            const repTime=metValues[exercise]?.["repTime"]
            const setsTime=(sets*reps*repTime)/5
            
            calculatedDuration = (setsTime )/ (60 * 60); // Assuming 45 seconds per set
            caloriesBurned = metValue*userWeight*calculatedDuration;
           
        }

        // Create workout object
        const newWorkOutDetails = {
            weight: weight?weight:userWeight,
            sets: sets || 0,
            reps: reps || 0,
            speed: speed || 0,
            distance: distance || 0,
            duration:(calculatedDuration*60).toFixed(2),
            exercise: exercise,
            category:category,
            caloriesBurned: caloriesBurned===0? 0 : caloriesBurned.toFixed(2)
        };

        // Save to database
        const addedWorkOutData = await WorkoutDetails.create({...newWorkOutDetails,user: userId, userId:userId});
        if (!addedWorkOutData) {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ success: false, message: 'Error occurred while adding data to the database.' });
        }

        return res.status(StatusCodes.CREATED).json({ success: true, data: addedWorkOutData });
    } catch (error) {
        return res.status(StatusCodes.BAD_GATEWAY).json({ success: false, message: error.message });
    }
};

module.exports = { addWorkout };
