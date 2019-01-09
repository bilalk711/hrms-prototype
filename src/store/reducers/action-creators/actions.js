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

export const addProject=(createdBy,title,deadline,client,agency,project_id,leader=false,status=0,invoiced=false,invoice=false,tasks=false,brief=false)=> dispatch=>{
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
                   id:id,
                   status:status,
                   invoiced:invoiced,
                   invoice:invoice,
                   tasks:tasks,
                   project_id:project_id,
                   brief:brief
                 }))
}
export const addUser=(email,name,id,employee_id,photoURL='')=>dispatch=>{
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
                 picture:photoURL,
                 employee_id:employee_id
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
export const editProject=(createdBy,title,deadline,client,agency,id,leader=[],status=1,invoiced=false,invoice='',tasks=[],brief,project_id)=>dispatch=>{
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
                  id:id,
                  status:status,
                  invoiced:invoiced,
                  invoice:invoice,
                  tasks:tasks,
                  brief:brief,
                  project_id:project_id
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
