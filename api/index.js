const express = require('express');
const {MongoClient} = require('mongodb');
const jwt = require('jsonwebtoken');
const upload = require('express-fileupload');
const cors = require('cors');
const { ObjectID, ObjectId } = require('bson');
const {GraphQLUpload,
    graphqlUploadExpress,} = require("graphql-upload");
const { finished } = require('stream/promises');
var uniqid = require('uniqid'); 
// const {buildSchema, validate} = require('graphql');
// const {graphqlHTTP} = require("express-graphql");

const {ApolloServer} = require('apollo-server-express');


// const { Router, json } = require('express');
const typeDefs = require("./schemaQL");






//importante


const clave = 'pwdISCOOL';
//url conexion mongodb
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
client.connect();
const base  = client.db("Devsgram")




app = express();
app.use(express.json());


app.use(cors({
    origin: '*'
}));


app.use(express.static('public'));
// app.use(upload());



//create a  entry point with pagination that return 5 Posts  depending on the page number
const getVideosPagination = async (page,limit) => {
    return await base.collection("Post").find({}).skip(page*limit).limit(limit).toArray();
}














app.post("/video/:page",(req, res) => {
    const page = req.params.page;
    getVideosPagination(page).then(videos => {
        console.log(videos.length);
        res.json(videos);
    })
})
   


app.post("/video/like", async (req, res) => {
console.log("like")
await base.collection("Post").updateOne({_id:ObjectID(req.body.video)},{$inc:{likes:1}})
res.send("exitoso");

})


app.get('/video/stream',async (req,res)=>{

    const data = await (await getVideos()).toArray();
res.json(data);


})


const resolvers =  {


    Upload:GraphQLUpload,

    Query:{

        //create a function with return the names of the users that user is following
           GetHistoryUsers  : async (root,args,context) => {
               const {id,code} =  context
                //  if(id) return   
                //  console.log(id) 
                if(code == 401){

                return {code:401}

                }
                 
               UserInfo = await base.collection("Users").findOne({_id:ObjectID(id)});
               followed =  UserInfo.followed;

                let Users =  await base.collection("Users").find({_id:{$in:followed},}).toArray();

                  let ids =  Users.map(user =>  user._id.toString());

               let  hashistory = await base.collection("Post").find({ref:{$in:ids},}).toArray(); 

               //create a array with the name of the user has Post
                let  UsersPost = hashistory.map(post => {  
                     let  user =  Users.find(user => user._id.toString() === post.ref.toString());
                 return {    name:user.name,_id:user._id,     }
                                                        })
                 //delete repeated users
                    let  FilterUsers = UsersPost.filter((item,index) => UsersPost.findIndex(item2 => item2._id === item._id) === index)
                return {historys:hashistory,Users : FilterUsers,code:200}
            
                
        },




        Vauth : (_,{Token})=>{



        const response   = verify(Token);
        

             
        return response;









        },



        //create a funtion that return users   that match the name
        GetUsers : async (root,{name}) => {
            const users = await base.collection("Users").find({name:new RegExp(name,"i")}).toArray();
            return users;
        },


               
                    
                    
                
                
                GetUser : (_,{id}) =>{
                return base.collection("Users").findOne({_id:ObjectId(id)});
                
                },
                
                
                
                
                Users : ()=>{
                
                return  base.collection("Users").find({}).toArray();
                
                },
                
                
                GetReals : async (_,{page,limit})=>{
                
                
                
                    return await getVideosPagination(page,limit);
                    
                    
                    
                    
                    
                    
                    },
                    
                    getOneReal: async (_,{_id}) =>{


                        return await base.collection("Post").findOne({type:"Reals",_id:ObjectID(_id)});
                        
                        
                        
                        
                        },
                    },

                        Mutation : {
                            addComent : async (_,{_id,person,text}) =>{
                                   console.log(`${_id},${person},${text}`);


                                try{
                                await base.collection("Post").updateOne({_id:ObjectID(_id)},{$addToSet:{coments:{ref:person,text:text,time:new Date}}});
                                return {status:'succes'};
                                }
                                catch(e){


                                    return {status: 'error',};

                                }




                            },

                            removeLike : async (_,{id,person}) =>{
                               console.log(id);
                             try{
                            const caca = await base.collection("Post").updateOne({_id:ObjectID(id)},{$pull:{likes:{idU:person}}});
                            console.log(caca);
                              return {status: 'success'};
                           
                             }catch(err){
                                 console.log(err);
                              return {status: 'error'};

                       
                             }



                            },

                            likes : async (_,{_id,person})=> {
                                 

                                console.log(person);

                               try{

                                await base.collection("Post").updateOne({_id:ObjectID(_id)},{$addToSet:{likes:{idU:person}}})
                                return {status: "success"};
                            }catch{
                             return {status: "error"};
                            }
                              






                            },

                            Auth : async (_,{email,password}) =>{
                             
                                // console.log(data);
                                console.log(password);
                                let User = await base.collection("Users").findOne({email:email});
                            //     console.log(User);
                                if(!User){    
                                return {status: "account not found",token:''};
                                }
                                    if(User.password === password){
                                        payload = { check:true,email:email,_id:User._id}
                                    const token =   jwt.sign(payload,clave,{expiresIn:1440})
                                    return {status: 'success',Token:token,_id:User._id};
                
                                    }else{
                                
                                
                                    return {status:'invalid password',Token:''};
                                
                                    }
                                
                                
                                    
                                
                                },

                            sendFile : async (parent, { file,text,tipe},context) =>{
                                const { createReadStream, filename, mimetype, encoding } = await file;
                                const stream = createReadStream();
                                const {id} = context;

                                const fileUrl = `${uniqid()}${filename}`;

                                    const out = require('fs').createWriteStream(`./public/${fileUrl}`);
                                stream.pipe(out)

                                await  finished(out);
                             console.log( {status:"succes",mensaje:`${filename}/${mimetype}`});
                                         
                                                                            

                                           try{

                                      await base.collection("Post").insertOne({ref:id,type:tipe,src:`/${fileUrl}`,description:text,likes:[],coments:[]})
                                        }catch{


                                           console.log('ufff fallo validacion')
                                            return {status:'failed'};
                                        }

                             return {status:"succes",mensaje:`${filename}/${mimetype}`};



                            },

    CreateAccount : async (_,{email,name,password})=>{
                    
        const Exist  = await base.collection("Users").findOne({email:email});
    
        if(Exist){
    
            return {status:"warning",mensaje:"cuenta ya existente"};
    
    
        }
    


        try{
    await base.collection("Users").insertOne({email,name,password});

    return {status:"success",mensaje:"creado existosamente"};
        }catch{
          
            return  {status:"error",mensaje:"secuencia de caracteres invalida"};
        }

    
    
    
    
    },


  }








};











const startServer = async () =>{
const server = new ApolloServer({typeDefs,resolvers,
    
    context :({req})=>{


        
        const token = req.headers['authorization'] || "";
        const payload = verify(token);
        if(payload.info?.check){
            return {
                token,
                id:payload.info._id
            }
        }
        return {
            token,
            id:null,
            code:401
        }
    



}})


await server.start()

app.use(graphqlUploadExpress());

server.applyMiddleware({ app });



await new Promise (r => app.listen({ port: 5000 }, r));

console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
}




startServer();


// app.listen(5000,()=>{
// console.log("listen in port 5000");
// })




const getVideos = async  () => {

return  await   base.collection("Post").find({});
}



const verify = (token)=>{
    var result; 
    jwt.verify(token,clave,(err,data)=>{
    
    if(err){
     result = {status:"No"}
    return
    }
    result = {status:"Ok",info:data};
    return
    })
    
    return result;
    }


