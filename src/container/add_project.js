import {connect} from 'react-redux'
import UIAddNewproject from '../ui/add_project_view'
import {addProject} from '../store/reducers/action-creators/actions'

const mapStateToProps = state =>
     ({
        currentUser:state.currentUser
     })
const mapDispatchToProps = dispatch =>
     ({
       addProject(createdBy,title,deadline,client,agency,project_id) {
           dispatch(addProject(createdBy,title,deadline,client,agency,project_id))
        }
     })


export const AddNewproject=connect(mapStateToProps,mapDispatchToProps)(UIAddNewproject)
