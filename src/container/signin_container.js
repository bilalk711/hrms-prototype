import React, { Component } from "react"
import { withRouter } from "react-router"
import {app} from "../db/firebase"
import SignInView from "../ui/signin_view"
import {connect} from 'react-redux'
require("babel-core/register")
require("babel-polyfill")

class SignInContainer extends Component {
  constructor(props){
        super(props)
        this.state={error:null,loading:false}
  }
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    this.setState({loading:true})
    let self=this
    try {
      const user = await app
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(()=>{
          setTimeout(()=>{
          self.setState({loading:false})
          self.props.history.push("/")
        },2000)
         })

    }
    catch (error) {
      this.setState({error:error.message,loading:false})
    }
  }

  render() {
    return <SignInView onSubmit={this.handleSignUp} error={this.state.error} loading={this.state.loading} />;
  }
}

const mapDispatchToProps=dispatch=>({
      currentUser(project){
        dispatch(project)
      }
})


const SignIn=connect(null,mapDispatchToProps)(SignInContainer)

export default withRouter(SignIn);
