const express=require('express'); 

const {body,validationResult}=require('express-validator'); 

const passwordConfirmation=body('passwordConfirmation').custom((value,{req})=>{
 if(value!==req.body.password){
    throw new Error('Password not match'); 
}
return true; 
})



const emailVerification=body('email').custom((value)=>{
 return User.findUserByEmail(value).then(user=>{
    if(user){
        return Promise.reject(`E-mail is already in use`); 
    }
 })
}); 



module.exports={passwordConfirmation ,emailVerification}