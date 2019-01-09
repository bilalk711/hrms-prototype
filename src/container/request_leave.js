import {connect} from 'react-redux'
import {RequestLeaveView} from '../ui/request_leave_view'

const mapStateToProps = state =>
     ({
        token:state.admin.token
     })


export const RequestLeave=connect(mapStateToProps,null)(RequestLeaveView)
