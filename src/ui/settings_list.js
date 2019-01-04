import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class SettingsList extends React.Component{
      constructor(props){
                super(props)
                this.state={showList:false}
                this.showList = this.showList.bind(this)
                this.closeList = this.closeList.bind(this)
      }
      showList(){
                this.setState({showList:true},
                    document.addEventListener('click',this.closeList)
                )
      }
      closeList(e){
                 const {list} = this.refs
                 if(!list.contains(e.target)){
                     this.setState({showList:false},
                         document.removeEventListener('click',this.closeList)
                     )
                 }
      }
      componentWillUnmount(){
                document.removeEventListener('click',this.closeList)
      }
      render(){
          const { saveSettings } = this.props
          return (
          <div>
          <div className='buttons settings-button' onClick={this.showList}>
          <FontAwesomeIcon icon="cog" color="#f19a11"/>
          </div>
          {this.state.showList&&
          <ul className='actions-list' ref='list'>
          <li onClick={saveSettings}> Save Settings </li>
          </ul>
          }
          </div>
          )
      }
}

export {SettingsList}
