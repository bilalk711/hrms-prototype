import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class ProjectSettings extends React.Component {
      constructor(props){
             super(props)
             this.state= {showStatus:false}
             this.closeMenu = this.closeMenu.bind(this)
             this.showStatus = this.showStatus.bind(this)
             this.submit = this.submit.bind(this)
      }
      submit(e){
             const {invoiced} = this.refs
             const newState={...this.props.project,invoiced:true,invoice:invoiced.value}
             this.props.stateChanged(newState)
             e.preventDefault()

      }
      showStatus(event) {
        event.preventDefault();
        this.setState({ showStatus: true }, () => {
         document.addEventListener('click', this.closeMenu)
        })
      }
      closeMenu(event) {
       const {statusMenu}=this.refs
       if (!statusMenu.contains(event.target)) {
                this.setState({ showStatus: false }, () => {
                 document.removeEventListener('click', this.closeMenu)
                })

       }
     }
      componentWillMount(){
            document.removeEventListener('click', this.closeMenu)
      }
      render(){
        const {stateChanged,project} = this.props
        return (
                <div className='project-settings'>
                <h2>Project Settings</h2>
                <ul>
                <div className='actions-button'>
                {project.status===0 ?
                          <li id='status-bar' onClick={this.showStatus} ref='statusMenu' className='actions-button'>
                          <FontAwesomeIcon
                          icon="circle"
                          color="#ffb507"
                          size="sm"
                />{' '}Active  <FontAwesomeIcon
                          icon="chevron-down"
                          color="black"
                          size="sm"
                />{' '}</li>
                         :
                         <li id='status-bar' onClick={this.showStatus} ref='statusMenu' className='actions-button'>
                         <FontAwesomeIcon
                         icon="circle"
                         color="#6DB65B"
                         size="sm"
                />{' '} Completed <FontAwesomeIcon
                         icon="chevron-down"
                         color="black"
                         size="sm"
                />{' '}</li>
                }
                {this.state.showStatus ?
                 <ul className='actions-list'>
                     <li onClick={()=>this.props.stateChanged({...project,status:1})}>Completed</li>
                     <li onClick={()=>this.props.stateChanged({...project,status:0})}>Active</li>
                 </ul>
                 : null
                 }
                {!project.invoiced&&project.status!==0&&
                <div className='invoice'>
                <form className='invoice-name-form' onSubmit={this.submit}>
                      <input type='text' name='invoice' ref='invoiced' placeholder='Enter Invoice'/>
                      <input type='submit' value='Invoiced'/>
                </form>
                </div>
              }
                </div>
                </ul>
                </div>
            )
        }
}

export {ProjectSettings}
