import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userScheme  = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  cash: { type: Number, default:0, required: true},
  credit: { type: Number, default:0, required: true}
})

userScheme.pre('save',async function(next){
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword;
    next()
  } catch (error) {
    next(error)
  }
  next()
})

export default mongoose.model('user', userScheme)
