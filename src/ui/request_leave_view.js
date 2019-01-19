import React from 'react'
import propTypes from 'prop-types'
import { app,refApplications } from '../db/firebase'
import {LeaveForm} from '../container/leave_form'
import Popup from 'reactjs-popup'
import {v4} from 'uuid'
require("babel-core/register")
require("babel-polyfill")

class RequestLeaveView extends React.Component{
      constructor(props){
                super(props)
                this.state={ loading:false,start:new Date(),end:new Date() }
                this.submit=this.submit.bind(this)
                this.start=this.start.bind(this)
                this.end=this.end.bind(this)
              }
              start(date){
                this.setState({start:date})
              }
              end(date){
                this.setState({end:date})
              }
              submit= async values=>{
                let self=this
                const options={day:'numeric',month:'short',year:'numeric'}
                const { reason , leaveType } = values
                let fromString = this.state.start.toLocaleDateString("en-US",options)
                let toString = this.state.end.toLocaleDateString("en-US",options)
                var currentApplicant=Object.assign({} , app.auth().currentUser)
                const applicant = {name:currentApplicant.displayName,picture:false,uid:currentApplicant.uid}
                const token = this.props.token
                const application={id:v4(),read:false,reason:reason,from:fromString,to:toString,applicant:applicant,type:leaveType,status:0}
                const url = 'api/applications/request'
                const body = JSON.stringify({leaveType:leaveType,from:fromString,to:toString,applicant:applicant,token:token})
                await fetch(url,
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:body
                })
                  .then(res=>{
                            self.setState({loading:false,success:true})
                  })
                  const newApplication=refApplications.child(application.id)
                  newApplication.set(application)
              }
              render(){
                    return(
                      <div>
                    {this.state.loading&&
                      <div className='loader'/>
                    }
                    <Popup trigger={
                     <button className='new-project-button buttons' onClick={this.openFormModal}>+ Request Leave</button>
                    } modal closeOnDocumentClick>
                    {close => (
                    <div className='form-backdrop'>
                    <div className='form-container'>
                    <div className='form-header'>
                     <h2> Send A Leave Request</h2>
                              <div className='cross' onClick={close}>✖</div>
                    </div>
                    <LeaveForm onSubmit={this.submit} start={this.start} end={this.end}/>
                    </div>
                    </div>
                  )
                    }
                    </Popup>
                     </div>
                  )
            }
  }

export {RequestLeaveView}
