import React from 'react'
import { refApplications } from '../db/firebase'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'


class LeavesList extends React.Component{
            constructor(props){
              super(props)
              this.state={showMenu:false,showStatus:false,application:null,admin:false}
              this.showStatus = this.showStatus.bind(this)
              this.closeStatus = this.closeStatus.bind(this)
              this.changeStatus = this.changeStatus.bind(this)
              this.showMenu = this.showMenu.bind(this)
              this.closeMenu = this.closeMenu.bind(this)
            }
            componentWillMount(){
              this.setState({application:this.props.application})
            }
            showMenu(event) {
              event.preventDefault()
              this.setState({ showMenu: true }, () => {
               document.addEventListener('click', this.closeMenu)
              })
            }
            closeMenu(e) {
              const { dropdownMenu }= this.refs
              if (!dropdownMenu.contains(event.target)) {
                       this.setState({ showMenu: false }, () => {
                        document.removeEventListener('click', this.closeStatus)
                       })
              }
            }
            showStatus(e){
              e.preventDefault()
              this.setState({ showStatus: true }, () => {
               document.addEventListener('click', this.closeStatus)
              })
            }
            closeStatus(e){
              const { statusMenu }= this.refs
              if (!statusMenu.contains(event.target)) {
                       this.setState({ showStatus: false }, () => {
                        document.removeEventListener('click', this.closeStatus)
                       })
              }
            }
            changeStatus(state){
              this.setState({application:{...this.state.application,status:state}})
              refApplications.child(this.state.application.applicant.uid).set({...this.state.application,status:state})
            }
            componentWillUnmount(){
                 document.removeEventListener('click', this.closeStatus, false)
                 document.removeEventListener('click', this.closeStatus, false)
            }
            render()
            {
            const {application} = this.state
            return (
            <div>
            <ul key={application.applicant.uid} className='applications-list'>
            <li>
                {application.applicant.name}
            </li>
            {application.type==='casual'&&
            <li>
             Casual Leave
            </li>
          }
            {application.type==='important'&&
            <li>
             Important Leave
            </li>
            }
            {application.type==='serious'&&
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
              {Math.round((new Date(application.to).getTime()-new Date(application.from).getTime())/86400000)}
            </li>
            <li>
             {application.reason}
            </li>
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
            <div ref='statusMenu'>
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
            </li>
            <li onClick={this.showMenu} ref='dropdownMenu' className='actions-button'>
            <FontAwesomeIcon
                      icon="th"
                      color="black"
             size="sm"/>
               {this.state.showMenu ?
                <ul className='actions-list'>
                    <li onClick={()=>this.props.leaveDeleted(application.applicant.uid)}>Delete Application</li>
                </ul>
                : null
              }
            </li>
            </ul>
            </div>
          )
          }
}

export {LeavesList}
