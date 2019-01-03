import {connect} from 'react-redux'
import {EmployeesView} from '../ui/employees_view'
import {removeUser,editUser} from '../store/reducers/action-creators/actions'

const mapStateToProps=state=>{
      return {users:state.users,currentUser:state.currentUser}
}
const mapDispatchToProps = dispatch =>
      ({
        removeUser(id) {
            dispatch(removeUser(id))
          },
        editUser(email,name,id,photoURL)    {
            dispatch(editUser(email,name,id,photoURL))
         }
      })

export const Employees=connect(mapStateToProps,mapDispatchToProps)(EmployeesView)
