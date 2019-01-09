import firebase from 'firebase'
import { FirebaseConfig } from "./config/keys"

export const app=firebase.initializeApp(FirebaseConfig)

export const databaseRef = firebase.database()
export const refProjects = databaseRef.ref("projects")
export const refUsers = databaseRef.ref("users")


let fetching=false;

export const writeUserData=(userId, name, email, imageUrl)=>{
  const newUser = refUsers.push()
  newUser.set({
      username: name,
      email: email,
      joined:new Date(),
      profile_picture : imageUrl,
      id: userId
    }
    )
}
export const deleteUser=(userId)=>{
   app.database().ref('users/'+userId).delete()
}
export const addProjecttoDb = ( project )=>{
       const newProject=refProjects.push()
       newProject.set(project)
}
export const fromStore = (state, db) => {
       if(!fetching){
       const projects=Object.assign({},state.projects)
       refProjects.set(projects)
       const users=Object.assign({},state.users)
       refUsers.set(users)
     }
}


const fromDb = (db, dispatch) => {
  fetching=true;
  refProjects.on('value', data => {
    if (data.val()) {
      const newState=Object.assign([],data.val())
      dispatch({ type:'CHANGE_STATE', payload: {state:newState}  })
    }
  })
  refUsers.on('value', data => {
    if (data.val()) {
      const newState=Object.assign([],data.val())
      dispatch({ type:'CHANGE_STATE_USERS', payload: {state:newState}  })
    }
  })
  fetching=false;
}
