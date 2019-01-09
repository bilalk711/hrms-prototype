import { Router } from 'express'
import { v4 } from 'uuid'
import { firebase } from './firebase/admin.js'


const dispatchAndRespond = (req, res, action) => {
 req.store.dispatch(action)
 res.status(200).json(action)
}
const router = Router()

router.get("/project", (req, res) =>
 res.status(200).json(req.store.getState().projects)
)
router.post("/project", (req, res) =>
   dispatchAndRespond(req, res,
      {
       type: "ADD_PROJECT",
       payload:{
           createdBy: req.body.createdBy,
           project_id: req.body.project_id,
           id: req.body.id,
           title: req.body.title,
           deadline: req.body.deadline,
           date_started: req.body.date_started,
           leader: req.body.leader,
           client: req.body.client,
           agency: req.body.agency,
           status: req.body.status,
           invoiced:req.body.invoiced,
           invoice:req.body.invoice,
           brief:req.body.brief,
           tasks:req.body.tasks
       }
   })
)
router.post("/projects", (req,res) =>
   dispatchAndRespond(req, res,
        {
        type:"CHANGE_STATE_PROJECTS",
        payload:{
          state:req.body.state
          }
    })
)
router.post("/user",(req,res) =>
   dispatchAndRespond(req,res,{
       type:"SIGNUP_USER",
       payload:{
            email:req.body.email,
            name:req.body.name,
            id:req.body.id,
            employee_id:req.body.employee_id,
            picture:req.body.picture,
            messageToken:req.body.currentToken,
            createdAt:req.body.createdAt
       }
   })
 )
router.post("/users",(req,res)=>
     dispatchAndRespond(req,res,{
       type:"CHANGE_STATE_USERS",
       payload:{
            state:req.body.state
       }
     })
)
router.put("/user",(req,res) =>
    dispatchAndRespond(req,res,{
      type:"EDIT_USER",
      payload:{
            email:req.body.email,
            name:req.body.name,
            picture:req.body.picture,
            id:req.body.id
      }
    })
)
router.post("/rows",(req,res)=>
    dispatchAndRespond(req,res,{
      type:"SAVE_DATA_GRID",
      payload:{
          rowData:req.body.rowData
      }
    })
)
router.put("/project", (req, res) =>
   dispatchAndRespond(req, res, {
       type: "EDIT_PROJECT",
       payload:{
         createdBy:req.body.createdBy,
         title: req.body.title,
         deadline: req.body.deadline,
         date_started: req.body.date_started,
         leader: req.body.leader,
         client: req.body.client,
         agency: req.body.agency,
         status: req.body.status,
         invoiced:req.body.invoiced,
         invoice:req.body.invoice,
         id:req.body.id,
         project_id:req.body.project_id,
         tasks:req.body.tasks,
         brief:req.body.brief
         }
   })
)
router.delete("/project/:id", (req, res) =>
    dispatchAndRespond(req, res, {
       type: "REMOVE_PROJECT",
       payload:{
       id: req.params.id
       }
     })
)
router.delete("/user/:id", (req, res) =>
    dispatchAndRespond(req, res, {
       type: "REMOVE_USER",
       payload:{
       id: req.params.id
       }
     })
)
router.post("/token",(req, res)=>
     dispatchAndRespond(req, res, {
       type: "ADD_ADMIN_TOKEN",
       payload:{
         token:req.body.token
       }
     })
)
router.post("/setCustomClaims", (req, res) => {
  const idToken = req.body.idToken
  firebase.auth().verifyIdToken(idToken)
  .then(claims => {
    if (typeof claims.email !== 'undefined' &&
        claims.email.endsWith('@admin.dreamteam.com')) {
        firebase.auth().setCustomUserClaims(claims.sub, {admin: true})
        .then(function() {
            res.end(JSON.stringify({status: 'success'}))
       })
    }
    else {
      res.end(JSON.stringify({status: 'ineligible'}))
    }
  })
})
router.post("/applications/request",(req,res)=>{
var message = {
          data: {
             leaveType:req.body.leaveType,
             applicant:req.body.applicant,
          }, token: req.body.token
        }
firebase.messaging().send(message)
.then((response) => {
  console.log('Successfully sent message:', response)
  res.json({success:true})
})
.catch((error) => {
   console.log('Error sending message:', error)
   res.json({success:false})
})
})

export default router
