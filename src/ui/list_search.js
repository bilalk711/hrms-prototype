import React from 'react'
import propTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

class ListSearchedprojects extends React.Component{
          constructor(props){
            super(props)
            this.state={showPrompt:false,showMenu:false,showProjectDetails:false,project:null}
            this.showMenu = this.showMenu.bind(this)
            this.closeMenu = this.closeMenu.bind(this)
            this.showProjectDetails = this.showProjectDetails.bind(this)
            this.remove = this.remove.bind(this)
            this.showPrompt = this.showPrompt.bind(this)
            this.closePrompt = this.closePrompt.bind(this)
          }
          componentWillMount(){
            this.setState({project:this.props.project})
          }
          remove(id){
            this.setState({showMenu:false})

          }
          showMenu(event) {
            event.preventDefault()
            this.setState({ showMenu: true }, () => {
             document.addEventListener('click', this.closeMenu)
            });
          }
          showProjectDetails(){
            this.setState({showProjectDetails:true})
          }
          componentWillUnmount(){
            document.removeEventListener("click", this.closeMenu,false)
            document.removeEventListener('click', this.closePrompt,false)
          }
          closeMenu(event) {
           const {dropdownMenu,statusMenu}=this.refs
           if (!dropdownMenu.contains(event.target)||!statusMenu.contains(event.target)) {
                    this.setState({ showMenu: false,showStatus: false }, () => {
                     document.removeEventListener('click', this.closeMenu)
                    })
           }
         }
         showPrompt(){
              this.setState({showPrompt:true},()=>document.addEventListener('click',this.closePrompt))
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
          render(){
          const {project} = this.state
          return(
          <div>
          <ul key={project.project_id} className='search-list'>
          <li>
          <NavLink to={{pathname : `projects/${project.title}`,
                       state : {project : project }}}>
              {project.title}
          </NavLink>
          </li>
          <li className='hide-on-mobiles'>
              {project.project_id}
          </li>
          {project.leader?
          <div>
          {project.leader.length!==0?
          <li className='hide-on-mobiles'>
           {project.leader[0].name}
          </li>
          :
          <li className='hide-on-mobiles'>
             ---
          </li>
        }
          </div>
          :
          <li className='hide-on-mobiles'>
             ---
          </li>
      }
          <li className='hide-on-mobiles'>
          </li>
          <li className='hide-on-mobiles'>
              {project.deadline}
          </li>
          <li className='hide-on-mobiles'>
          </li>
          {project.status===0 ?
                    <li id='status-bar' onClick={this.showStatus} ref='statusMenu' className='actions-button'>
                    <FontAwesomeIcon
                    icon="circle"
                    color="#ffb507"
                    size="sm"
          />{' '}Active  </li>
                   :
                   <li id='status-bar' onClick={this.showStatus} ref='statusMenu' className='actions-button'>
                   <FontAwesomeIcon
                   icon="circle"
                   color="#6DB65B"
                   size="sm"
          />{' '} Completed </li>
          }
          <li onClick={this.showMenu} ref='dropdownMenu' className='actions-button'>
          <FontAwesomeIcon
                    icon="th"
                    color="black"
           size="sm"/>
             {this.state.showMenu ?
              <ul className='actions-list'>
                  <li onClick={this.showPrompt}>Remove Project</li>
              </ul>
              : null
            }
          </li>
          </ul>
          {this.state.showPrompt&&
            <div className='form-backdrop'>
            <div className='form-container prompt-box' ref='prompt'>
            <div className='form-header'>
             <div className='cross' ref='cross'>✖</div>
            </div>
            <div className='prompt-message'>
            <h3>Delete the Project {project.title} ?</h3>
            <input class="form-submit" type="submit" value="Confirm" onClick={()=>this.props.removeProject(project.id)} ref='confirm'/>
            </div>
            </div>
            </div>
          }
          </div>
         )
      }
}

ListSearchedprojects.propTypes={
           removeProject:propTypes.func.isRequired,
           project:propTypes.object.isRequired
}
export {ListSearchedprojects}
