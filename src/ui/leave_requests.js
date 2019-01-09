import React from 'react'
import propTypes from 'prop-types'
import {Navigation} from './navigation_view'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import {Header} from '../container/header'


class LeaveRequests extends React.Component{
          constructor(props){
                   super(props)
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
            <form className='forms search-form'>
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
            <DayPickerInput
            />
            <DayPickerInput
            />
            <input type='submit' value='SEARCH' class='form-controls'/>
            </form>
            </div>
            </div>
            </div>
            </div>
          )
            }
}

export {LeaveRequests}
