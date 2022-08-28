import mongoose from 'mongoose'

// create a schema for likes , this is the model for likes
const likeSchema = new mongoose.Schema({
  idU: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  idP: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }
})

const Like = mongoose.model('like', likeSchema)

export default Like
