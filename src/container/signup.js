import React, { Component } from "react"
import { withRouter } from "react-router"
import {app,writeUserData} from "../db/firebase"
import SignUpView from "../ui/signup_view"
import {addUser} from '../store/reducers/action-creators/actions'
import {connect} from 'react-redux'
require("babel-core/register");
require("babel-polyfill");


class SignUp extends Component {
  constructor(props){
        super(props)
        this.state={error:null,loading:false}
  }
  handleSignUp = async event => {
    event.preventDefault();
    const { email, password, name, username } = event.target.elements;
    this.setState({loading:true})
    const url='http://localhost:3000/admin/worker'
    const body=JSON.stringify({email:email.value,password:password.value,name:name.value})
    let self=this
    try {
            await fetch(
                        url,
                        {
                        method:'POST',
                        body:body,
                        headers:{'Content-Type':'application/json'}
                        }
                      )
                      .then(res=>
                           console.log(res)
                      )
                      .then(()=>{
                           app
                             .auth()
                             .signInWithEmailAndPassword(email.value, password.value)
                             .then(data=>{
                               self.setState({loading:false})
                               console.log(data.user.uid)
                               this.props.addUser(email.value,name.value,data.user.uid)
                             })
                             .catch(error=>{self.setState({loading:false,error:error.message})})
                           }
                           )
                      .catch(error=>console.log(error))

    } catch (error) {
      this.setState({error:error.message,loading:false})
    }
  };

  render() {
    return <SignUpView onSubmit={this.handleSignUp} error={this.state.error} loading={this.state.loading}/>;
  }
}
const mapDispatchToProps = dispatch =>
     ({
       addUser(email,name,id) {
           dispatch(addUser(email,name,id))
        }
     })

const SignUpContainer=connect(null,mapDispatchToProps)(SignUp)

export default withRouter(SignUpContainer);
