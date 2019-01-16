import React from 'react'
import propTypes from 'prop-types'
import { app } from '../db/firebase'
import  projectsImage from './projects-image.png'
import  leavesImage from './leaves-image.png'
import { RequestLeave } from '../container/request_leave'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Header} from '../container/header'
import {ViewAll} from './view_all.js'
require("babel-core/register")
require("babel-polyfill")


function n(n){
    return n > 9 ? "" + n: "0" + n;
}

const ProjectsOverviewList=(projects)=>{
        var newProjects=[]
        if(projects){
        if(projects.length>5){
                var i
                for(i=0;i<5;i++){
                        newProjects.push(projects[i])
                }
                return newProjects
        }
        else{
                return projects
        }
      }

       else{
               return projects
       }
}
class UIProjectsOverview extends React.Component{
                constructor(props){
                         super(props)
                         this.state={admin:false,unreadApplications:null}
                }
                componentDidMount(){
                        let self=this
                        app.auth().currentUser.getIdTokenResult()
                          .then((idTokenResult) => {
                             if (idTokenResult.claims.admin) {
                               self.setState({admin:true})
                             } else {
                               self.setState({admin:false})
                             }
                          })
                          .catch((error) => {
                            console.log(error)
                          })
                          const unreadApplications=this.props.applications.filter(i=>i.read===false)
                          this.setState({unreadApplications:unreadApplications.length})
                }
                render(){
                    const {admin} = this.state
                    const { projects, removeProject, currentUser} = this.props
                    const newProjects=ProjectsOverviewList(projects)
                    return (
                          <div>
                          <div className='projects-overview'>
                          <div className='projects-leaves'>
                          {admin?
                          <div className='current-projects'>
                          <div className='overview-image-container'>
                           <img src={leavesImage} alt='leaves'/>
                          </div>
                          {this.state.unreadApplications?
                          <h1> {n(this.state.unreadApplications)} </h1>
                          :
                          <h1> 00 </h1>
                        }
                          <h3> Leave </h3>
                          </div>
                          :
                          <div className='page-header'>
                          <RequestLeave/>
                          </div>
                          }
                          {projects&&
                          <div className='current-projects'>
                          <div className='overview-image-container'>
                           <img src={projectsImage} alt='leaves'/>
                          </div>
                          {projects&&<h1>{n(projects.length)}</h1>}
                          <h3> Projects </h3>
                          </div>
                          }
                          </div>
                          <ListedProjects projects={newProjects} allProjects={projects}/>
                          </div>
                          </div>
                  )
            }
}

const ListedProjects=({projects,allProjects})=>{
             const options={day:'numeric',month:'short',year:'numeric'}
             return(
             <div className='projects-list-container'>
             {projects.length!==0?
             <div className='projects-list-box'>
             <ViewAll projects={allProjects}/>
             <div className='projects-list'>
             <ul className='overview'>
             <li id='project-title'>
                 Project Name
             </li>
             <li className='hide-on-mobiles'>
                 Agency
             </li>
             <li>
                 Client
             </li>
             <li className='hide-on-mobiles'>
                 Created
             </li>
             <li>
                 Status
             </li>
             <li>
                 Invoice
             </li>
             </ul>
             {projects.map(project=>
             <ul key={project.project_id} className='overview'>
             <li id='project-title'><strong>{project.title}</strong></li>
             <li className='hide-on-mobiles'>{project.agency}</li>
             <li>{project.client}</li>
             <li className='hide-on-mobiles'>{new Date(project.date_started).toLocaleDateString("en-US",options)}</li>
             {project.status===0 ?
             <li id='status-bar'>
             <FontAwesomeIcon
             icon="dot-circle"
             color="orange"
             size="sm"
  />{' '} In Progress
             </li>
            :
            <li id='status-bar'>
            <FontAwesomeIcon
            icon="dot-circle"
            color="green"
            size="sm"
 />{' '} Completed
            </li>
            }
            {project.invoice?
              <li id='status-bar'>
              <FontAwesomeIcon
              icon="dot-circle"
              color="green"
              size="sm"
   />{' '} {project.invoice}
              </li>
             :
             <li id='status-bar'>
             <FontAwesomeIcon
             icon="dot-circle"
             color="red"
             size="sm"
  />{' '} Not Ready
             </li>
            }
             </ul>
             )}
             </div>
             </div>
             :
             <div className='projects-list-box'>
             <div className='projects-list-header'>
                  <h3>Projects(DREAM TEAM)</h3>
                  <h3 id='view-all'> View All Projects </h3>
             </div>
             <div className='projects-list'>
             <ul id='search-list'>
             <li className='no-search-result'>
                 You currently have no Projects at your disposal..
             </li>
             </ul>
             </div>
             </div>
             }
             </div>)
}

UIProjectsOverview.propTypes={
             projects:propTypes.array.isRequired
}
ListedProjects.propTypes={
             projects:propTypes.array.isRequired
}

export {UIProjectsOverview}
