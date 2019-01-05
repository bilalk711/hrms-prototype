import {connect} from 'react-redux'
import {UIAddNewemployee} from '../ui/add_employee_view'
import {addUser} from '../store/reducers/action-creators/actions'

const mapDispatchToProps = dispatch =>
     ({
       addEmployee(email,name,id,employee_id,photoURL){
           dispatch(addUser(email,name,id,employee_id,photoURL))
       }
     })


export const AddNewemployee=connect(null,mapDispatchToProps)(UIAddNewemployee)
