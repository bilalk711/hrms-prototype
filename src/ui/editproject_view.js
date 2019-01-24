import React from 'react'
import {EditForm} from '../container/edit_form'
import propTypes from 'prop-types'

class UIEditProject extends React.Component{
      constructor(props){
        super(props)
        this.state={openForm:false}
        this.openFormModal=this.openFormModal.bind(this)
        this.submit=this.submit.bind(this)
      }
      openFormModal(){
        this.setState({openForm:true})
      }
      submit(values){
        const {title,deadline,leader,client,agency}=values
        this.props.editProject(title,deadline,leader,client,agency,this.props.project_id)
        this.setState({openForm:false})
      }
      render(){
        const{openForm}=this.state
        return(
          <div>
        {!openForm&&
         <li onClick={this.openFormModal}>Edit Project</li>
        }
        {openForm&&
        <div className='form-backdrop'>
        <div className='form-container'>
        <div className='form-header'>
         <h2> Edit Project </h2>
        </div>
        <EditForm onSubmit={this.submit}/>
        </div>
        </div>
        }
         </div>
      )
      }
}
export default UIEditProject
