const mongoose= require('mongoose')



const whatsappMessage= new mongoose.Schema(
    {
        userId:
        {
            type:String,
        },
        userMobile:
        {
            type:String
        },
        senderMobile:
        {
            type:String
        },

        message:
        {
            type:String
        },
        status:
        {
            type:String,
            default:'pending'
        },
        sendAt:
        {
            type:String
        }
    }
)

module.exports=mongoose.model('whatsappMessage',whatsappMessage)