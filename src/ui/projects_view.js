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
                }
              submit(e){
                e.preventDefault()
                const {projects}=this.props;
                const { _projectName, _employeeName } = this.refs
                const projectName=_projectName.value.toLowerCase()
                const employeeName=_employeeName.value.toLowerCase()
                const newList=projects.filter(c=>{
                  let title=c.title.toLowerCase();
                  let employee=c.leader;
                  return (title.indexOf(projectName)!==-1||employee.indexOf(employeeName))}
                )
                if(newList.length){
                      this.setState({projectsList:newList,noResultMessage:false})
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
                <ul id='search-list'>
                <li>
                    Project
                </li>
                <li class='hide-on-mobiles'>
                    Project Id
                </li>
                <li class='hide-on-mobiles'>
                    Leader
                </li>
                <li class='hide-on-mobiles'>
                    Team
                </li>
                <li class='hide-on-mobiles'>
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
                <div key={project.project_id}>
                <ListSearchedprojects editProject={this.editProject} removeProject={this.props.removeProject} project={project}/>
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
