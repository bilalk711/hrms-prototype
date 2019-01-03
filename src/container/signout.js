import {app} from '../db/firebase'
import store from '../store/storeFactory'

const SignOut=()=>
      app.auth().signOut().then(function() {
        
          }).catch(function(error) {
            // An error happened.
          });
export default SignOut
