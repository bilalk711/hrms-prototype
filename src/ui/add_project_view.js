import React from 'react'
import {ProjectForm} from '../container/project_form'
import propTypes from 'prop-types'
import dreamteam from '../../images/dreamteam.png'
import {addProjecttoDb} from '../db/firebase'

class UIAddNewproject extends React.Component{
      constructor(props){
        super(props)
        this.state={ openForm:false,deadline:false,failedAttempt:false,success:false,closeForm:false }
        this.openFormModal=this.openFormModal.bind(this)
        this.closeForm=this.closeForm.bind(this)
        this.deadline = this.deadline.bind(this)
        this.submit=this.submit.bind(this)
      }
      deadline(date){
        this.setState({deadline:date})
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
        this.setState({ openForm:true,failedAttempt:false,success:false,closeForm:false }, () => {
         document.addEventListener('click', this.closeForm)
        })
      }
      submit(values){
        const {title,client,agency,description,id}=values
        this.props.addProject(this.props.currentUser,title,this.state.deadline,client,agency,description,id)
        this.setState({openForm:false},document.removeEventListener('click', this.closeForm))
      }
      componentWillUnmount(){
             document.removeEventListener('click', this.closeForm)
      }
      render(){
        const{openForm}=this.state
        return(
          <div>
        {!openForm&&
         <button className='new-project-button buttons' onClick={this.openFormModal}>+ Create Project</button>
        }
        {openForm&&
        <div className='form-backdrop'>
        <div className='form-container' ref='container'>
        <div className='form-header'>
         <h2> Add a New Project</h2>
                  <div className='cross' ref='cross'>✖</div>
        </div>
        <ProjectForm onSubmit={this.submit} deadline={this.deadline}/>
        </div>
        </div>
        }
         </div>
      )
      }
}

UIAddNewproject.propTypes={
        addProject:propTypes.func.isRequired
}

export default UIAddNewproject
