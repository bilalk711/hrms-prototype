import React from 'react'
import {NavLink} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {Dropdown} from './dropdown'
import {showDropDown} from './showDropDown'
import 'react-slidedown/lib/slidedown.css'
import {app} from '../db/firebase'
import {connect} from 'react-redux'



class NavigationView extends React.Component{
                  constructor(props){
                      super(props)
                      this.state={showMenu:false,width:0,admin:false,employeesTabSelected:false}
                      this.showMenu = this.showMenu.bind(this)
                      this.closeMenu = this.closeMenu.bind(this)
                      this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
                      this.changeState = this.changeState.bind(this)
                      this.closeEmployeesTab = this.closeEmployeesTab.bind(this)
                      this.showEmployeesTab = this.showEmployeesTab.bind(this)
                      this.isAdmin = this.isAdmin.bind(this)
                      this.selected = this.selected.bind(this)
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
                  changeState(state){
                      this.setState(state)
                  }
                  showMenu(event,showMenu) {
                      showDropDown(event,showMenu,this.changeState,this.closeMenu,document.addEventListener('click', this.closeMenu))
                      document.querySelector('.page-content').style.opacity = "0.3"
                  }
                  showEmployeesTab() {
                      this.setState({employeesTabSelected:true,employeesTab:true},document.addEventListener('click',this.closeEmployeesTab))
                  }
                  selected(){
                      if(this.state.employeesTabSelected){
                           return 'active'
                      }
                           return ''
                  }
                  componentDidMount(){
                      var url=window.location.href
                      var employees=url.split('/').reverse()
                      if(employees[1]==='employees'){
                          this.setState({employeesTab:true},document.addEventListener('click',this.closeEmployeesTab))
                      }
                  }
                  closeEmployeesTab(e){
                      var url=window.location.href
                      var employees=url.split('/').reverse()
                      const { employeesTab } = this.refs
                      if(!employeesTab.contains(e.target)&&employees[1]!=='employees'){
                           this.setState({employeesTab:false},document.removeEventListener('click',this.closeEmployeesTab,false))
                      }
                  }
                  componentDidMount() {
                     this.isAdmin()
                     this.updateWindowDimensions();
                     window.addEventListener('resize', this.updateWindowDimensions)
                  }
                  componentWillUnmount(){
                     document.removeEventListener("click", this.closeMenu,false)
                     document.removeEventListener("click", this.closeEmployeesTab,false)
                     window.removeEventListener('resize', this.updateWindowDimensions)
                  }
                  updateWindowDimensions() {
                     this.setState({ width: window.innerWidth})
                  }
                  closeMenu(event) {
                     const {dropdownMenu}=this.refs
                     if (dropdownMenu.contains(event.target)) {
                              this.setState({ showMenu: false }, () => {
                               document.removeEventListener('click', this.closeMenu)
                              })
                    document.querySelector('.page-content').style.opacity = "1"
                     }
                  }
                  render(){
                  return(
                  <div className='navigation-container'>
                  {this.state.width<=599 ?

                  <div className='menu-icon' onClick={(e)=>this.showMenu(e,{showMenu:true})}>
                  {!this.state.showMenu?
                  <FontAwesomeIcon
                            icon="bars"
                            color="black"
                   size="sm"/>
                   :
                   <div className='close-menu' ref='dropdownMenu'>
                   <FontAwesomeIcon
                             icon="times"
                             color="black"
                    size="sm"/>
                   </div>
                 }
                  </div>
                  :
                  <ul className='navigation-list'>
                  <li className='navigation-items'>
                  <NavLink exact to='/' activeClassName="active">Dashboard</NavLink>
                  </li>
                  {this.state.admin&&
                  <div>
                  <li className='navigation-items' onClick={this.showEmployeesTab}>
                      <a className={this.selected}>Employees  <FontAwesomeIcon icon='chevron-down' color='grey' size='sm'/></a>
                  </li>
                  <div ref='employeesTab'>
                  <Dropdown open={this.state.employeesTab}>
                    <li className='navigation-items'>
                     <NavLink exact to='/employees' className='employees-tabs' activeClassName='active-employees-tabs'>
                       All Employees
                    </NavLink>
                    </li>
                    <li className='navigation-items'>
                    <NavLink to='/employees/leaves' className='employees-tabs' activeClassName='active-employees-tabs'>
                       Leaves
                    </NavLink>
                    </li>
                  </Dropdown>
                    </div>
                  </div>
                 }
                  <li className='navigation-items'>
                  <NavLink to='/projects' activeClassName="active">Projects</NavLink>
                  </li>
                  <li className='navigation-items'>
                  <NavLink to='/expenses' activeClassName="active">Expenses</NavLink>
                  </li>
                  </ul>
                }
                  <Dropdown open={this.state.showMenu}>
                  <ul className='navigation-list'>
                  <li className='navigation-items'>
                  <NavLink exact to='/' activeClassName="active">Dashboard</NavLink>
                  </li>
                  {this.state.admin&&
                  <div>
                  <li className='navigation-items'>
                  <NavLink exact to='/employees' activeClassName="active">Employees</NavLink>
                  </li>
                  <li className='navigation-items'>
                  <NavLink to='/employees/leaves' activeClassName="active"> Leave </NavLink>
                  </li>
                  </div>
                 }
                  <li className='navigation-items'>
                  <NavLink to='/projects' activeClassName="active">Projects</NavLink>
                  </li>
                  <li className='navigation-items'>
                  <NavLink to='/expenses' activeClassName="active">Expenses</NavLink>
                  </li>
                  </ul>
                  </Dropdown>
                </div>

              )
                }
}


function mapStateToProps(state) {
  return { currentUser : state.currentUser };
}

export const Navigation=connect(mapStateToProps,null)(NavigationView)
