import { Router } from 'express'
import { v4 } from 'uuid'


const dispatchAndRespond = (req, res, action) => {
 req.store.dispatch(action)
 res.status(200).json(action)
}
const router = Router()

router.get("/projects", (req, res) =>
 res.status(200).json(req.store.getState().projects)
)
router.post("/projects", (req, res) =>
   dispatchAndRespond(req, res,
      {
       type: "ADD_PROJECT",
       payload:{
           id: v4(),
           title: req.body.title,
           deadline: new Date(req.body.deadline).toDateString(),
           createdBy:req.body.createdBy,
           date_started: new Date().toString(),
           leader: req.body.leader,
           client: req.body.client,
           agency: req.body.agency
       }
   })
)
router.put("/project", (req, res) =>
   dispatchAndRespond(req, res, {
       type: "EDIT_PROJECT",
       payload:{
         title: req.body.title,
         createdBy:req.body.createdBy,
         deadline: req.body.deadline,
         date_started: req.body.date_started,
         leader: req.body.leader,
         client: req.body.client,
         agency: req.body.agency,
         id: req.body.id,
         project_id:req.body.project_id,
         status:req.body.status,
         invoiced:req.body.invoiced,
         invoice:req.body.invoice,
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
export default router
