import {v4} from 'uuid'
import { refProjects, addProjecttoDb } from '../../../db/firebase'
const parseResponse = response => response.json()
const logError = error => console.error(error)


const fetchThenDispatch = (dispatch, url, method, body) =>
                   fetch(
                     url,
                     {
                     method,
                     body,
                     headers: { 'Content-Type': 'application/json' }
                     }
                   ).then(parseResponse)
                   .then(dispatch)
                   .catch(logError)

export const addProject=(createdBy,title,deadline,client,agency,description,project_id,leader=false,status=0,invoiced=false,invoice=false,tasks=false,brief=false,members=false)=> dispatch=>{
                 let date_started=new Date().toDateString()
                 let dead=deadline.toDateString()
                 let id=v4()
                 let project = { title:title.trim().replace(/ +(?= )/g,''),
                                    createdBy:createdBy,
                                    date_started:date_started,
                                    deadline:dead,
                                    leader:leader,
                                    members:members,
                                    client:client.trim().replace(/ +(?= )/g,''),
                                    agency:agency.trim().replace(/ +(?= )/g,''),
                                    id:id,
                                    status:status,
                                    invoiced:invoiced,
                                    invoice:invoice,
                                    tasks:tasks,
                                    description:description,
                                    project_id:project_id,
                                    brief:brief,
                                    priority:0 }
                 addProjecttoDb(project)
                 fetchThenDispatch(
                   dispatch,
                   '/api/project',
                   'POST',
                   JSON.stringify({
                   title:title.trim().replace(/ +(?= )/g,''),
                   createdBy:createdBy,
                   date_started:date_started,
                   deadline:dead,
                   leader:leader,
                   members:members,
                   client:client.trim().replace(/ +(?= )/g,''),
                   agency:agency.trim().replace(/ +(?= )/g,''),
                   id:id,
                   status:status,
                   invoiced:invoiced,
                   invoice:invoice,
                   tasks:tasks,
                   description:description,
                   project_id:project_id,
                   brief:brief,
                   priority:0
                 }))
}
export const addUser=(email,name,id,employee_id,photoURL='')=>dispatch=>{
             let createdAt=new Date().toDateString()
             fetchThenDispatch(
               dispatch,
               '/api/user',
               'POST',
               JSON.stringify({
                 email:email.trim().replace(/ +(?= )/g,''),
                 name:name.trim().replace(/ +(?= )/g,''),
                 id:id,
                 username:email.trim().replace(/ +(?= )/g,''),
                 createdAt:createdAt,
                 picture:photoURL,
                 employee_id:employee_id.trim().replace(/ +(?= )/g,'')
               })
             )
}
export const addRows=(rowData)=>dispatch=>{
             fetchThenDispatch(
               dispatch,
               '/api/rows',
               'POST',
               JSON.stringify({
                 rowData:rowData
               })
             )
}
export const addAdminToken=(token)=>dispatch=>{
             fetchThenDispatch(
                dispatch,
                '/api/token',
                'POST',
                JSON.stringify({
                    token:token
                })
             )
}
export const changeApplicationsState=(applications)=>dispatch=>{
             fetchThenDispatch(
               dispatch,
               '/api/applications',
               'POST',
               JSON.stringify({
                    applications:applications
               })
             )
}
export const changeStateUsers=(state)=>dispatch=>{
             fetchThenDispatch(
               dispatch,
               '/api/users',
               'POST',
               JSON.stringify({
                 state:state
               })
             )
}
export const changeStateProjects=(state)=>dispatch=>{
             fetchThenDispatch(
               dispatch,
               '/api/projects',
               'POST',
               JSON.stringify({
                 state:state
               })
             )
}
export const editUser=(email,name,id,photoURL='')=>dispatch=>{
              fetchThenDispatch(
                dispatch,
                '/api/user',
                'PUT',
                JSON.stringify({
                  email:email,
                  name:name,
                  username:email,
                  id:id,
                  employee_id:employee_id,
                  picture:photoURL
                })
              )
}
export const editProject=(createdBy,title,deadline,client,agency,description,id,leader=[],status=1,invoiced=false,invoice='',tasks=[],brief,project_id,priority=0,members=[])=>dispatch=>{
                let date_started=new Date().toDateString()
                let dead=new Date(deadline).toDateString()
                let project = {
                title:title,
                createdBy:createdBy,
                date_started:date_started,
                deadline:dead,
                leader:leader,
                client:client,
                agency:agency,
                id:id,
                status:status,
                invoiced:invoiced,
                invoice:invoice,
                tasks:tasks,
                description:description,
                brief:brief,
                project_id:project_id,
                priority:priority,
                members:members
                }
                addProjecttoDb(project)
                fetchThenDispatch(
                  dispatch,
                  '/api/project',
                  'PUT',
                  JSON.stringify(
                  {
                  title:title,
                  createdBy:createdBy,
                  date_started:date_started,
                  deadline:dead,
                  leader:leader,
                  client:client,
                  agency:agency,
                  id:id,
                  status:status,
                  invoiced:invoiced,
                  invoice:invoice,
                  tasks:tasks,
                  description:description,
                  brief:brief,
                  project_id:project_id,
                  priority:priority,
                  members:members
                  }))
}
export const removeUser = id =>dispatch =>{
                   fetchThenDispatch(
                       dispatch,
                       `/api/user/${id}`,
                       'DELETE'
                    )
}
export const removeProject = project_id =>dispatch =>{
                   refProjects.child(project_id).remove()
                   fetchThenDispatch(
                       dispatch,
                       `/api/project/${project_id}`,
                       'DELETE'
                    )
}
