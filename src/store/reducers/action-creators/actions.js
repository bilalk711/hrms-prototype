import {v4} from 'uuid'
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

export const addProject=(createdBy,title,deadline,client,agency,leader=[],status=0,invoiced=false,tasks=[])=> dispatch=>{
                 let date_started=new Date().toDateString()
                 let dead=new Date(deadline).toDateString()
                 let id=v4()
                 fetchThenDispatch(
                   dispatch,
                   '/api/project',
                   'POST',
                   JSON.stringify({
                   title:title,
                   createdBy:createdBy,
                   date_started:date_started,
                   deadline:dead,
                   leader:leader,
                   client:client,
                   agency:agency,
                   project_id:id,
                   status:status,
                   invoiced:invoiced,
                   tasks:tasks
                 }))
}
export const addUser=(email,name,id,photoURL='')=>dispatch=>{
             let createdAt=new Date().toDateString()
             fetchThenDispatch(
               dispatch,
               '/api/user',
               'POST',
               JSON.stringify({
                 email:email,
                 name:name,
                 id:id,
                 username:email,
                 createdAt:createdAt,
                 picture:photoURL
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
                  picture:photoURL
                })
              )
}
export const editProject=(createdBy,title,deadline,client,agency,project_id,leader=[],status=1,invoiced=false,invoice='',tasks=[],brief)=>dispatch=>{
                let date_started=new Date().toDateString()
                let dead=new Date(deadline).toDateString()
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
                  project_id:project_id,
                  status:status,
                  invoiced:invoiced,
                  invoice:invoice,
                  tasks:tasks,
                  brief:brief
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
                   fetchThenDispatch(
                       dispatch,
                       `/api/project/${project_id}`,
                       'DELETE'
                    )
}
