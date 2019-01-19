import React from 'react'
import {Navigation} from './navigation_view'
import {Header} from '../container/header'
import {ListSearchedemployees} from './list_employees'
import {AddNewemployee} from '../container/add_employee'

class EmployeesView extends React.Component{
                constructor(props) {
                     super(props)
                     this.submit = this.submit.bind(this)
                     this.state = { employeesList:[], page:null, noResultMessage:false}
                  }
                submit(e){
                  e.preventDefault()
                  const {users,currentUser}=this.props
                  const employees=users
                  const { _employeeID, _employeeName } = this.refs
                  const employeeID=_employeeID.value.toLowerCase()
                  const employeeName=_employeeName.value.toLowerCase()
                  const newList=employees.filter(c=>{
                    let name=c.name.toLowerCase()
                    let id=c.employee_id.toLowerCase()
                    return (name.indexOf(employeeName)!==-1||id.indexOf(employeeID)!==-1)
                    }
                  )
                  if(newList.length){
                        this.setState({employeesList:newList,noResultMessage:false})
                  }
                  else{
                        this.setState({noResultMessage:true,employeesList:[]})
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
                      <h3>Employee</h3>
                      <AddNewemployee/>
                      </div>
                      <form className='forms search-form' onSubmit={this.submit}>
                      <input type='text' placeholder='Employee ID' ref='_employeeID' class='form-controls'/>
                      <input type='text' placeholder='Employee Name' ref='_employeeName' class='form-controls'/>
                      <input type='submit' value='SEARCH' class='form-controls'/>
                      </form>
                      {
                      this.state.noResultMessage&&
                      <div className='projects-list'>
                      <ul id='search-list'>
                      <h3>
                          Sorry, no results found!
                      </h3>
                      </ul>
                      </div>
                    }
                      {this.state.employeesList.length!==0&&
                      <div className='employees-list'>
                      {
                      this.state.employeesList&&
                      this.state.employeesList.map(employee=>
                      <div key={employee.id} className='employee-container'>
                      <ListSearchedemployees employee={employee} deleteUser={this.props.removeUser} editUser={this.props.editUser}/>
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

export {EmployeesView}
