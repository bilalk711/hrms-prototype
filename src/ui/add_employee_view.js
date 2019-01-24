import React from 'react'
import {v4} from 'uuid'
import {EmployeeForm} from '../container/employee_form'
import propTypes from 'prop-types'
import Popup from 'reactjs-popup'

class UIAddNewemployee extends React.Component{
      constructor(props){
        super(props)
        this.state={ failedAttempt:false,success:false }
        this.submit=this.submit.bind(this)
      }
      async submit(values){
        const {name,email,password,id} = values
        this.setState({loading:true})
        const url='/admin/worker'
        const body=JSON.stringify({email:email,password:password,name:name,employee_id:id,})
        let self=this
              await fetch(
                            url,
                            {
                            method:'POST',
                            body:body,
                            headers:{'Content-Type':'application/json'}
                            }
                          )
                          .then(response=>response.json())
                          .then(res=>{
                               if(!res.success){
                                 self.setState({loading:false,success:false,failedAttempt:true})
                               }
                               else{
                                   self.props.addEmployee(email,name,res.user.uid,id,'')
                                 self.setState({loading:false,success:true})
                               }
                             }
                          )
                          .catch(error=>console.log(error))
      }
      render(){
        return(
          <div>
        <Popup trigger={
         <button className='new-project-button buttons'>+ Add Employee</button>
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
                      height: "100%",
                      width: "100%",
                      background:"transparent"
                      }}
                      >
        {close => (
        <div className='form-container'>
        <div className='form-header'>
         <h2> Add a New Employee</h2>
         <div className='cross' onClick={close}>✖</div>
        </div>
        {!this.state.failedAttempt&&!this.state.success&&
        <div>
        {!this.state.loading?
        <EmployeeForm onSubmit={this.submit}/>
        :
        <div className='loader'/>
        }
        </div>
      }
        {this.state.failedAttempt&&!this.state.success&&
        <div className='error prompt-message'>
         <h3>Sorry Something went wrong, Couldn't Add Employee..</h3>
         </div>
       }
       {!this.state.failedAttempt&&this.state.success&&
         <div className='prompt-message'>
         <h3>Employee Added Successfuly!</h3>
         <button className='buttons' onClick={()=>this.setState({loading:false,failedAttempt:false,success:false})}> Add Another </button>
         </div>
        }
        </div>
          )
        }
         </Popup>
         </div>
      )
      }
}

UIAddNewemployee.propTypes={
        addEmployee:propTypes.func.isRequired
}

export {UIAddNewemployee}
