import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({

  UserInfo: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId
  },
  src: String,
  type: String,
  description: String,
  likes: [{
    ref: 'like',
    type: mongoose.Schema.Types.ObjectId
  }],
  coments: [{
    ref: 'coment',
    type: mongoose.Schema.Types.ObjectId
  }],
   date: mongoose.Schema.Types.Date,
   expires: mongoose.Schema.Types.Date,

})

const Post = mongoose.model('post', PostSchema)

export default Post
