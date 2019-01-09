import React from 'react'
import propTypes from 'prop-types'
import { app } from '../db/firebase'
import {LeaveForm} from '../container/leave_form'
require("babel-core/register")
require("babel-polyfill")

class RequestLeaveView extends React.Component{
      constructor(props){
                super(props)
                this.state={ openForm:false,loading:false }
                this.openFormModal=this.openFormModal.bind(this)
                this.closeForm=this.closeForm.bind(this)
                this.submit=this.submit.bind(this)
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
                this.setState({ openForm:true }, () => {
                 document.addEventListener('click', this.closeForm)
                })
              }
              submit= async values=>{
                let self=this
                const options={day:'numeric',month:'short',year:'numeric'}
                const { leaveType,from,to } = values
                let fromString = new Date(from).toLocaleDateString("en-US",options)
                let toString = new Date(to).toLocaleDateString("en-US",options)
                const applicant = app.auth().currentUser.displayName
                const token = this.props.token
                console.log(token)
                const url = 'api/applications/request'
                const body = JSON.stringify({leaveType:leaveType,from:fromString,to:toString,applicant:applicant,token:token})
                await fetch(url,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:body
                })
                  .then(res=>{
                        if(res.success){
                            self.setState({loading:false,success:true})
                        }
                        else{
                            self.setState({loading:false,success:false})
                        }
                  })
              }
              componentWillUnmount(){
                     document.removeEventListener('click', this.closeForm)
              }
              render(){
              const{openForm}=this.state
                    return(
                      <div>
                    {this.state.loading&&
                      <div className='loader'/>
                    }
                    {!openForm&&
                     <button className='new-project-button buttons' onClick={this.openFormModal}>+ Request Leave</button>
                    }
                    {openForm&&
                    <div className='form-backdrop'>
                    <div className='form-container' ref='container'>
                    <div className='form-header'>
                     <h2> Send A Leave Request</h2>
                              <div className='cross' ref='cross'>✖</div>
                    </div>
                    <LeaveForm onSubmit={this.submit}/>
                    </div>
                    </div>
                    }
                     </div>
                  )
            }
  }

export {RequestLeaveView}
