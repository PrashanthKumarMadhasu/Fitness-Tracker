const express =require('express')

const router =express.Router()

const {homepage,getAllUsers,register,login,deleteUsers}=require('../controllers/tasks');
router.route('/').get(homepage);
router.route('/getAllUsers').get(getAllUsers);
router.route('/login').get(login);
router.route('/register').post(register);
router.route('/deleteUsers').delete(deleteUsers);

module.exports=router
