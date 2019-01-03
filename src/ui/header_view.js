import React from 'react'
import dreamteam from '../../images/dreamteam.png'
import {app} from '../db/firebase'
import {NavLink} from 'react-router-dom'
import SignOut from '../container/signout'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class HeaderView extends React.Component{
              constructor(props){
                super(props)
                this.state={showDropDown:false,profile:false,currentUser:null}
                this.showMenu = this.showMenu.bind(this);
                this.closeMenu = this.closeMenu.bind(this);
              }
              componentWillMount(){
                var url = window.location.href
                this.setState({currentUser:app.auth().currentUser})
                var profile=url.split('/').reverse()
                if(profile[1]!=='user'){
                  this.setState({profile:false})
                }
                else{
                  this.setState({profile:true})
                }
              }
              showMenu(event) {
                event.preventDefault();
                this.setState({ showMenu: true }, () => {
                 document.addEventListener('click', this.closeMenu);
                });
            }
              componentWillUnmount(){
                document.removeEventListener("click", this.closeMenu,false)
              }
              closeMenu(event) {
               const {dropdownMenu}=this.refs
               if (!dropdownMenu.contains(event.target)) {
                        this.setState({ showMenu: false }, () => {
                         document.removeEventListener('click', this.closeMenu);
                        });

               }
            }
          render() {

              return(
          <div>
          {this.state.currentUser&&
           <div className='header'>
           <img src={'/'+dreamteam} alt='logo' className='logo'/>
           <div className='user-info' onClick={this.showMenu}>
           <div className='user-pic profile'>
           {this.state.currentUser.photoURL?
           <img src={this.state.currentUser.photoURL} alt='profile-pic'/>
           :
           <div> </div>
           }
           </div>
           <div className='user-container'>
           <div className='username'>{this.state.currentUser.displayName}</div>
           <div style={{display:'inline'}}>
                 <span style={{cursor:'pointer'}}><FontAwesomeIcon
                           icon="chevron-down"
                           color="white"
                           size="sm"
                 />{' '}</span>
           </div>
                {this.state.showMenu
              ? (
                <div
                className="menu"
                ref='dropdownMenu'
              >
                <ul className='profile-menu'>
                <li onClick={()=>SignOut()}><FontAwesomeIcon
                          icon="sign-out-alt"
                          color="black"
                          size="sm"
                />{' '} Log Out </li>
                {!this.state.profile&&
                <li><FontAwesomeIcon
                          icon="user"
                          color="black"
                          size="sm"
                />{' '}
                <NavLink to={{pathname : `/user/${this.state.currentUser.displayName}`,
                             state : {user : this.props.currentUser }}}>
                    Profile
                </NavLink>
                </li>
                }
                </ul>
              </div>
            )
            : (
              null
            )
            }
            </div>
           </div>
           </div>
         }
         </div>
         )
       }
}
export {HeaderView}
