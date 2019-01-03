import { Router } from 'express'
import { firebase } from './firebase/admin.js'


const userCommands= Router()


userCommands.post("/worker",(req,res)=>{
             firebase.auth().createUser({
                  email: req.body.email,
                  password: req.body.password,
                  displayName: req.body.name,
                      })
            .then((userRecord)=>{
            console.log("User created with id:", userRecord.uid)
            res.json({success:true})
            }
            )
            .catch(error=>{
            console.log(error)
            res.json({success:false,message:error})
            }
            )
          }
)

export default userCommands
