import store from './storeFactory'
import { editUser } from './reducers/action-creators/actions'
import { app, refApplications } from '../db/firebase'


const users=store.getState().users



const addLeave=(user_id)=>{
      const [user]=users.filter(i=>i.id===user_id)
      if(user===undefined){
              return false
      }
      const newLeave = refApplications.push(user_id)
      newLeave.set({
          employee:user,
          leave_type:leave_type,
          from:from,
          to:to
        }
  )
}
const isEmpty=(obj)=>{
      for(var key in obj) {
         if(obj.hasOwnProperty(key))
             return false;
      }
      return true;
}
export const updateUserSettings=(user)=>{
       app.auth().currentUser.updateProfile({
                  email: user.email,
                  emailVerified: true,
                  displayName: user.name,
                  photoURL: user.picture,
       }).then(()=>{
           console.log('User Profile Updated!')
           editUser(user.email,user.name,user.id,user.picture)
     }
     )
     .catch(error=>
          console.log(error)
     )
}
export const setAdmin=(user)=>{
      const newUser={...user,admin:true}
      store.dispatch({type:'EDIT_USER',payload:newUser})
}
