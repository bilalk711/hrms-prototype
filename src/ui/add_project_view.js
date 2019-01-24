import React from 'react'
import {ProjectForm} from '../container/project_form'
import propTypes from 'prop-types'
import dreamteam from '../../images/dreamteam.png'
import {addProjecttoDb} from '../db/firebase'
import Popup from 'reactjs-popup'

class UIAddNewproject extends React.Component{
      constructor(props){
        super(props)
        this.state={ openForm:false,deadline:false,failedAttempt:false,success:false,closeForm:false }
        this.deadline = this.deadline.bind(this)
        this.submit=this.submit.bind(this)
      }
      deadline(date){
        this.setState({deadline:date})
      }
      submit(values){
        const {title,client,agency,description,id}=values
        this.props.addProject(this.props.currentUser,title,this.state.deadline,client,agency,description,id)
        this.setState({openForm:false},document.removeEventListener('click', this.closeForm))
      }
      render(){
        return(
          <div>
        <Popup trigger={
         <button className='new-project-button buttons'>+ Create Project</button>
       } modal closeOnDocumentClick
       overlayStyle={{position: "absolute",
                      top: "0px",
                      bottom: "0px",
                      left: "0px",
                      right: "0px",
                      background: "rgba(53, 52, 52, 0.66)",
                      display: "block",
                      width: "100%",
                      zIndex: "999",
                      overflow: "auto"
                    }}
        contentStyle={{
                      margin: "0px",
                      border: "none",
                      padding: "0px",
                      width: "100%",
                      background:"transparent"
                      }}
                      >
        {close => (
        <div className='form-container' ref='container'>
        <div className='form-header'>
         <h2> Add a New Project</h2>
                  <div className='cross' ref='cross' onClick={close}>✖</div>
        </div>
        <ProjectForm onSubmit={this.submit} deadline={this.deadline}/>
        </div>
        )
        }
        </Popup>
         </div>
       )
       }
}

UIAddNewproject.propTypes={
        addProject:propTypes.func.isRequired
}

export default UIAddNewproject
