import React from 'react'
import {Navigation} from './navigation_view'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {app} from '../db/firebase'
import {updateUserSettings} from '../store/utility_functions'
import {UploadProfilePhoto} from './upload_profile_photo'
import {Header} from '../container/header'
import {ChangeEmployeeCredentials} from './change_employee_credentials'
require("babel-core/register")
require("babel-polyfill")

class UserView extends React.Component{
      constructor(props){
             super(props)
             this.state={user:null,admin:false,showForm:false}
             this.changeProfilePhoto = this.changeProfilePhoto.bind(this)
             this.saveSettings = this.saveSettings.bind(this)
             this.closeForm = this.closeForm.bind(this)
             this.showForm = this.showForm.bind(this)
             this.changeCredentials = this.changeCredentials.bind(this)
             this.isAdmin = this.isAdmin.bind(this)
         }
         isAdmin(){
             let self=this
             app.auth().currentUser.getIdTokenResult()
               .then((idTokenResult) => {
                  if (idTokenResult.claims.admin) {
                    self.setState({admin:true})
                  } else {
                    self.setState({admin:false})
                  }
               })
               .catch((error) => {
                 console.log(error)
               })
         }
      componentWillMount(){
             this.setState({user:this.props.location.state.user})
             this.isAdmin()
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
      changeProfilePhoto(url){
        var user = app.auth().currentUser
              user.updateProfile({
                photoURL: url
              }).then(function() {
                console.log('Successfully')
              }).catch(function(error) {
                console.log(error)
              })
              this.setState({user:{...this.state.user,picture:url}})
              this.props.currentUser({type:'CURRENT_USER',payload:{user:{...this.state.user,picture:url}}})
       }
       async changeCredentials(values){
         const {email,password,name} = values
         const url='/admin/worker'
         const body=JSON.stringify({id:this.state.user.id,email:email,password:password})
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
                    this.props.editUser(email,name,this.state.user.id,"")
                }
                console.log('Suceeded!')
              })
       }
       saveSettings(user){
                    app.auth().currentUser.updateProfile({
                               email: user.email,
                               emailVerified: true,
                               displayName: user.name,
                               photoURL: user.picture,
                    }).then(()=>{
                        this.props.editUser(user.email,user.name,user.id,user.picture)
                  }
               )
                  .catch(error=>
                       console.log(error)
               )
      }
      componentWillUnmount(){
        document.removeEventListener('click', this.closeForm,false)
      }
      render(){
        const namePrefix=this.state.user.name.split(' ')
        return(
        <div className='JSX-container'>
        <Header/>
        <div className='page'>
        <Navigation/>
        <div className='page-content'>
        {this.state.user&&
        <div className='user-profile-container'>
        <div>
        <div className='user-pic'>
        {this.state.user.picture?
        <img src={this.state.user.picture} alt='profile-pic'/>
        :
        <div className='name-prefix'> {namePrefix[0][0]} </div>
        }
        </div>
        <UploadProfilePhoto user={this.state.user} changeProfilePhoto={this.changeProfilePhoto}/>
        </div>
        <div>
        <label> Full Name </label>
        <h2>{this.state.user.name}</h2>
        <label> Email Address </label>
        <h3>{this.state.user.email}</h3>
        <h3><FontAwesomeIcon icon='user' color='orange'/> Role :
        {this.state.admin?
          <strong>Admin   <FontAwesomeIcon icon='key' color='orange'/></strong>
          :
          <strong>Member</strong>
        }
          </h3>
        </div>
        <div>
        <div onClick={this.showForm}>
            <FontAwesomeIcon
                      icon="pencil"
                      color="black"
             size="sm"/>
         </div>
        {this.state.showForm&&
           <div className='form-backdrop'>
           <div className='form-container' ref='container'>
           <div className='form-header'>
             Change Personal Credentials
            <div className='cross' ref='cross'>✖</div>
           </div>
           <ChangeEmployeeCredentials onSubmit={this.changeCredentials}/>
           </div>
           </div>
        }
        <div onClick={()=>this.saveSettings(this.state.user)} className='buttons'>
        Save Settings
        </div>
        </div>
        </div>
        }
        </div>
        </div>
        </div>
      )
      }
}
export {UserView}
