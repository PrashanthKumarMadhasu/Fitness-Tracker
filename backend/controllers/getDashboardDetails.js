const WorkoutDetails  = require('../models/workout');
const UserProfile = require('../models/profileData');
const RegisterDetails = require('../models/register');
const {StatusCodes}=require("http-status-codes")


const getUserDashboard=async( req,res,next)=>
{
    try 
    {
      const {userId,email}=req.user 
      const user=  await RegisterDetails.findOne({email}).exec()
        
      if(!user)
      {
        return res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"user not found"})
      }
      const currDate= new Date();

      const startToday=new Date(
        currDate.getFullYear(),
        currDate.getMonth(),
        currDate.getDate()
      )

      const endToday= new Date
      (
        currDate.getFullYear(),
        currDate.getMonth(),
        currDate.getDate()+1
      )
      //total calories burnt
      const totalCaloriesBurnt=await WorkoutDetails.aggregate([
        {$match:{userId:userId,date: {$gte:startToday,$lt:endToday}}},
        {
          $group:
          { 
            _id:null,
            totalCaloriesBurnt:{$sum:"$caloriesBurned"},
          },
        }
      ])
      //Calculate total no of workouts
      const totalworkouts= await WorkoutDetails.countDocuments(
        {
          userId:userId,
          date:{$gte:startToday,$lt:endToday}
        }
      );

      //calculate average calories burnt per workout
      const avgCaloriesPerWorkOut=totalCaloriesBurnt.length>0?
                totalCaloriesBurnt[0].totalCaloriesBurnt/totalworkouts:0;

      // calculate the every workout that belongs to user
      const allWorkOutData=await WorkoutDetails.countDocuments(
        {
          userId:userId
        }
      )          

      //fetch workout by category
      const caloriesByCategory= await WorkoutDetails.aggregate([
        {$match: {userId:userId, date: {$gte:startToday,$lt:endToday}}},
        {
          $group:
          {
            _id:"$category",
           totalCaloriesBurnt:{$sum:"$caloriesBurned"} 
          }
        }
      ])

      // pie chart data
      const pieChartData= caloriesByCategory.map((item,index)=>
      ({
        id:index,
        value:item.totalCaloriesBurnt,
        label:item._id
      }))

      //for weekly data fetching
      const weeks=[]
      const dayWiseCalories=[]
      for(let i=6;i>=0;i--)
      {
        const date=new Date(
          currDate.getTime()- i*24*60*60*1000
        );
        weeks.push(`${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`);
        
        const startingDay= new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        )

        const endingDay= new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()+1
        )
        const weekData= await WorkoutDetails.aggregate([
          {
            $match:{
              userId:userId,
              date:{$gte:startingDay,$lt:endingDay}
            },
          },
          {
            $group:
            {
              _id:{$dateToString :{format :"%Y-%m-%d",date:"$date"}},
              totalCaloriesBurnt:{$sum:"$caloriesBurned"}
            }
          }
        ])

        dayWiseCalories.push(
          weekData[0]?.totalCaloriesBurnt?weekData[0]?.totalCaloriesBurnt:0
        )
      }

      const data={
                      totalCaloriesBurnt:totalCaloriesBurnt.length>0?totalCaloriesBurnt[0].totalCaloriesBurnt:0,
                      totalworkouts:totalworkouts,
                      avgCaloriesPerWorkOut:avgCaloriesPerWorkOut,
                      weeklyCaloriesBurnt:
                      {
                        weeks:weeks,
                        dayWiseCalories:dayWiseCalories
                      },
                      pieChartData:pieChartData,
                      usertotalWorkOuts:allWorkOutData
                } 
      return res.status(StatusCodes.OK).json({success:true,data})




    } catch (error) 
    {

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
        
    }

}

const todayWorkoutData= async(req,res,next)=>
{
  try 
  {
    const {userId,email}=req.user
    const user=await RegisterDetails.findOne({email}).exec();
    let date=new Date()
    if(!user)
      {
        return res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"User not found"})
      }
      const startingDay=new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      )
      const endindDay=  new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()+1
      )
      const todayTotalWorkoutData= await WorkoutDetails.find({
        userId:userId,
        date:{$gte:startingDay,$lt:endindDay},

      });

      const totalCalories= todayTotalWorkoutData.reduce((res,item)=>
      res+item.caloriesBurned,0)

      return res.status(StatusCodes.OK).json({success:true,todayTotalWorkoutData,totalCalories,count:todayTotalWorkoutData.length})


  } 
  catch (error) 
  {
    return res.status(StatusCodes.BAD_GATEWAY).json({success:false,message:error.message})  
  }
}



module.exports={getUserDashboard,todayWorkoutData}