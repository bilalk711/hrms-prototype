import { Router } from 'express'
import { firebase } from './firebase/admin.js'


const userCommands= Router()


userCommands.post("/worker",(req,res)=>{
             firebase.auth().createUser({
                  email: req.body.email,
                  emailVerified: true,
                  password: req.body.password,
                  displayName: req.body.name,
                      })
            .then((userRecord)=>{
            console.log("User created with id:", userRecord.uid)
            res.json({success:true,user:userRecord})
            }
            )
            .catch(error=>{
            console.log(error)
            res.json({success:false,message:error})
            }
            )
          }
)
userCommands.put("/worker",(req,res)=>{
             firebase.auth().updateUser(req.body.id,{
                  email: req.body.email,
                  password: req.body.password,
                  displayName:req.body.name,
                      })
            .then((userRecord)=>{
            res.json({success:true,user:userRecord})
            }
            )
            .catch(error=>{
            console.log(error)
            res.json({success:false,message:error})
            }
            )
          }
)
userCommands.delete("/worker",(req,res)=>{
             firebase.auth().deleteUser(req.body.id)
             .then(()=>
              res.json({success:true})
           )
             .catch(error=>{
              console.log(error)
              res.json({success:false})
             })
})

export default userCommands
