import {connect} from 'react-redux'
import {UIProjectsOverview} from '../ui/projectsoverview_view'

const mapStateToProps=state=>{
      return {projects:state.projects,currentUser:state.currentUser}
}
const mapDispatchToProps = dispatch =>
     ({
       removeProject(project) {
           dispatch(project)
        }
     })


export const ProjectsOverview=connect(mapStateToProps,mapDispatchToProps)(UIProjectsOverview)
