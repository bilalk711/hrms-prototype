import React from 'react'
import { app , refApplications } from '../db/firebase'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


class LeavesList extends React.Component{
            constructor(props){
              super(props)
              this.state={showStatus:false,project:null}
              this.remove = this.remove.bind(this)
              this.showStatus = this.showStatus.bind(this)
              this.closeStatus = this.closeStatus.bind(this)
            }
            showStatus(e){
              e.preventDefault()
              this.setState({ showStatus: true }, () => {
               document.addEventListener('click', this.closeStatus)
              })
            }
            closeStatus(e){
              const { statusMenu }=this.refs
              if (!statusMenu.contains(event.target)) {
                       this.setState({ showStatus: false }, () => {
                        document.removeEventListener('click', this.closeStatus)
                       })
              }
            }
            changeStatus(state){
              this.setState({application:{...this.state.application,status:state}})
              console.log(state)
              console.log({...this.state.application,status:state})
              if(!this.state.admin){
               applicationsRef.child(app.auth().currentUser.uid).set({...this.state.application,status:state})
            }
              else{
              applicationsRef.child(this.state.application.applicant.uid).set({...this.state.application,status:state})
              }
            }
            <div>
            <ul key={application.id} className='applications-list'>
            <li>
                {application.applicant.name}
            </li>
            {application.leaveType==='casual'&&
            <li>
             Casual Leave
            </li>
            {application.leaveType==='important'&&
            <li>
             Important Leave
            </li>
            }
            {application.leaveType==='serious'&&
            <li>
             Serious Leave
            </li>
            }
            <li>
             {application.from}
            </li>
            <li>
             {application.to}
            </li>
            <li>
              No. Of Days
            </li>
            <li>
             {application.reason}
            </li>
            <li>
            <li id='status-bar' onClick={this.showStatus} ref='statusMenu' className='actions-button'>
            {application.status===0&&
                      <span>
                      <FontAwesomeIcon
                      icon="circle"
                      color="#ffb507"
                      size="sm"
            />{' '} Pending  </span>
          }
            {application.status===1&&
            <span>
            <FontAwesomeIcon
            icon="circle"
            color="#6DB65B"
            size="sm"
   />{' '} Approved
           </span>
            }
            {application.status===2&&
                     <span>
                     <FontAwesomeIcon
                     icon="circle"
                     color="red"
                     size="sm"
            />{' '} Canceled
                    </span>
            }
            <div>
            {this.state.showStatus?
                    <ul className='actions-list'>
                        <li onClick={()=>this.changeStatus(0)}>Pending</li>
                        <li onClick={()=>this.changeStatus(1)}>Approve</li>
                        <li onClick={()=>this.changeStatus(2)}>Cancel</li>
                    </ul>
                    :
                    null
            }
            </div>
            </li>}
            </li>
            <li>
                Actions
            </li>
            </ul>
}
