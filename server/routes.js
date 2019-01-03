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
router.put("/project/:id", (req, res) =>
   dispatchAndRespond(req, res, {
       type: "EDIT_PROJECT",
       payload:{
         title: req.body.title,
         deadline: new Date(req.body.deadline).toDateString(),
         date_started: new Date().toString(),
         leader: req.body.leader,
         client: req.body.client,
         agency: req.body.agency,
         project_id:req.params.id
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
