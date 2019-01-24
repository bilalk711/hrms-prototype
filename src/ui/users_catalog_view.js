import React from 'react'
import Popup from 'reactjs-popup'




class UsersCatalogView extends React.Component{
      constructor(props){
            super(props)
            this.state={active:false,updated:false,open: false,selected:[],error:null,project:this.props.project,leaders:[],employeesList:[], noResultMessage:false}
            this.selected = this.selected.bind(this)
            this.activateButton = this.activateButton.bind(this)
            this.addLeader = this.addLeader.bind(this)
            this.submit = this.submit.bind(this)
            this.openModal = this.openModal.bind(this)
            this.closeModal = this.closeModal.bind(this)
            this.invokeButton = this.invokeButton.bind(this)
      }
      openModal (){
        this.setState({ open: true })
      }
      closeModal () {
        this.setState({ open: false })
      }
      selected(id){
            var selected=this.state.selected
            var notAlreadyContains=selected.filter(i=>i==id)
            if(!notAlreadyContains.length){
              var selected=[...this.state.selected,id]
              this.setState({selected:selected})
            }
            else{
              var selected=selected.filter(i=>i!=id)
              this.setState({selected:selected})
            }
      }
      submit(e){
        e.preventDefault()
        const {users}=this.props
        const { _employeeName, _employeeID } = this.refs
        const employeeName =_employeeName.value.toLowerCase()
        const employeeID =_employeeID.value.toLowerCase()
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
      componentDidUpdate(){
           if(this.state.length&&this.state.updated===false){
               this.setState({active:true,updated:true})
           }
           else if(this.state.length==0&&this.state.updated===true){
               this.setState({active:false,updated:false})
           }
      }
      addLeader(){
           if(this.state.selected.length){
               var selected=this.state.selected
               var leaders=this.props.users
               var selectedLeaders=[]
               selected.map(q=>{
                     var [leader]=leaders.filter(i=>i.id==q)
                     if(leader){
                       selectedLeaders.push(leader)
                       console.log(selectedLeaders)
                     }
                })
                this.props.leaderAdded(selectedLeaders)
             }
      }
      invokeButton(id){
           this.selected(id)
      }
      activateButton(name){
           var selected = this.state.selected.filter(i=>i==name)
           return (selected.length!==0) ? 'active-employees employees-select-list' : 'employees-select-list'
      }
      render(){
        return (
              <div>
              <button className='buttons' onClick={this.openModal}>
                  + Add
              </button>
              <Popup modal open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal} overlayStyle={{position: "absolute",
                             top: "0px",
                             bottom: "0px",
                             left: "0px",
                             right: "0px",
                             background: "rgba(53, 52, 52, 0.66)",
                             display: "block",
                             width: "100%",
                             zIndex: "999",
                             overflow: "auto"
                           }}
               contentStyle={{
                             margin: "0px",
                             border: "none",
                             padding: "0px",
                             width: "100%",
                             height: "100%"
                             }}
                             >
               <div className='form-container'>
               <div className='form-header'>
                <h2> Add A Leader</h2>
                         <div className='cross' onClick={this.closeModal}>✖</div>
               </div>
               <div className='forms' style={{padding:'10px'}}>
               <form className='forms search-form' onSubmit={this.submit}>
               <input type='text' placeholder='Employee ID' ref='_employeeID' className='form-controls'/>
               <input type='text' placeholder='Employee Name' ref='_employeeName' className='form-controls'/>
               <input type='button' className='form-controls btn-primary-form btn-add' onClick={this.addLeader} value='Add Selected'  disabled={this.state.active ? "disabled" : ""}/>
               <input type='submit' value='SEARCH' className='form-controls'/>
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
                      <div className={this.activateButton(employee.id)} onClick={()=>this.invokeButton(employee.id)}>
                      </div>
                   </div>)
              }
              </div>
               </div>
               </div>
              </Popup>
              </div>
            )
      }
}

export {UsersCatalogView}
