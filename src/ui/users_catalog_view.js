import React from 'react'
import Popup from 'reactjs-popup'




class UsersCatalogView extends React.Component{
      constructor(props){
            super(props)
            this.state={selected:[],error:null,project:this.props.project,leaders:[],employeesList:[], noResultMessage:false}
            this.selected = this.selected.bind(this)
            this.activateButton = this.activateButton.bind(this)
            this.addLeader = this.addLeader.bind(this)
            this.submit = this.submit.bind(this)
      }
      selected(id){
            var selected=[...this.state.selected,id]
            this.setState({selected:selected})
      }
      submit(e){
        e.preventDefault()
        const {users}=this.props
        const { _employeeName } = this.refs
        const employeeName=_employeeName.value.toLowerCase()
        const newList=users.filter(c=>{
          let name=c.name.toLowerCase()
          let id=c.employee_id.toLowerCase()
          return (name.indexOf(employeeName)!==-1||id.indexOf(employeeName)!==-1)}
        )
        if(newList.length){
              this.setState({employeesList:newList,noResultMessage:false})
        }
        else{
              this.setState({noResultMessage:true,employeesList:[]})
        }
      }
      addLeader(leader){
           this.selected(leader.id)
           var leaders=this.state.leaders
           console.log(leaders)
           var notAlreadyContains=leaders.filter(i=>i.id==leader.id)
           if(notAlreadyContains.length===0){
           leaders.push(leader)
           this.setState({leaders:leaders})
           this.props.leaderAdded(this.state.leaders)
         }
      }
      activateButton(name){
           var selected = this.state.selected.filter(i=>i==name)
           return (selected.length!==0) ? 'active-employees employees-select-list' : 'employees-select-list'
      }
      render(){
        return (
              <div>
              <Popup trigger={
              <button className='buttons'>
                  + Add
              </button>
              } modal closeOnDocumentClick>
              {close => (
               <div className='form-backdrop'>
               <div className='form-container'>
               <div className='form-header'>
                <h2> Add A Leader</h2>
                         <div className='cross' onClick={close}>✖</div>
               </div>
               <div className='forms' style={{padding:'10px'}}>
               <form className='forms search-form' onSubmit={this.submit}>
               <input type='text' placeholder='Employee ID' ref='_projectName' class='form-controls'/>
               <input type='text' placeholder='Employee Name' ref='_employeeName' class='form-controls'/>
               <input type='submit' value='SEARCH' class='form-controls'/>
               </form>
               <div className='employees-list employee-selection'>
              {this.state.noResultMessage&&
               <div className='projects-list'>
               <ul id='search-list'>
               <li className='no-search-result'>
                   No results match your criteria
               </li>
               </ul>
               </div>
             }
               {this.state.employeesList&&this.state.employeesList.length!==0&&
                 this.state.employeesList.map(employee=>

                   <div key={employee.id} className='employees-selection-list'>
                      <div className='user-pic employee-list'>
                           {employee.picture.length!==0?
                           <img src={employee.picture} alt='employee'/>
                           :
                           <div className='name-prefix'>
                           {employee.name[0]}
                           </div>
                           }
                      </div>
                      <div className='employee-email'>
                            {employee.email}
                      </div>
                      <div className='employee-name'>
                            {employee.name}
                      </div>
                      <div className={this.activateButton(employee.id)} onClick={()=>this.addLeader(employee)}>
                      </div>
                   </div>)
              }
              </div>
               </div>
               </div>
               </div>
             )
              }
              </Popup>
              </div>
            )
      }
}

export {UsersCatalogView}
