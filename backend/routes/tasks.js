const express =require('express')

const router =express.Router()

const {homepage,getAllUsers,register,login,deleteAllUsers,deleteAccount}=require('../controllers/tasks');
const {otpVerification,sendOTP,updatePassword}=require('../controllers/otpContoller')

const {getDataByKeyword}=require('../controllers/youtubeDataAPI')

const {addWorkout} =require('../controllers/addWorkout')
const {todayWorkoutData,getUserDashboard}=require('../controllers/getDashboardDetails')

const authMiddleware=require('../middlewares/auth');
const { getProfileData,updateProfileData } = require('../controllers/userProfile')
//get API
router.route('/').get(homepage);
router.route('/getAllUsers').get(getAllUsers);

//post API
router.route('/login').post(login);
router.route('/register').post(register);


//forgetPassword API's
router.route('/forgetPassword').post(sendOTP)
router.route('/verifyOtp').post(otpVerification);
router.route('/updatePassword').post(updatePassword);


//
router.route('/tutorials/:keyword').get(getDataByKeyword)
//router.route('/dashboard').post(authMiddleware,getDashboard)

router.route('/getProfileData/:userId').get(authMiddleware,getProfileData)
router.route('/updateProfileData').put(authMiddleware,updateProfileData)

router.route('/addWorkout').post(authMiddleware,addWorkout);
router.route('/getDashboardDetails').get(authMiddleware,getUserDashboard)
router.route('/todayWorkOutData').get(authMiddleware,todayWorkoutData)






//PaymentGateway UPI Transaction:
//router.route('phonepe/pay').post(paymentGateway)


//Delete Operation
router.route('/deleteUserAccount').delete(authMiddleware,deleteAccount)

//router.route('/deleteAllUsers').delete(authMiddleware, deleteAllUsers);

module.exports=router
