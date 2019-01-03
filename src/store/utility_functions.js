import store from './storeFactory'
import { editUser } from './reducers/action-creators/actions'
import { app } from '../db/firebase'
require("babel-core/register")
require("babel-polyfill")


const users=store.getState().users

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
