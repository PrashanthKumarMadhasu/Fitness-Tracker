const twilio= require('twilio')
const cron=require('node-cron')
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

const whatsappMessage= require('../models/whatAppMessage')
const {StatusCodes} =require('http-status-codes');



async function sendRemainderQueue(messageData)
{
        try
        {
            const accountSid=process.env.Twilio_Account_Sid
            const authToken=process.env. Twilio_Auth_Token

            const client = new twilio(accountSid,authToken)
            const result= await client.messages.create(
                {
                    body:messageData.message,
                    from:`whatsapp:+${messageData.senderMobile}`,
                    to:`whatsapp:+91${messageData.userMobile}`
                })
            //const res=JSON.stringify(result)
            //console.log(`result:${res}`)   
            client.messages(result.sid)
            .fetch().then(message => console.log(message.status)); 
            if(!result)
                {
                  console.log("Error occur while create a message in twilio")
                  return false
                }
                messageData.status='sent'
                await messageData.save();   
                console.log("Message Send Successfully")
                return true

        } 
        catch (error) 
        {
            console.log('Error occurs while creating or sending message in twilio:', error.message)
            return false
        }
}

cron.schedule('* * * * *',async()=>{
    try 
    {
     const curr= new Date();
     dayjs.extend(utc);
     dayjs.extend(timezone);
     const currDate= dayjs.tz(curr,'Asia/Kolkata').format('YYYY-MM-DDTHH:mm:ss')
     const messageDataList= await whatsappMessage.find({status:'pending',sendAt:{$lte:currDate}})
     if(messageDataList?.length>0)
     {
        for(const messageData of messageDataList)
        {
            const result= await sendRemainderQueue(messageData);
            if(!result)
            {
                console.log(`Failed to send message for ${messageData.to}`)
            }
        }
     }
    //  else
    //  {
    //     console.log("MessageData List is Empty")
    //  }
    } 
    catch (error) 
    {
        console.error('Error while fetching/sending messages:', error.message);
    }
})



const scheduleModule= async(req,res)=>
{
    try 
    {
        const {userId,email}= req.user
        const {message, date,time,mobile}=req.body
        const dateTime=`${date}T${time}:00`
        dayjs.extend(utc);
        dayjs.extend(timezone);
        const sendAt=dayjs.tz(dateTime,'Asia/Kolkata').format('YYYY-MM-DDTHH:mm:ss')
        console.log(`previous Date: ${sendAt}`)
        const messageData= await whatsappMessage.create(
            {
                userId:userId,
                message:message,
                sendAt:sendAt,
                senderMobile:'14155238886',
                userMobile:mobile
            })
            console.log(`DB date: ${messageData.sendAt}`)
        if(!messageData)
            {
                return res.status(StatusCodes.BAD_REQUEST).json({success:false,message:"Message is Unable to scheduled"})
            }    
        return res.status(StatusCodes.CREATED).json({success:true, message:"message scheduled successfully"})

    } 
    catch (error) 
    {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
    }
}

module.exports={sendRemainderQueue,scheduleModule}

