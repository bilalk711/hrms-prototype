import {connect} from 'react-redux'
import {UISigninForm} from '../ui/signin_form_view'

function mapStateToProps(state) {
  return { login: state.login };
}

const mapDispatchToProps = dispatch =>
     ({
       login(email){
           dispatch(email)
       }
     })


export const Signin=connect(mapStateToProps,mapDispatchToProps)(UISigninForm)
