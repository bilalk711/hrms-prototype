import {connect} from 'react-redux'
import {UIprojects} from '../ui/projects_view'
import {removeProject} from '../store/reducers/action-creators/actions'

const mapStateToProps=state=>{
      return {projects:state.projects}
}
const mapDispatchToProps=dispatch=>({
      removeProject(project_id){
        dispatch(removeProject(project_id))
      }
})

export const Projects=connect(mapStateToProps,mapDispatchToProps)(UIprojects)
