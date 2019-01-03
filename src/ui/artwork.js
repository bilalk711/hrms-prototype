import React from 'react'
import {app} from '../db/firebase'
import FileUploader from 'react-firebase-file-uploader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class AddArtwork extends React.Component {
      constructor(props){
                    super(props)
                    this.state = {tasks:null,error:null,username: '',avatar: '',isUploading: false,progress: 0,imageurl: null}
                    this.handleChangeUsername=this.handleChangeUsername.bind(this)
                    this.handleUploadStart=this.handleUploadStart.bind(this)
                    this.handleProgress=this.handleProgress.bind(this)
                    this.handleUploadError=this.handleUploadError.bind(this)
                    this.handleUploadSuccess=this.handleUploadSuccess.bind(this)
                    this.removeTaskImage=this.removeTaskImage.bind(this)
      }
      componentWillMount(){
                    this.setState({tasks:this.props.project.tasks})
      }
      handleChangeUsername = (event) => this.setState({username: event.target.value})
      handleUploadStart = () => this.setState({isUploading: true, progress: 0})
      handleProgress = (progress) => this.setState({progress})
      handleUploadError = (error) => {
                    this.setState({isUploading: false,error})
                 }
      handleUploadSuccess = (filename) => {
          this.setState({imageUrl:null, progress: 100, isUploading: false})
          app.storage().ref('images').child(filename).getDownloadURL()
          .then(url =>this.setState({imageurl: url}))
          .then(()=>{
                var task={...this.props.task,imageUrl:this.state.imageurl}
                var projectTask=this.props.project.tasks
                projectTask=projectTask.map(i=>task.id===i.id ? i=task : i)
                this.props.artWorkAdded({...this.props.project,tasks:projectTask})
          })
      }
      removeTaskImage = ()=>{
          var task={...this.props.task,imageUrl:null}
          var projectTask=this.props.project.tasks
          projectTask=projectTask.map(i=>task.id===i.id ? i=task : i)
          this.props.artWorkAdded({...this.props.project,tasks:projectTask})
      }
      render() {
      return (
          <div>
          {!this.state.isUploading ?
          <div>
          {!this.props.task.imageUrl?
          <div>
          {this.state.error&&<span className='error'>Sorry Something went wrong..</span>}
          <label className='new-project-button buttons'>+ Add Artwork
              <FileUploader
              hidden
              accept='image/*'
              name='artwork'
              storageRef={app.storage().ref('images')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
              />
          </label>
          </div>
          :
          <div className='task-images-container'>
          <img className='tasks-images' src={this.props.task.imageUrl} alt='task-artwork'/>
          <div className='task-close-button' onClick={this.removeTaskImage}>
          <FontAwesomeIcon
                    icon="times"
                    color="green"
                    size="sm"
          />{' '}
          </div>
          </div>
          }
          </div>
          :
          <div className='small-loader'/>
          }
          </div>
      )
    }
}

export {AddArtwork}
