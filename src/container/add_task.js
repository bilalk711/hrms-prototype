import {connect} from 'react-redux'
import {AddTaskView} from '../ui/add_task_view'

const mapDispatchToProps = dispatch =>
     ({
       editProject(project) {
           dispatch(project)
        }
     })


export const AddTask=connect(null,mapDispatchToProps)(AddTaskView)
