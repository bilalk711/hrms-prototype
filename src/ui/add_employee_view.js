import React from 'react'
import {v4} from 'uuid'
import {EmployeeForm} from '../container/employee_form'
import propTypes from 'prop-types'


class UIAddNewemployee extends React.Component{
      constructor(props){
        super(props)
        this.state={ openForm:false,failedAttempt:false,success:false,closeForm:false }
        this.openFormModal=this.openFormModal.bind(this)
        this.closeForm=this.closeForm.bind(this)
        this.submit=this.submit.bind(this)
      }
      closeForm(event) {
       const { container,cross }=this.refs
       if (!container.contains(event.target)||cross.contains(event.target)) {
                this.setState({ openForm: false }, () => {
                 document.removeEventListener('click', this.closeForm,false)
                })
       }
     }
      openFormModal(event){
        event.preventDefault()
        this.setState({ openForm:true,failedAttempt:false,success:false,closeForm:false }, () => {
         document.addEventListener('click', this.closeForm)
        })
      }
      componentWillUnmount(){
              document.removeEventListener('click', this.closeForm,false)
      }
      async submit(values){
        const {name,email,password,id} = values
        this.setState({loading:true})
        const url='/admin/worker'
        const body=JSON.stringify({email:email,password:password,name:name})
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
                                   self.props.addEmployee(email,name,res.user.uid,'')
                                 self.setState({loading:false,success:true})
                               }
                             }
                          )
                          .catch(error=>console.log(error))
      }
      render(){
        const{openForm}=this.state
        return(
          <div>
        {!openForm&&
         <button className='new-project-button buttons' onClick={this.openFormModal}>+ Add Employee</button>
        }
        {openForm&&
        <div className='form-backdrop'>
        <div className='form-container' ref='container'>
        <div className='form-header'>
         <h2> Add a New Employee</h2>
         <div className='cross' ref='cross'>✖</div>
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
         <h3>Employee Added Successfuly!!</h3>
         </div>
        }
        </div>
        </div>
        }
         </div>
      )
      }
}

UIAddNewemployee.propTypes={
        addEmployee:propTypes.func.isRequired
}

export {UIAddNewemployee}
