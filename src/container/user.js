import {connect} from 'react-redux'
import {UserView} from '../ui/User_view'
import {editUser} from '../store/reducers/action-creators/actions'

const mapDispatchToProps = dispatch =>
     ({
       editUser(email,name,id,photoURL) {
           dispatch(editUser(email,name,id,photoURL))
        },
       currentUser(user){
           dispatch(user)
       }
     })

export const User=connect(null,mapDispatchToProps)(UserView)
