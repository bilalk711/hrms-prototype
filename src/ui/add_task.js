import React from 'react'
import propTypes from 'prop-types'
import Popup from 'reactjs-popup'
import {TaskForm} from '../container/task_form'
import {v4} from 'uuid'


class AddTask extends React.Component{
      constructor(props){
        super(props)
        this.state={ success:false }
        this.submit=this.submit.bind(this)
      }
      submit(values){
        const {project}=this.props
        var oldTasks=[]
        if(project.tasks){
            oldTasks=[...project.tasks]
        }
        oldTasks.push({...values,id:v4(),completed:false})
        this.props.newTaskAdded({...project,tasks:oldTasks})
        this.setState({openForm:false})
      }
      render(){
        const{openForm}=this.state
        return(
          <div style={{float: "right"}}>
        <Popup trigger={
          <div style={{textAlign: "center"}}>
         <button className="new-project-button task-open" style={{margin: "2%"}}>+</button>
          </div>
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
                       width: "100%"
                       }}
                       >
        {close=>(
        <div className='form-container'>
        <div className='form-header'>
         <h2> Add a New Task </h2>
              <div className='cross' onClick={close}>✖</div>
        </div>
        <TaskForm onSubmit={this.submit}/>
        </div>
      )
        }
        </Popup>
         </div>
      )
      }
}

export {AddTask}
