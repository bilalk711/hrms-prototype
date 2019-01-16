import React from 'react'
import './App.css'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import {Dashboard} from './ui/dashboard'
import {Projects} from './container/projects'
import {Employees} from './container/employees'
import {Expenses} from './container/expenses'
import {LeaveRequests} from './container/leave_requests'
import {Project} from './container/project'
import {User} from './container/user'
import SignIn from './container/signin_container'
import PrivateRoute from './db/requireAuth'
import { app, refUsers, refProjects, refAdmin, refApplications, messaging } from './db/firebase'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle,faCog,faChevronDown,faCircle,faUser,faSignOutAlt,faBars,faTh,faBan,faTimes,faEllipsisV,faDotCircle,faKey } from '@fortawesome/free-solid-svg-icons';
import store from './store/storeFactory'
import {changeStateUsers, changeStateProjects, addAdminToken, changeApplicationsState} from './store/reducers/action-creators/actions'
require("babel-core/register")
require("babel-polyfill")

library.add(faCheckCircle,faCog,faChevronDown,faCircle,faUser,faSignOutAlt,faBars,faTh,faBan,faTimes,faEllipsisV,faDotCircle,faKey);

class App extends React.Component{
                  constructor(props){
                      super(props)
                      this.state = {admin:false,currentUser:null,loading: true, authenticated: false, user: null };
                      this.isAdmin=this.isAdmin.bind(this)
                  }
                  isAdmin(user,self){
                      app.auth().currentUser.getIdTokenResult()
                        .then((idTokenResult) => {
                           if (idTokenResult.claims.admin) {
                             self.setState({admin:true,currentUser:user,authenticated: true,loading: false})
                           } else {
                             self.setState({admin:false,currentUser:user,authenticated: true,loading: false})
                           }
                        })
                        .catch((error) => {
                          console.log(error)
                        })
                  }
                  componentWillMount() {
                      refUsers.once('value')
                          .then(data=>{
                          const users=Object.assign([],data.val())
                          store.dispatch(changeStateUsers(users))
                      })
                      refProjects.once('value')
                          .then(data=>{
                          const projects=Object.assign([],data.val())
                          store.dispatch(changeStateProjects(projects))
                      })
                      app.auth().onAuthStateChanged(user => {
                        if (user) {
                          let self = this
                          app.auth().currentUser.getIdToken()
                          .then(function(token) {
                          const url='/login/authenticate'
                          const bearer='Bearer '+token
                          fetch(
                            url,
                            {
                          method:'GET',
                          headers: {
                          'Authorization':bearer,
                          'Content-Type':'application/json'
                            }
                          })
                            .then(response=>response.json())
                            .then((user)=>{
                                      console.log(user)
                                      self.isAdmin(user,self)
                                      store.dispatch({type:'CURRENT_USER',payload:user})
                               }
                             )
                            .catch(error =>
                                 console.log(error)
                            )
                          })
                        } else {
                          this.setState({
                            authenticated: false,
                            currentUser: null,
                            loading: false
                          })
                        }
                      })
                      }
                  componentDidMount(){
                    if(this.state.admin){
                    messaging.requestPermission().then(function() {
                      console.log('Notification permission granted.')
                    }).catch(function(err) {
                      console.log('Unable to get permission to notify.', err)
                    })
                    messaging.getToken().then(function(currentToken) {
                          if (currentToken) {
                              refAdmin.set({token:currentToken})
                          } else {
                            console.log('No Instance ID token available. Request permission to generate one.')
                            this.setState({pushNotifications:false})
                          }
                        }).catch(function(err) {
                          console.log('An error occurred while retrieving token. ', err)
                        })
                    messaging.onTokenRefresh(function() {
                          messaging.getToken().then(function(refreshedToken) {
                            console.log('Token refreshed.')
                            refAdmin.set({token:refreshedToken})
                            // ...
                          }).catch(function(err) {
                            console.log('Unable to retrieve refreshed token ', err)
                          })
                      })
                    messaging.onMessage(function(payload) {
                              const newApplication=refApplications.push()
                              newApplication.set({application:payload})
                              console.log('Message received. ', payload)
                        })
                      }
                    else{
                           refAdmin.on('value',snapshot=>{
                             console.log(snapshot.val())
                             const token=snapshot.val()
                             store.dispatch(addAdminToken(token.token))
                        })
                    }
                    refApplications.on('value',snapshot=>{
                               console.log(Object.assign([],snapshot.val()))
                               var applicationsArray=[]
                               const applications=snapshot.val()
                               for (var key in applications){
                                   if(applications.hasOwnProperty(key)){
                                        applicationsArray.push(applications[key])
                                   }
                               }
                               store.dispatch(changeApplicationsState(applicationsArray))
                    })
                  }
                  render(){
                      const { authenticated, loading } = this.state
                      if (loading) {

                        return <div className='form-backdrop'><div className='loader'></div></div>
                      }
                      return(
                        <div className='wrapper'>
                        <BrowserRouter>
                        <div className='pages'>
                               <Switch>
                               <PrivateRoute exact path="/" component={Dashboard} authenticated={authenticated}/>
                               {this.state.admin&&
                               <PrivateRoute exact path='/employees' component={Employees} authenticated={authenticated}/>
                               }
                               <PrivateRoute exact path='/projects' component={Projects} authenticated={authenticated}/>
                               <PrivateRoute path='/expenses' component={Expenses} authenticated={authenticated}/>
                               <PrivateRoute path='/projects/:project' component={Project} name='project' authenticated={authenticated}/>
                               <PrivateRoute path='/employees/leaves' component={LeaveRequests} authenticated={authenticated}/>
                               <PrivateRoute exact path='/user/:user' component={User} name='user' authenticated={authenticated}/>
                               {!this.state.currentUser&&!authenticated?
                                <div>
                                  <Route exact path='/login' component={SignIn}/>
                                </div>
                                :
                                <Redirect to='/'/>
                               }
                               <Route component={PageNotFound}/>
                               </Switch>
                        </div>
                        </BrowserRouter>
                        </div>
                      )
}
}
const PageNotFound=()=>
                    <div>
                    <FontAwesomeIcon
                              icon="ban"
                              color="red"
                    />{' '}
                   <h2> Sorry, page not found! </h2>
                   </div>

export default App;
