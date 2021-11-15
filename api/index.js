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









const clave = 'pwdISCOOL';

const client = new MongoClient('mongodb://localhost:27017/?readPreference=primary&ssl=false');
client.connect();
const base  = client.db("Devsgram")




app = express();
app.use(express.json());


app.use(cors({
    origin: '*'
}));


app.use(express.static('public'));
// app.use(upload());



















app.post("/video/add",(req, res) => {

    let Efile = req.files.file;
    Efile.mv(`./public/${Efile.name}`,err => {
    if(err){
    console.log("Error: " + err);
    return res.status(500).send(`${Efile.name} error to added`);
    }
    
    return res.status(200).send(`${Efile.name} added`);
    })
    })

app.post("/video/like",async (req, res) => {
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


        Vauth : (_,{Token})=>{



        const response   = verify(Token);
        

             
        return response;









        },
        GetReals :  ()=>{


            //  return [{name:"josua"},{name:"papito"}]
            return base.collection("Post").find({type:'Reals'}).toArray();
            
            
            
            
            
            
            },


               
                    
                    
                
                
                GetUser : (_,{id}) =>{
                return base.collection("Users").findOne({_id:ObjectId(id)});
                
                },
                
                
                
                
                Users : ()=>{
                
                return  base.collection("Users").find({}).toArray();
                
                },
                
                
                GetReals : async ()=>{
                
                
                
                    return base.collection("Post").find({type:'Reals'}).toArray();
                    
                    
                    
                    
                    
                    
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
                                    return {status: 'success',Token:token,Id:User._id};
                
                                    }else{
                                
                                
                                    return {status:'invalid password',Token:''};
                                
                                    }
                                
                                
                                    
                                
                                },

                            sendFile : async (parent, { file,text }) =>{
                                const { createReadStream, filename, mimetype, encoding } = await file;
                                const stream = createReadStream();

                                const fileUrl = `${uniqid()}${filename}`;

                                    const out = require('fs').createWriteStream(`./public/${fileUrl}`);
                                stream.pipe(out)

                                await  finished(out);
                             console.log( {status:"succes",mensaje:`${filename}/${mimetype}`});
                                         
                             let tipo;
                             if(mimetype === "image/jpeg" || mimetype === "image/jpg"){

                              
                              tipo = post

                             }else{ 

                                tipo = 'Reals'

                             }
                                                                                         

                                           try{

                                      await base.collection("Post").insertOne({type:tipo,src:`http://192.168.1.109:5000/${fileUrl}`,description:text,likes:[],coments:[]})
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
const server = new ApolloServer({typeDefs,resolvers})


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