const mongoose = require('mongoose')

const ForgotSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true },
}, { timestamps: true })


export default mongoose.models.forgot || mongoose.model('forgot' , ForgotSchema)