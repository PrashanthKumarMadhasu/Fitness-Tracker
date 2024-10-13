const UserProfile=require('../models/profileData')
const {StatusCodes}=require('http-status-codes')



const getProfileData= async(req,res)=>
{
    try 
    {
        const {userId}=req.params
        const userProfileData= await UserProfile.find({userId})
        if(!userProfileData)
        {
            return res.status(StatusCodes).json({success:false,message:"UserProfile Data is not Exists check userId"})
        }
        return res.status(StatusCodes.OK).json({success:true,userProfileData})
    } catch (error) 
    {
        return res.status(StatusCodes).json({success:false,message:error.message})
    }
}
const updateProfileData=async(req,res)=>
{
    try 
    {
      const {userId}=req.body
      const profileData=req.body
      const userProfileData=await UserProfile.findOne({userId})
      if(!userProfileData)
        {
            return res.status(StatusCodes.BAD_GATEWAY).json({success:false,message:"UserProfile Data is not Exist, check userId"})
        }
        userProfileData.email=profileData.email?profileData.email:userProfileData.email,
        userProfileData.height=profileData.height?profileData.height:userProfileData.height,
        userProfileData.weight=profileData.weight?profileData.weight:userProfileData.weight,
        userProfileData.dob=profileData.dob?profileData.dob:userProfileData.dob,
        userProfileData.profilePic=profileData.profilePic?profileData.profilePic:userProfileData.profilePic
        await userProfileData.save()
        return res.status(StatusCodes.CREATED).json({success:true,data:userProfileData})
    }catch (error) 
    {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false,message:"Server errro while updating data in userProfile"})
    }
}


module.exports={getProfileData,updateProfileData}