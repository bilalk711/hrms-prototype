import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {ChangeEmployeeCredentials} from './change_employee_credentials'
import Popup from 'reactjs-popup'
require("babel-core/register")
require("babel-polyfill")

class ListSearchedemployees extends React.Component{
                           constructor(props){
                               super(props)
                               this.state={showForm:false,showActions:false,showPrompt:false,error:null,success:false}
                               this.showActions=this.showActions.bind(this)
                               this.showPrompt = this.showPrompt.bind(this)
                               this.closePrompt = this.closePrompt.bind(this)
                               this.closeActions = this.closeActions.bind(this)
                               this.closeForm = this.closeForm.bind(this)
                               this.showForm = this.showForm.bind(this)
                               this.changeCredentials = this.changeCredentials.bind(this)
                           }
                           showForm(){
                               this.setState({showForm:true},()=>document.addEventListener('click',this.closeForm))
                           }
                           closeForm(e){
                               const {container,cross}=this.refs
                               if(!container.contains(e.target)||cross.contains(e.target)){
                                    this.setState({showForm:false},()=>{
                                    document.removeEventListener('click',this.closeForm,false)
                                   }
                                  )
                               }
                           }
                           async changeCredentials(values){
                             const {email,password,name} = values
                             const url='/admin/worker'
                             const body=JSON.stringify({id:this.props.employee.id,email:email,password:password})
                             await fetch (url,
                                          {
                                            method:'PUT',
                                            body:body,
                                            headers:{'Content-Type':'application/json'}
                                          }
                                        )
                                  .then(response=>response.json())
                                  .then(res=>{
                                    if(res.success){
                                        this.props.editUser(email,name,this.props.employee.id,"")
                                    }
                                    console.log('Suceeded!')
                                  })
                           }
                           async deleteUser(user_id){
                               const url='/admin/worker'
                               const body=JSON.stringify({id:user_id})
                               await fetch (url,
                                            {
                                              method:'DELETE',
                                              body:body,
                                              headers:{'Content-Type':'application/json'}
                                            }
                                          )
                                    .then(response=>response.json())
                                    .then(res=>{
                                      if(res.success){
                                          this.props.deleteUser(user_id)
                                      }
                                    })
                           }

                           showActions(event) {
                             event.preventDefault()
                             this.setState({ showActions: true }, () => {
                              document.addEventListener('click', this.closeActions)
                             })
                           }
                           closeActions(event) {
                            const {actions}=this.refs
                            if (!actions.contains(event.target)) {
                                     this.setState({ showActions: false }, () => {
                                      document.removeEventListener('click', this.closeActions,false)
                                     })
                            }
                          }
                          showPrompt(){
                               this.setState({showPrompt:true,success:true},()=>document.addEventListener('click',this.closePrompt))
                           }
                           closePrompt(e){
                               const {prompt, confirm, cross} = this.refs
                               if(!prompt.contains(e.target)||confirm.contains(e.target)||cross.contains(e.target)){
                                    this.setState({showPrompt:false},()=>{
                                    document.removeEventListener('click',this.closePrompt,false)
                                   }
                                  )
                               }
                           }
                           componentWillUnmount(){
                             document.removeEventListener('click', this.closePrompt,false)
                             document.removeEventListener('click', this.closeActions,false)
                             document.removeEventListener('click', this.closeForm,false)
                           }
                           render(){
                           const {employee}=this.props
                           var employeePrefix=employee.name.split(' ')
                           const {showActions,showPrompt,success,showForm} = this.state
                           return (
                            <div className='employee-box'>
                            <div className='user-pic'>
                            {employee.picture.length?
                            <img src={employee.picture} alt='employee'/>
                            :
                            <div className='name-prefix'>
                            {employeePrefix[0][0].toUpperCase()}
                            </div>
                            }
                            </div>
                            <Popup trigger={
                            <div className='actions-icon-employees' onClick={this.showActions} ref='dropDown'>
                            <FontAwesomeIcon
                            icon="ellipsis-v"
                            color="black"
                            />{' '}
                            </div>
                          }
                          on="click"
                            closeOnDocumentClick arrow={false}
                            position="bottom center"
                            contentStyle={{ padding: '0px', border: 'none' }}
                            >
                              <ul className='actions-list' ref='actions'>
                                <Popup trigger={
                                <li>Delete User</li>
                              } modal closeOnDocumentClick
                              overlayStyle={{position: "absolute",
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
                                             background:"transparent"
                                             }}
                                             >
                                             {close=>(
                                             <div className='form-container prompt-box' ref='prompt'>
                                             <div className='form-header'>
                                              <div className='cross' onClick={close}>✖</div>
                                             </div>
                                             <div className='prompt-message'>
                                             <h3>Delete the account of {employee.name} ?</h3>
                                             <input class="form-submit" type="submit" value="Confirm" onClick={()=>this.deleteUser(employee.id)} ref='confirm'/>
                                             </div>
                                             </div>
                                              )}
                                </Popup>
                                <Popup trigger={
                                <li>Change Credentials</li>
                              } modal closeOnDocumentClick
                              overlayStyle={{position: "absolute",
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
                                             background:"transparent"
                                             }}
                                             >
                                {close=>(
                                <div className='form-container' ref='container'>
                                <div className='form-header'>
                                 <div className='cross' ref='cross'>✖</div>
                                </div>
                                <ChangeEmployeeCredentials onSubmit={this.changeCredentials}/>
                                </div>
                                )}
                              </Popup>
                              </ul>
                              </Popup>
                            <div className='user'>
                            <h2>{employee.name}</h2>
                            </div>
                            </div>
                            )
                        }
                  }


export {ListSearchedemployees}
