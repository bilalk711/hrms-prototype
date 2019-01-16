import React from 'react'
import {app} from '../db/firebase'
import FileUploader from 'react-firebase-file-uploader'

class UploadProfilePhoto extends React.Component {
      constructor(props){
                    super(props)
                    this.state = {error:null,isUploading: false,progress: 0}
                    this.handleChangeUsername=this.handleChangeUsername.bind(this)
                    this.handleUploadStart=this.handleUploadStart.bind(this)
                    this.handleProgress=this.handleProgress.bind(this)
                    this.handleUploadError=this.handleUploadError.bind(this)
                    this.handleUploadSuccess=this.handleUploadSuccess.bind(this)
      }
      handleChangeUsername = (event) => this.setState({username: event.target.value})
      handleUploadStart = () => this.setState({isUploading: true, progress: 0})
      handleProgress = (progress) => this.setState({progress})
      handleUploadError = (error) => {
                    this.setState({isUploading: false,error})
                 }
      handleUploadSuccess = (filename) => {
          this.setState({progress: 100, isUploading: false})
          app.storage().ref('profiles').child(filename).getDownloadURL()
          .then(url =>this.props.changeProfilePhoto(url))
      }
      render() {
      return (
          <div>
          {!this.state.isUploading ?
          <div>
          {this.state.error&&<span className='error'>{this.state.error.message_}</span>}
          {this.props.user.picture?
          <label className='new-project-button buttons'>Change Profile Photo
              <FileUploader
              hidden
              accept='profiles/*'
              name='profile'
              storageRef={app.storage().ref('profiles')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
              />
          </label>
          :
          <label className='profile-photo-button'>Upload Profile Photo
              <FileUploader
              hidden
              accept='profiles/*'
              name='profile'
              storageRef={app.storage().ref('profiles')}
              onUploadStart={this.handleUploadStart}
              onUploadError={this.handleUploadError}
              onUploadSuccess={this.handleUploadSuccess}
              onProgress={this.handleProgress}
              />
          </label>
          }
          </div>
          :
          <div className='small-loader'/>
          }
          </div>
      )
    }
}

export {UploadProfilePhoto}
