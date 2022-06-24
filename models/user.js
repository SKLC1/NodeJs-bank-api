import mongoose from 'mongoose'

const userScheme  = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  cash: { type: Number, default:0, required: true},
  credit: { type: Number, default:0, required: true}
})

export default mongoose.model('user', userScheme)
