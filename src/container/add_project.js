import {connect} from 'react-redux'
import UIAddNewproject from '../ui/add_project_view'
import {addProject} from '../store/reducers/action-creators/actions'

const mapStateToProps = state =>
     ({
        currentUser:state.currentUser
     })
const mapDispatchToProps = dispatch =>
     ({
       addProject(createdBy,title,deadline,leader,client,agency,status,invoiced) {
           dispatch(addProject(createdBy,title,deadline,leader,client,agency,status,invoiced,invoiced))
        }
     })


export const AddNewproject=connect(mapStateToProps,mapDispatchToProps)(UIAddNewproject)
