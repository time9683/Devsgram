import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({

  email: String,
  name: String,
  password: String,

  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  followed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }],
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }]

})

const User = mongoose.model('user', UserSchema)

export default User
