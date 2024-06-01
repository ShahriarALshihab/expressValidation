const express=require('express'); 
const {body,validationResult}=require('express-validator'); 
const { emailVerification } = require('./validation/user.passwordValidation');

const app=express(); 

const port=8000; 

app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 

app.listen(port,()=>{
    console.log(`Server is run on port http://127.0.0.1:${port}`); 
}); 

app.get('/test',(req,res)=>{
    res.send('testing the server'); 
})

// app.post('/api/register',

// //input validation

// emailVerification

// ,
// (req,res)=>{
//     try{
//         const {name, email,password,dob}= req.body; 

//         const newUser={
//             name,email,password,dob
//         }; 

//         return res.status(201).json({
//            message:'user was created',
//             newUser
//         })

//     }catch(error){
//         return res.json({
//             message:error.message,
//         })
//     }
// })

app.post('/api/register',
    body('name')
    .trim()
    .notEmpty().withMessage('name is missing')
    .isLength({min:4}),

    (req,res,next)=>{
        const error=validationResult(req); 
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }
        next()
    },
    (req,res)=>{
        try{
            const {name,email,password,dob}=req.body; 
            const newUser={
                name,email,password,dob
            }

            res.status(201).json({
                newUser
            })
        }catch(error){
return res.json({
    message:error.message
})
        }
    }
   
)