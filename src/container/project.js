import {connect} from 'react-redux'
import {ProjectView} from '../ui/project_view'
import {editProject} from '../store/reducers/action-creators/actions'

const mapDispatchToProps = dispatch =>
     ({
       editProject(createdBy,title,deadline,leader,client,agency,project_id,status,invoiced,invoice,tasks) {
           dispatch(editProject(createdBy,title,deadline,leader,client,agency,project_id,status,invoiced,invoice,tasks))
        }
     })


export const Project=connect(null,mapDispatchToProps)(ProjectView)
