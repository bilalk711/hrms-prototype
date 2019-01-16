import { connect } from 'react-redux'
import { LeaveRequestsView } from '../ui/leave_requests_view'

const mapStateToProps = state =>
     ({
        applications:state.applications
     })


export const LeaveRequests=connect(mapStateToProps,null)(LeaveRequestsView)
