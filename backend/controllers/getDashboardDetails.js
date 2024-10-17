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
      // calculate the percentage differnce for toatal Calories Burnt
      const startYesterday=new Date()
      startYesterday.setDate(startYesterday.getDate()-1);
      startYesterday.setHours(0,0,0,0);

      const endYesterday=new Date()
      endYesterday.setDate(endYesterday.getDate()-1);
      endYesterday.setHours(23,59,59,999);

      const previousDayCalories= await WorkoutDetails.aggregate(
        [
          {$match:{userId:userId,date:{$gte:startYesterday,$lte:endYesterday}}},
          {
            $group:{
              _id:null,
              yesterdayTotalCalories:{$sum:"$caloriesBurned"}
            }
          }
        ]
      );
      const totalCaloriesToday=totalCaloriesBurnt[0]?.totalCaloriesBurnt || 0;
      const totalCaloriesYesterday= previousDayCalories[0]?.yesterdayTotalCalories || 0;
      let totalCaloriesBurntPercen=0
      if(totalCaloriesYesterday===0)
      {
        if(totalCaloriesToday)
        {
          totalCaloriesBurntPercen=100
        }
      }
      else
      {
        totalCaloriesBurntPercen=((totalCaloriesToday-totalCaloriesYesterday)/totalCaloriesYesterday)*100
      }
      
      //Calculate total no of workouts
      const totalworkouts= await WorkoutDetails.countDocuments(
        {
          userId:userId,
          date:{$gte:startToday,$lt:endToday}
        }
      );

      //percentage difference for total workouts
      const totalWorkoutsYesterday= await WorkoutDetails.countDocuments(
        {
          userId:userId,
          date:{$gte:startYesterday,$lte:endYesterday}
        }
      )

      const TotalWorkoutsToday=  totalworkouts===0? 0: totalworkouts
      const TotalWorkoutsYesterday= totalWorkoutsYesterday===0 ? 0: totalWorkoutsYesterday
      let totalWorkoutsPercen=0

      if(TotalWorkoutsYesterday===0)
      {
        if(TotalWorkoutsToday)
        {
          totalWorkoutsPercen=100
        }
      }
      else
      {
        totalWorkoutsPercen=((TotalWorkoutsToday-TotalWorkoutsYesterday)/TotalWorkoutsYesterday)*100
      }


      //calculate average calories burnt per workout
      const avgCaloriesPerWorkOut= totalCaloriesBurnt[0]?.totalCaloriesBurnt/totalworkouts || 0;

      const avgCaloriesPerWorkOutYesterday= totalCaloriesYesterday/TotalWorkoutsYesterday

      let avgCaloriesPerWorkoutPercen=0
      if(avgCaloriesPerWorkOutYesterday==0)
      {
        if(avgCaloriesPerWorkOut)
        {
          avgCaloriesPerWorkoutPercen=100
        }
      }
      else
      {
        avgCaloriesPerWorkoutPercen=((avgCaloriesPerWorkOut-avgCaloriesPerWorkOutYesterday)/avgCaloriesPerWorkOutYesterday)*100
      }


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
        value:parseFloat(item.totalCaloriesBurnt.toFixed(2)),
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
        const day=date.getDay()
        switch(day)
        {
          case 0:
            weeks.push("sun")
            break;
          case 1:
              weeks.push("mon")
              break;
          case 2:
              weeks.push("tue")
              break;
          case 3:
              weeks.push('wed')
              break;
          case 4:
              weeks.push('thur')
              break;            
          case 5:
              weeks.push('fri')
              break;
          case 6:
              weeks.push('sat')
              break;    
          default:
            console.log("Invalid day entered")    

        }
        
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
        const DayWiseCalories=parseFloat(weekData[0]?.totalCaloriesBurnt.toFixed(2)) || 0
        dayWiseCalories.push(DayWiseCalories)
      }
      //streek value 
      let check= true
      //const todayDate= new Date()
      let streekCount=0;
      if(check && totalworkouts)
      {
          streekCount= streekCount+1
          check=false
      }
      else if (totalWorkoutsYesterday===0)
      {
        streekCount=0 
        check=true
      }

      



                    
    return res.status(StatusCodes.OK).json(
                      { success:true, 
                        totalCaloriesBurnt:parseFloat(totalCaloriesBurnt[0]?.totalCaloriesBurnt.toFixed(2)) || 0,
                        totalCaloriesBurntPercen:totalCaloriesBurntPercen===0? 0 : parseFloat(totalCaloriesBurntPercen.toFixed(2)),

                        totalworkouts:totalworkouts,
                        totalWorkoutsPercen:totalWorkoutsPercen===0? 0 : parseFloat(totalWorkoutsPercen.toFixed(2)),

                        avgCaloriesPerWorkOut:avgCaloriesPerWorkOut ,
                        avgCaloriesPerWorkoutPercen:avgCaloriesPerWorkoutPercen===0 ? 0 : parseFloat(avgCaloriesPerWorkoutPercen.toFixed(2)),

                        weeklyCaloriesBurnt:
                        {
                          weeks:weeks,
                          dayWiseCalories:dayWiseCalories,
            
                        },
                        usertotalWorkOuts:allWorkOutData,
                        pieChartData:pieChartData,
                        streekCount:streekCount
                      })

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

      let totalCalories= todayTotalWorkoutData.reduce((res,item)=>
      res+item.caloriesBurned,0)
      totalCalories=totalCalories===0? 0 : totalCalories.toFixed(2)

      return res.status(StatusCodes.OK).json({success:true,todayTotalWorkoutData,totalCalories,count:todayTotalWorkoutData.length})


  } 
  catch (error) 
  {
    return res.status(StatusCodes.BAD_GATEWAY).json({success:false,message:error.message})  
  }
}



module.exports={getUserDashboard,todayWorkoutData}