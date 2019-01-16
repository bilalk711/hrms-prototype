import React from 'react'
import propTypes from 'prop-types'
import {Navigation} from './navigation_view'
import {AddNewproject} from '../container/add_project'
import {ListSearchedprojects} from './list_search'
import {Header} from '../container/header'



class UIprojects extends React.Component{
              constructor(props) {
                   super(props)
                   this.submit = this.submit.bind(this)
                   this.state = { projectsList:[], noResultMessage:false}
                   this.projectDeleted = this.projectDeleted.bind(this)
                   this.projectChanged = this.projectChanged.bind(this)
                }
              projectChanged(project){
                   const { createdBy,title,deadline,client,agency,description,id,leader,status,invoiced,invoice,tasks,brief,project_id,priority } = project
                   this.props.editProject(createdBy,title,deadline,client,agency,description,id,leader,status,invoiced,invoice,tasks,brief,project_id,priority)
              }
              projectDeleted(id){
                   const newProjectsList = this.state.projectsList.filter(i=>i.id!==id)
                   this.setState({projectsList:newProjectsList})
                   this.props.removeProject(id)
              }
              componentDidMount(){
                   const { totalEntries } = this.refs
                   var limitedProjects=[]
                   var i
                   if(totalEntries.value<=this.props.projects.length&&totalEntries.value<20){
                   for (i=0;i<totalEntries.value;i++){
                       limitedProjects.push(this.props.projects[i])
                   }
                   console.log(limitedProjects)
                   this.setState({projectsList:limitedProjects})
                 }
                   else{
                       this.setState({projectsList:this.props.projects})
                   }
              }
              submit(e){
                e.preventDefault()
                const {projects}=this.props;
                const { _projectName, _employeeName, totalEntries } = this.refs
                const projectName=_projectName.value.toLowerCase()
                const employeeName=_employeeName.value.toLowerCase()
                const newList=projects.filter(c=>{
                  let title=c.title.toLowerCase()
                  if(c.leader){
                  var [employeeN]=c.leader.filter(l=>{
                      let employee=l.name.toLowerCase()
                      return (employee.indexOf(employeeName)!==-1)
                    }
                    )
                    return (title.indexOf(projectName)!==-1||employeeN!==undefined)
                  }
                  return (title.indexOf(projectName)!==-1)
                })
                if(newList.length){
                      var limitedProjects=[]
                      var i
                      if(totalEntries.value<=newList.length&&totalEntries.value<=20){
                      for (i=0;i<totalEntries.value;i++){
                          limitedProjects.push(newList[i])
                      }
                      var highPriority=limitedProjects.filter(i=>i.priority===1)
                      var lowPriority=limitedProjects.filter(i=>i.priority===0)
                      this.setState({projectsList:[...highPriority,...lowPriority],noResultMessage:false})
                    }
                      else{
                      var highPriority=newList.filter(i=>i.priority===1)
                      var lowPriority=newList.filter(i=>i.priority===0)
                          this.setState({projectsList:[...highPriority,...lowPriority],noResultMessage:false})
                }
              }
                else{
                      this.setState({noResultMessage:true,projectsList:[]})
                }
              }
              render(){
                return(
                <div className='JSX-container'>
                <Header/>
                <div className='page'>
                <Navigation/>
                <div className='page-content'>
                <div className='page-header-group'>
                <div className='page-header'>
                <h3>Projects</h3>
                <AddNewproject/>
                </div>
                <form className='forms search-form' onSubmit={this.submit}>
                <input type='text' placeholder='Project Name' ref='_projectName' class='form-controls'/>
                <input type='text' placeholder='Employee Name' ref='_employeeName' class='form-controls'/>
                <input type='submit' value='SEARCH' class='form-controls'/>
                <label for='entries' className='entries-input-box'> Show
                <input type='number' defaultValue={10} min="0" max="20" ref='totalEntries'/>
                entries
                </label>
                </form>
                {
                this.state.noResultMessage&&
                <div className='projects-list'>
                <ul id='search-list'>
                <li className='no-search-result'>
                    No results match your criteria
                </li>
                </ul>
                </div>
              }
                {this.state.projectsList.length!==0&&
                <div className='projects-list'>
                <ul className='search-list'>
                <li>
                    Project
                </li>
                <li>
                    Project Id
                </li>
                <li class='hide-on-mobiles'>
                    Leader
                </li>
                <li class='hide-on-mobiles'>
                    Team
                </li>
                <li>
                    Deadline
                </li>
                <li class='hide-on-mobiles'>
                    Priority
                </li>
                <li>
                    Status
                </li>
                <li>
                    Actions
                </li>
                </ul>

                {
                this.state.projectsList&&
                this.state.projectsList.map(project=>
                <div key={project.project_id} className='full-projects-list'>
                <ListSearchedprojects isAdmin={this.isAdmin} projectChanged={this.projectChanged} removeProject={this.projectDeleted} project={project}/>
                </div>
              )
                }
                </div>
              }
                </div>
                </div>
                </div>
                </div>
              )
              }
}

UIprojects.propTypes={
        projects:propTypes.array.isRequired
}

export {UIprojects}
