const RegisterDetails=require('../models/register')
const {StatusCodes, BAD_REQUEST} =require('http-status-codes')
const jwr=require('jsonwebtoken')


const homepage=(req,res)=>{
    res.send('Home Page');
}
const getAllUsers= async(req,res)=>{
    const users=await RegisterDetails.find({})
    res.status(200).json(users);

}

const register= async(req,res)=>{
    const user= await RegisterDetails.create({...req.body})
    const token=user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{name:user.fullname},token})
}

const login= async(req,res)=>{
    const {username,password}= req.body
    if(!username || !password)
    {
        res.status(StatusCodes.BAD_REQUEST).json('Please provide email and password')
    }
    const user=await RegisterDetails.findOne({email:username}).exec()
    if(!user)
        {
            res.status(StatusCodes.UNAUTHORIZED).json("Invalid Credentials");
        } 
    const isPasswordCorrect=await user.comparePassword(password)
    if(!isPasswordCorrect)
    {
        res.status(StatusCodes.UNAUTHORIZED).json("Invalid Credentials");
       
    }
    const token=user.createJWT()
    res.status(StatusCodes.OK).json({user:{email:user.email},token})

}

const deleteUsers= async(req,res)=>
{
    try
    {
        const user=await RegisterDetails.deleteMany({})
        res.status(200).json({message:"success"})   
    } catch (error) 
    {
      res.status(500).json({message:error.message})   
    }
}

module.exports={homepage,getAllUsers,register,login,deleteUsers}