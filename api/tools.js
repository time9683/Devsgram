
export const verify = (token)=>{
    var result; 
    
    // console.log("caca")
    jwt.verify(token,clave,(err,data)=>{
    
    
    
    if(err){
    // console.log(err)
    
     result = {status:"err"}
    return
    }
    
    
    result = {status:"success",info:data};
    
    return
    
    })
    
    
    return result;
    
    
    
    
    
    }