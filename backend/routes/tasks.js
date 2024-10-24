const express =require('express')

const router =express.Router()

const {homepage,getAllUsers,register,login,deleteAllUsers,deleteAccount,contactForm}=require('../controllers/tasks');
const {otpVerification,sendOTP,updatePassword}=require('../controllers/otpContoller')

const {getDataByKeyword}=require('../controllers/youtubeDataAPI')

const {addWorkout,deleteuserWorkout,getWorkoutHistory,addWorkoutLog} =require('../controllers/addWorkout')
const {todayWorkoutData,getUserDashboard}=require('../controllers/getDashboardDetails')

const authMiddleware=require('../middlewares/auth');
const { getProfileData,updateProfileData } = require('../controllers/userProfile')
 const {scheduleModule}= require('../controllers/whatsappMessage')




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
router.route('/tutorials/:keyword').get(authMiddleware,getDataByKeyword)
//router.route('/dashboard').post(authMiddleware,getDashboard)

router.route('/getProfileData/:userId').get(authMiddleware,getProfileData)
router.route('/updateProfileData').put(authMiddleware,updateProfileData)

router.route('/addWorkout').post(authMiddleware,addWorkout);
router.route('/deleteWorkout/:workoutId').delete(authMiddleware,deleteuserWorkout)
router.route('/getWorkoutHistory').get(authMiddleware,getWorkoutHistory)
router.route('/addWorkoutLog').post(authMiddleware,addWorkoutLog)

router.route('/getDashboardDetails').get(authMiddleware,getUserDashboard)
router.route('/todayWorkOutData').get(authMiddleware,todayWorkoutData)

//send reminder routes
router.route('/sendRemainder').post(authMiddleware,scheduleModule)




//PaymentGateway UPI Transaction:
//router.route('phonepe/pay').post(paymentGateway)

router.route('/contactForm').post(authMiddleware,contactForm)
//Delete Operation
router.route('/deleteUserAccount').delete(authMiddleware,deleteAccount)

//router.route('/deleteAllUsers').delete(authMiddleware, deleteAllUsers);

module.exports=router
