import {connect} from 'react-redux'
import {UIprojects} from '../ui/projects_view'
import {removeProject, editProject} from '../store/reducers/action-creators/actions'

const mapStateToProps=state=>{
      return {projects:state.projects}
}
const mapDispatchToProps=dispatch=>({
      removeProject(project_id){
        dispatch(removeProject(project_id))
      },
      editProject(createdBy,title,deadline,client,agency,description,id,leader,status,invoiced,invoice,tasks,brief,project_id,priority) {
          dispatch(editProject(createdBy,title,deadline,client,agency,description,id,leader,status,invoiced,invoice,tasks,brief,project_id,priority))
        }
})

export const Projects=connect(mapStateToProps,mapDispatchToProps)(UIprojects)
