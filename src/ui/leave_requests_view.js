import React from 'react'
import propTypes from 'prop-types'
import { app , refApplications } from '../db/firebase'
import {Navigation} from './navigation_view'
import { LeavesList } from './list_search_applications'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import {Header} from '../container/header'
import { AgGridReact } from "ag-grid-react"
import "ag-grid-enterprise"

class LeaveRequestsView extends React.Component{
          constructor(props){
                   super(props)
                   this.state={applicationsList:[], noResultMessage:false,start:null,end:null}
                   this.submit=this.submit.bind(this)
                   this.leaveChanged=this.leaveChanged.bind(this)
                   this.leaveDeleted=this.leaveDeleted.bind(this)
                   this.start=this.start.bind(this)
                   this.end=this.end.bind(this)
          }
          start(date){
                   this.setState({start:date})
          }
          end(date){
                   this.setState({end:date})
          }
          componentDidMount(){
                    this.setState({applicationsList:this.props.applications})
                    this.state.applicationsList.map(i=>{
                        var applicationRead = {...i,read:true}
                        refApplications.child(i.applicant.uid).set(applicationRead)
                    })
          }
          leaveChanged(leave){
               this.setState({applicationsList:[...this.state.applicationsList,leave]})
               let applicationsDB=Object.assign({},this.state.applicationsList)
               refApplications.set(applicationsDB)
          }
          leaveDeleted(id){
               const newApplicationState=this.state.applicationsList.filter(i=>i.applicant.uid!==id)
               this.setState({applicationsList:newApplicationState})
               refApplications.child(id).remove()
          }
          submit(e){
            e.preventDefault()
            const { applications }=this.props;
            const { _employeeName } = this.refs
            const employeeName=_employeeName.value.toLowerCase()
            const newList=applications.filter(c=>{
              let employee=c.applicant.name.toLowerCase()
              return (employee.indexOf(employeeName)!==-1)}
            )
            if(newList.length){
                  this.setState({applicationsList:newList,noResultMessage:false})
            }
            else{
                  this.setState({noResultMessage:true,applicationsList:[]})
            }
          }
          render(){
            return(
            <div className='JSX-container'>
            <Header/>
            <div className='page'>
            <Navigation/>
            <div className='page-content'>
            <div className='page-header-group'>
            <div className='page-header'>
            <h3>Leave Requests</h3>
            <button className='new-project-button buttons'>+ Add Leave</button>
            </div>
            <form className='forms search-form' onSubmit={this.submit}>
            <input type='text' placeholder='Employee Name' ref='_employeeName' class='form-controls'/>
            <div className='customized-select-container form-controls'>
            Leave Type
            <select className='customized-select-container'>
            <option value='casual'>Casual</option>
            <option value='casual'>Serious</option>
            <option value='casual'>Important</option>
            </select>
            </div>
            <div className='customized-select-container form-controls'>
            Leave Status
            <select className='customized-select-container'>
            <option value='approved'>Approved</option>
            <option value='pending'>Pending</option>
            <option value='canceled'>Canceled</option>
            </select>
            </div>
            <DayPickerInput onDayChange={this.start}
            />
            <DayPickerInput onDayChange={this.end}
            />
            <input type='submit' value='SEARCH' class='form-controls'/>
            </form>
            {
            this.state.noResultMessage&&
            <div className='projects-list'>
            <ul className='no-search'>
            <li className='no-search-result'>
                No results match your criteria
            </li>
            </ul>
            </div>
          }
              {this.state.applicationsList.length!==0&&
              <div className='projects-list'>
              <ul className='applications-list'>
              <li>
                  Employee
              </li>
              <li>
                  Leave Type
              </li>
              <li class='hide-on-mobiles'>
                  From
              </li>
              <li class='hide-on-mobiles'>
                  To
              </li>
              <li>
                  No of Days
              </li>
              <li>
                  Reason
              </li>
              <li>
                  Status
              </li>
              <li>
                  Actions
              </li>
              </ul>

              {
              this.state.applicationsList&&
              this.state.applicationsList.map(i=>
              <div key={i.applicant.uid} className='full-projects-list'>
              <LeavesList leaveDeleted={this.leaveDeleted} application={i}/>
              </div>
              )
              }
              </div>
            }
            </div>
            </div>
            </div>
            </div>
          )
            }
}

export {LeaveRequestsView}
