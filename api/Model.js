import { ObjectID } from 'bson'
import { finished } from 'stream/promises'
import uniqid from 'uniqid'
import jwt from 'jsonwebtoken'
import fs from 'fs'
import mongoose from 'mongoose'
import User from './Models/model_User.js'
import Post from './Models/model_Post.js'
import Like from './Models/model_likes.js'
import Coment from './Models/model_com.js'
// import Follow from './Models/model_Followers.js'
const url = 'mongodb://localhost:27017/Devsgram'

const main = async () => {
  await mongoose.connect(url)
  console.log('Connected to MongoDB')
}
main()
const clave = 'pwdISCOOL'

const getVideosPagination = async (page, limit) => {
  return await Post.find({ type: 'Reals' }).skip(page * limit).limit(limit).populate('UserInfo').populate('likes').populate('coments', 'UserInfo text time', { sort: { time: -1 } }, { populate: { path: 'UserInfo', select: 'name' } })
  // return await base.collection('Post').find({ type: 'Reals' }).skip(page * limit).limit(limit).toArray()
}

const getAllcontent = async (page, limit) => {
  return await Post.find({type:{$in:['Reals','Post']}}).skip(page * limit).limit(limit).populate('UserInfo').populate('likes').populate('coments', 'UserInfo text time', { sort: { time: -1 } }, { populate: { path: 'UserInfo', select: 'name' } })
  // return await base.collection('Post').find({}).skip(page * limit).limit(limit).toArray()
}

const Query = {

  GetUsersWithHistory: async (root, args, context) => {
    const { id, code } = context
    // if (id) return { code: 202, User: [] }
    //   //  console.log(id)
    // console.log(id)
    // if (Number(code) === 401) {
    //   return { code: 401 }
    // }

   const user = await User.findById(id).populate("followed", "name posts", { sort: { time: -1 } }, { populate: { path: 'posts', select: 'src type date',match:{
      type:'History'
   } } })
   const { followed } = user
   let usersWithhis= [];
for(let i = 0; i < followed.length; i++){ 
    //verify if user has posts
    if(followed[i].posts.length > 0){
      usersWithhis.push(followed[i])
    }
}



    return  usersWithhis

  },

  Vauth: (_, { Token }) => {
    return verify(Token)
  },

  GetUsers: async (root, { name }) => {
    const Users = await User.find({ name: { $regex: name, $options: 'i' } })
    return Users
  },

  // create a funtion that return the reels of the user id
  GetReelsOfUser: async (root, { id }) => {
    return await Post.find({ UserInfo: id, type: 'Reals' }).populate('UserInfo').populate('likes').populate('coments', 'UserInfo text time', { sort: { time: -1 } }, { populate: { path: 'UserInfo', select: 'name' } })
    // return await base.collection('Post').find({ ref: id }).toArray()
  },

  GetUser: async (_, { id, name }) => {
    let user
    if (id) {
      user = await User.findById(id)
    } else {
      user = await User.findOne({ name })
    }

    return user.populate('posts')
  },

  Users: async () => {
    return await User.find().populate('posts').populate('followers')
  },

  GetReals: async (_, { page, limit }) => {
    return await getVideosPagination(page, limit)
  },

  GetAll: async (_, { page, limit }) => {
    return await getAllcontent(page, limit)
  },

  getOneContent: async (_, { _id }) => {
    return await Post.findById(_id).populate('UserInfo').populate('likes').populate('coments', 'UserInfo text time', { sort: { time: -1 } }, { populate: { path: 'UserInfo', select: 'name' } })
    // return await base.collection('Post').findOne({ _id: ObjectID(_id) })
  },

  getOneReal: async (_, { _id }) => {
    return await Post.findOne({ _id: ObjectID(_id) }).populate('UserInfo').populate('likes').populate('coments', 'UserInfo text time', { sort: { time: -1 } }, { populate: { path: 'UserInfo', select: 'name' } })
    // return await base.collection('Post').findOne({ type: 'Reals', _id: ObjectID(_id) })
  }

}

const Mutation = {

  follow: async (_, { id }, context) => {
    const { id: idU } = context

    let user = await User.findById(idU)
    let user2 = await User.findById(id)

     if(user.followed.includes(id)){
      return { status: 401, message: 'you are already following this user' }
    }
     user.followed = [...user.followed, id]

     await user.save()
     user2.followers = [...user2.followers, idU]
      await user2.save()

    // if (newFollow) {
    //   return { code: 400, message: 'You are already following this user' }
    // }
    // const newFollowed = new Follow({
    //   follower: idU,
    //   followed: id
    // })
    // const saveFollow = await newFollowed.save()
    // if (saveFollow) {
    //   user.followed = [...user.followed, id]
    //   await user.save()
    //   user2.followers = [...user2.followers, idU]
    //   await user2.save()

      return { status: 200 }
    
  },

  addComent: async (_, { _id, person, text }) => {
    console.log(`${_id},${person},${text}`)

    try {
      const post = await Post.findById(_id)
      const NewComent = new Coment({
        UserInfo: person,
        text,
        idP: post._id,
        time: new Date()

      })
      const SaveComent = await NewComent.save()
      post.coments = [...post.coments, SaveComent._id]
      await post.save()
      return { status: 'succes' }
    } catch (e) {
      return { status: 'error' }
    }
  },

  removeLike: async (_, { id, person }) => {
    const post = await Post.findById(id)
    const like = await Like.findOne({ idP: id, idU: person })

    try {
      // delete like from like collection and post collection
      like.remove()
      post.likes.splice(post.likes.indexOf(Like._id), 1)
      await post.save()

      // const caca = await base.collection('Post').updateOne({ _id: ObjectID(id) }, { $pull: { likes: { idU: person } } })
      return { status: 'success' }
    } catch (err) {
      console.log(err)
      return { status: 'error' }
    }
  },

  likes: async (_, { _id, person }) => {
    // check if the user has liked the post
    const like = await Like.findOne({ idP: _id, idU: person })
    if (like) {
      return { status: 'like more exist' }
    }

    const post = await Post.findById(_id)
    const user = await User.findById(person)

    try {
      const Newlike = new Like({ idU: user._id, idP: post._id })
      const SaveLike = await Newlike.save()
      // add like to post
      post.likes = post.likes.concat(SaveLike._id)
      await post.save()
      // await base.collection('Post').updateOne({ _id: ObjectID(_id) }, { $addToSet: { likes: { idU: person } } })
      return { status: 'success' }
    } catch {
      return { status: 'error' }
    }
  },

  Auth: async (_, { email, password }) => {
  //   // console.log(data);
  //   console.log(password)
  //   const User = await base.collection('Users').findOne({ email: email })
  // get user
    const user = await User.findOne({ email: email })
    console.log('input', email)
    console.log('on', user.email)
    //   //     console.log(User);
    if (!user) {
      return { status: 'account not found', token: '' }
    }
    if (user.password === password) {
      const payload = { check: true, email: email, _id: user._id }
      const token = jwt.sign(payload, clave, { expiresIn: 1440 })
      return { status: 'success', Token: token, _id: user._id, email: user.email }
    } else {
      return { status: 'invalid password', Token: '' }
    }
  },

  sendFile: async (parent, { file, text, tipe }, context) => {
    const { createReadStream, filename, mimetype } = await file
    const stream = createReadStream()
    const { id } = context

    const fileUrl = `${uniqid()}${filename}`

    const out = fs.createWriteStream(`./public/${fileUrl}`)
    stream.pipe(out)

    await finished(out)
    console.log({ status: 'succes', mensaje: `${filename}/${mimetype}` })

    try {
      // eslint-disable-next-line prefer-const
      let user = await User.findById(id)
      console.log(id)
     let newPost;
      if(tipe === 'History'){
         newPost = await Post.create({ UserInfo: user._id, description: text, type: tipe, src: `/${fileUrl}`,date: new Date(),expires:new Date() })

      }else{
        
         newPost = await Post.create({ UserInfo: user._id, description: text, type: tipe, src: `/${fileUrl}`,date: new Date() })
      }


      const savePost = await newPost.save()

      // add new post to user
      user.posts = [...user.posts, savePost._id]
      await user.save()

      // await base.collection('Post').insertOne({ ref: id, type: tipe, src: `/${fileUrl}`, description: text, likes: [], coments: [] })
    } catch (e) {
      console.log('ufff fallo validacion', e)
      return { status: 'failed' }
    }

    return { status: 'succes', mensaje: `${filename}/${mimetype}` }
  },

  CreateAccount: async (_, { email, name, password }) => {
    const Exist = await User.findOne({ email: email })
    if (Exist) {
      return { status: 'warning', mensaje: 'cuenta ya existente' }
    }

    try {
      console.log('gola')
      const newUser = await User.create({ email: email, name: name, password: password })
      await newUser.save()
      return { status: 'success', mensaje: 'creado existosamente' }
    } catch {
      return { status: 'error', mensaje: 'secuencia de caracteres invalida' }
    }
  }
}

const verify = (token) => {
  let result
  jwt.verify(token, clave, (err, data) => {
    if (err) {
      result = { status: 'No' }
      return
    }
    result = { status: 'Ok', info: data }
  })

  return result
}

export { Query, Mutation }
