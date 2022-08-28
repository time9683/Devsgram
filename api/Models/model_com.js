// import mongoose
import mongoose from 'mongoose'
// create a schema for coments , this is the model for coments
const comentSchema = new mongoose.Schema({
  UserInfo: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId
  },
  idP: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  },
  text: String,
  time: mongoose.Schema.Types.Date
})

const Coment = mongoose.model('coment', comentSchema)

export default Coment
