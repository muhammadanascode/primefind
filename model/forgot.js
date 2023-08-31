const mongoose = require('mongoose')

const ForgotSchema = new mongoose.Schema({
    email: { type: String, required: true , unique:false },
    token: { type: String, required: true },
    time:{type:Number , required:true}
}, { timestamps: true })


export default mongoose.models.forgot || mongoose.model('forgot' , ForgotSchema)