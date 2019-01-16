import React from 'react'
import propTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'




class ViewAll extends React.Component{
          constructor(props){
            super(props)
            this.state={ openForm:false }
            this.openFormModal=this.openFormModal.bind(this)
            this.closeForm=this.closeForm.bind(this)
          }
          closeForm(event) {
           const { container,cross }=this.refs
           if (!container.contains(event.target)||cross.contains(event.target)) {
                    this.setState({ openForm: false }, () => {
                     document.removeEventListener('click', this.closeForm)
                    })
           }
          }
          openFormModal(){
            this.setState({ openForm:true}, () => {
             document.addEventListener('click', this.closeForm)
            })
          }
          componentWillUnmount(){
                 document.removeEventListener('click', this.closeForm)
          }
          render(){
            const{openForm}=this.state
            const {projects}=this.props
            return(
                    <div>
                    {!openForm&&
                      <div className='projects-list-header'>
                           <h3>Projects(DREAM TEAM)</h3>
                           <h3 id='view-all' onClick={this.openFormModal}> View All Projects </h3>
                      </div>
                   }{openForm&&
                    <div className='form-backdrop'>
                    <div className='form-container' ref='container'>
                    <div className='form-header'>
                     <h2>All Projects</h2>
                    <div className='cross' ref='cross'>✖</div>
                    </div>
                    {projects.length!==0&&
                    <div className='projects-list-box'>
                    <div className='projects-list'>
                    <ul className='overview'>
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
                    <li>
                        Invoice
                    </li>
                    </ul>
                    {projects.map(project=>
                    <ul key={project.project_id} className='overview'>
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
                  }
                   </div>
                   </div>
                 }
                   </div>
                  )
          }
}

export {ViewAll}
