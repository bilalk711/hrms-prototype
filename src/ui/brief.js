import React from 'react'
import {app} from '../db/firebase'
import FileUploader from 'react-firebase-file-uploader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Brief extends React.Component {
      constructor(props){
                    super(props)
                    this.state = {error:null,isUploading: false,progress: 0,imageurl: null}
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
          this.setState({imageUrl:null, progress: 100, isUploading: false})
          app.storage().ref('images').child(filename).getDownloadURL()
          .then(url =>this.setState({briefurl: url}))
          .then(()=>{
                this.props.briefAdded({...this.props.project,brief:this.state.briefurl})
          })
      }
      render() {
      return (
          <div>
          {!this.state.isUploading ?
          <div>
          {this.state.error&&<span className='error'>{this.state.error.message_}</span>}
          <label className='buttons'>+ Add Brief
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
          <div className='small-loader'/>
          }
          </div>
      )
    }
}

export {Brief}
