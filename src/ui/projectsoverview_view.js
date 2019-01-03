import React from 'react'
import propTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Header} from '../container/header'


function n(n){
    return n > 9 ? "" + n: "0" + n;
}

export const UIProjectsOverview=({projects,removeProject,currentUser})=>{
                return (
                  <div>
                  <div className='projects-overview'>
                  <div className='projects-leaves'>
                  {projects&&
                  <div className='current-projects'>
                  {projects&&<h1>{n(projects.length)}</h1>}
                  <h3> Projects </h3>
                  </div>
                  }
                  <div className='current-projects'>
                  <h1> 5 </h1>
                  <h3> Leave </h3>
                  </div>
                  </div>
                  <ListedProjects projects={projects}/>
                  </div>


                  </div>
              )
}

const ListedProjects=({projects})=>{
             return(
             <div className='projects-list-container'>
             {projects.length!==0?
             <div className='projects-list-box'>
             <div className='projects-list-header'>
                  <h3>Projects(DREAM TEAM)</h3>
                  <h3 id='view-all'> View All Projects </h3>
             </div>
             <div className='projects-list'>
             <ul id='search-list'>
             <li id='project-title'>
                 Project Name
             </li>
             <li className='hide-on-mobiles'>
                 Agency
             </li>
             <li className='hide-on-mobiles'>
                 Client
             </li>
             <li className='hide-on-mobiles'>
                 Created
             </li>
             <li>
                 Status
             </li>
             </ul>
             {projects.map(project=>
             <ul key={project.project_id}>
             <li id='project-title'><strong>{project.title}</strong></li>
             <li className='hide-on-mobiles'>{project.agency}</li>
             <li className='hide-on-mobiles'>{project.client}</li>
             <li className='hide-on-mobiles'>{project.date_started}</li>
             {project.status===0 ?
             <li id='status-bar'>
             <FontAwesomeIcon
             icon="circle"
             color="#6DB65B"
             size="sm"
  />{' '} In Progress
             </li>
            :
            <li id='status-bar'>
            <FontAwesomeIcon
            icon="circle"
            color="#6DB65B"
            size="sm"
 />{' '} Completed
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
