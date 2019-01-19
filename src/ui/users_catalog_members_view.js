import React from 'react'




class UsersCatalogMembersView extends React.Component{
      constructor(props){
            super(props)
            this.state={selected:[],error:null,showCatalog:false,project:this.props.project,members:[],employeesList:[], noResultMessage:false}
            this.showCatalog = this.showCatalog.bind(this)
            this.closeCatalog = this.closeCatalog.bind(this)
            this.selected = this.selected.bind(this)
            this.activateButton = this.activateButton.bind(this)
            this.addMember = this.addMember.bind(this)
            this.submit = this.submit.bind(this)
          }
            selected(id){
                  var selected=[...this.state.selected,id]
                  this.setState({selected:selected})
            }
            submit(e){
              e.preventDefault()
              const {users}=this.props
              const { _employeeName, _employeeID } = this.refs
              const employeeName=_employeeName.value.toLowerCase()
              const newList=users.filter(c=>{
                let name=c.name.toLowerCase()
                let id=c.employee_id.toLowerCase()
                return (name.indexOf(employeeName)!==-1||id.indexOf(employeeID)!==-1)}
              )
              if(newList.length){
                    this.setState({employeesList:newList,noResultMessage:false})
              }
              else{
                    this.setState({noResultMessage:true,employeesList:[]})
              }
            }
            addMember(member){
                 this.selected(member.id)
                 var members=this.state.members
                 console.log(members)
                 var notAlreadyContains=members.filter(i=>i.id==member.id)
                 if(notAlreadyContains.length===0){
                 members.push(member)
                 this.setState({members:members})
                 this.props.memberAdded(members)
               }
            }
            activateButton(name){
                 var selected = this.state.selected.filter(i=>i==name)
                 return (selected.length!==0) ? 'active-employees employees-select-list' : 'employees-select-list'
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
                     <div className='forms' style={{padding:'10px'}}>
                     <form className='forms search-form' onSubmit={this.submit}>
                     <input type='text' placeholder='Employee ID' ref='_employeeID' class='form-controls'/>
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
                            <div className={this.activateButton(employee.id)} onClick={()=>this.addMember(employee)}>
                            ADD
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

export {UsersCatalogMembersView}
