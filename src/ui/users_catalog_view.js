import React from 'react'





class UsersCatalogView extends React.Component{
      constructor(props){
            super(props)
            this.state={selected:null,error:null,showCatalog:false,project:this.props.project,leaders:[],employeesList:[], noResultMessage:false}
            this.showCatalog = this.showCatalog.bind(this)
            this.closeCatalog = this.closeCatalog.bind(this)
            this.selected = this.selected.bind(this)
            this.activateButton = this.activateButton.bind(this)
            this.addLeader = this.addLeader.bind(this)
            this.submit = this.submit.bind(this)
      }
      selected(id){
            this.setState({selected:id})
      }
      submit(e){
        e.preventDefault()
        const {users}=this.props
        const { _employeeName } = this.refs
        const employeeName=_employeeName.value.toLowerCase()
        const newList=users.filter(c=>{
          let name=c.name.toLowerCase()
          return (name.indexOf(employeeName)!==-1)}
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
           var notAlreadyContains=[leaders].filter(i=>i.id===leader.id)
           leaders.push(leader)
           this.setState({leaders:leaders})
           this.props.leaderAdded(this.state.leaders)
      }
      activateButton(name){
           return (name===this.state.selected) ? 'active-employees employees-select-list' : 'employees-select-list'
      }
      showCatalog(){
            this.setState({showCatalog:true},
            document.addEventListener('click',this.closeCatalog))
      }
      closeCatalog(e){
            const {container}=this.refs
            if(!container.contains(e.target)){
                     this.setState({showCatalog:false})
                     document.removeEventListener('click',this.closeCatalog,false)
            }
      }
      componentWillUnmount(){
            document.removeEventListener('click',this.closeCatalog,false)
      }
      render(){
        return (
              <div>
              <button className='buttons' onClick={this.showCatalog}>
                  + Add
              </button>
              {this.state.showCatalog&&
               <div className='form-backdrop'>
               <div className='form-container' ref='container'>
               <div className='forms'>
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
                      <div className={this.activateButton(employee.id)} onClick={()=>this.addLeader(employee)}>
                      Select
                      </div>
                      <div className='user-pic employee-list'>
                           {employee.picture.length?
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
                   </div>)
              }
              </div>
               </div>
               </div>
               </div>
              }
              </div>
            )
      }
}

export {UsersCatalogView}
