import {connect} from 'react-redux'
import {HeaderView} from '../ui/header_view'
import {editUser} from '../store/reducers/action-creators/actions'

function mapStateToProps(state) {
  return { currentUser : state.currentUser };
}
const mapDispatchToProps = dispatch =>
      ({
        editUser(email,name,id,photoURL)    {
            dispatch(editUser(email,name,id,photoURL))
         }
      })

export const Header=connect(mapStateToProps,mapDispatchToProps)(HeaderView)
