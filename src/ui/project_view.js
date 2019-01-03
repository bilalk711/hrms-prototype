import React from 'react'
import {Navigation} from './navigation_view'
import {ProjectSettings} from './project_settings'
import {SettingsList} from './settings_list'
import {AddArtwork} from './artwork'
import {Brief} from './brief'
import {Header} from '../container/header'
import {UsersCatalog} from '../container/users_catalog'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import propTypes from 'prop-types'

class ProjectView extends React.Component{
      constructor(props){
           super(props)
           this.state={saved:false,project:null,filteredProject:null,selected:'first'}
           this.newTaskAdded=this.newTaskAdded.bind(this)
           this.artWorkAdded=this.artWorkAdded.bind(this)
           this.showAllTasks=this.showAllTasks.bind(this)
           this.filterTasks=this.filterTasks.bind(this)
           this.activateButton=this.activateButton.bind(this)
           this.saveSettings=this.saveSettings.bind(this)
           this.briefAdded=this.briefAdded.bind(this)
           this.stateChanged=this.stateChanged.bind(this)
           this.leaderAdded=this.leaderAdded.bind(this)
      }
      stateChanged(newState){
           this.setState({project:newState})
      }
      saveSettings(){
           const {project}=this.state
           try{
           this.props.editProject(project.createdBy,project.title,project.deadline,project.client,project.agency,project.project_id,project.leader,project.status,project.invoiced,project.invoice,project.tasks)
           this.setState({saved:true})
           }
           catch(error){
             console.log(error)
           }
      }
      activateButton(name){
           return (name===this.state.selected) ? 'active-tasks-buttons tasks-list-buttons' : 'tasks-list-buttons'
      }
      filterTasks(value,rf){
           var newTasks=this.state.project.tasks.filter((task)=>task.completed===value)
           var newProjectState={...this.state.project}
           newProjectState.tasks=newTasks
           this.setState({filteredProject:newProjectState,selected:rf})
      }
      showAllTasks(rf){
           this.setState({filteredProject:this.state.project,selected:rf})
      }
      leaderAdded(leaders){
           const newProjectState={...this.state.project,leader:leaders}
           this.setState({project:newProjectState})
      }
      briefAdded(newProjectState){
           this.setState({project:newProjectState,filteredProject:newProjectState})
           console.log(this.state.project)
      }
      newTaskAdded(newProjectState){
           this.setState({project:newProjectState,filteredProject:newProjectState})
      }
      artWorkAdded(newProjectState){
           this.setState({project:newProjectState,filteredProject:newProjectState})
      }
      componentDidMount(){
           this.setState({project:this.props.location.state.project,
            filteredProject:this.props.location.state.project
           })
      }
      render(){
      const {filteredProject, project} = this.state
      return(
      <div className='JSX-container'>
      <Header/>
      <div className='page'>
      <Navigation/>
      <div className='page-content project-content'>
      <div className='project-buttons-container'>
      <SettingsList project={project} newTaskAdded={this.newTaskAdded} saveSettings={this.saveSettings} />
      </div>
      {project ?
      <div className='project-container'>
      <div className='project-introduction'>
      <div className='project-title-container'>
      <h2> {project.title} </h2>
      </div>
      <div className='project-description'>
      {project.brief ?
        <a className='download-brief-files' href={project.brief} download> Download Brief</a>
        :
        <div><h3>Project description or </h3><Brief project={project} briefAdded={this.briefAdded}/></div>
      }
      <p> {project.description} </p>
      </div>
      </div>
      <div className='project-details'>
      <h2> Project Details </h2>
      <div className='project-details-rows'>
      <h3> Client: </h3>
      <h3><strong> {project.client} </strong></h3>
      </div>
      <div className='project-details-rows'>
      <h3>Created:</h3>
      <h3><strong>{project.date_started}</strong></h3>
      </div>
      <div className='project-details-rows'>
      <h3>Created By:</h3>
      <h3><strong>{project.createdBy.name}</strong></h3>
      </div>
      <div className='project-details-rows'>
      <h3>Deadline:</h3>
      <h3><strong>{new Date(project.deadline).toDateString()}</strong></h3>
      </div>
      <div className='project-details-rows'>
      <h3>Status:</h3>
      <h3>{project.status===0?
        <strong>In Progress</strong>
        :
        <strong>Completed</strong>
      }</h3>
      </div>
      <div className='project-details-rows'>
      <h3>Invoiced:</h3>
      <h3>{project.invoiced&&project.status ?
       <strong style={{color:'#30c960'}}>
        <FontAwesomeIcon
      icon="check-circle"
      color="#30c960"
/>{' '} {project.invoice} </strong> : <strong style={{color:'red'}}>Not Ready</strong>}
</h3>
      </div>
      </div>
      <div className='project-tasks-container'>
      {project.tasks&&
      <div>
      {project.tasks.length===0?
      <p> No tasks Added </p>
      :
      <div className='tasks-list-container'>
      <div className='tasks-list-filters'>
      <div className={this.activateButton('first')} onClick={()=>this.showAllTasks('first')}>
      <h3>All Tasks</h3>
      </div>
      <div className={this.activateButton('second')} onClick={()=>this.filterTasks(false,'second')}>
      <h3>Pending Tasks</h3>
      </div>
      <div className={this.activateButton('third')} onClick={()=>this.filterTasks(true,'third')}>
      <h3>Completed Tasks</h3>
      </div>
      </div>
      <ul>
      {filteredProject.tasks.map(i=>{
      return(
      <li><div className='tasks-name'>{i.name}</div>
      <AddArtwork task={i} artWorkAdded={this.artWorkAdded} project={project}/>
      </li>
      )
      })}
      </ul>
      </div>
    }
      </div>
    }
      </div>
      <div className='project-details'>
      <h2> Assigned Leader </h2>
      {project.leader ?
      <div className='leaders-list'>
      {project.leader.map(i=>
      <div className='project-details-rows'>
      <h3>{i.name}</h3>
      </div>
       )
      }
      </div>
      :
      null
      }
      <UsersCatalog leaderAdded={this.leaderAdded}/>
      </div>
      <ProjectSettings project={project} stateChanged={this.stateChanged}/>
      </div>
      :
      <div className='loader'>
      </div>
      }
      </div>
      </div>
      </div>
    )
  }
}
export {ProjectView}
