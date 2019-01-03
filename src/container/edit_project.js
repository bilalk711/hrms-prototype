import {connect} from 'react-redux'
import UIEditProject from '../ui/editproject_view'
import {editProject} from '../store/reducers/action-creators/actions'

const mapDispatchToProps = dispatch =>
     ({
       editProject(title,deadline,leader,client,agency,project_id,status,invoiced,invoice) {
           dispatch(editProject(title,deadline,leader,client,agency,project_id,status,invoiced,invoice))
        }
     })


export const EditProject=connect(null,mapDispatchToProps)(UIEditProject)
