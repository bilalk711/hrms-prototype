import {connect} from 'react-redux'
import {ProjectView} from '../ui/project_view'
import {editProject} from '../store/reducers/action-creators/actions'

const mapDispatchToProps = dispatch =>
     ({
       editProject(createdBy,title,deadline,client,agency,description,id,leader,status,invoiced,invoice,tasks,brief,project_id,priority,members) {
           dispatch(editProject(createdBy,title,deadline,client,agency,description,id,leader,status,invoiced,invoice,tasks,brief,project_id,priority,members))
         }
        })


export const Project=connect(null,mapDispatchToProps)(ProjectView)
