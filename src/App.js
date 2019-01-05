import React from 'react'
import './App.css'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import {Dashboard} from './ui/dashboard'
import {Projects} from './container/projects'
import {Employees} from './container/employees'
import {Expenses} from './container/expenses'
import {Project} from './container/project'
import {User} from './container/user'
import SignIn from './container/signin_container'
import PrivateRoute from './db/requireAuth'
import {app, refUsers, refProjects} from './db/firebase'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle,faCog,faChevronDown,faCircle,faUser,faSignOutAlt,faBars,faTh,faBan,faTimes,faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import store from './store/storeFactory'
import {changeStateUsers, changeStateProjects} from './store/reducers/action-creators/actions'
require("babel-core/register")
require("babel-polyfill")

library.add(faCheckCircle,faCog,faChevronDown,faCircle,faUser,faSignOutAlt,faBars,faTh,faBan,faTimes,faEllipsisV);

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
                                      refUsers.once('value')
                                          .then(data=>{
                                          const users=Object.assign([],data.val())
                                          console.log(users)
                                          store.dispatch(changeStateUsers(users))
                                      })
                                      refProjects.once('value')
                                          .then(data=>{
                                          const projects=Object.assign([],data.val())
                                          console.log(projects)
                                          store.dispatch(changeStateProjects(projects))
                                      })
                                      store.dispatch({type:'CURRENT_USER',payload:this.state.currentUser})
                                      console.log(user)
                                      self.isAdmin(user,self)
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
                               <PrivateRoute path='/employees' component={Employees} authenticated={authenticated}/>
                               }
                               <PrivateRoute exact path='/projects' component={Projects} authenticated={authenticated}/>
                               <PrivateRoute path='/expenses' component={Expenses} authenticated={authenticated}/>
                               <PrivateRoute path='/projects/:project' component={Project} name='project' authenticated={authenticated}/>
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
