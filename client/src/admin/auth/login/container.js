import { connect } from 'react-redux'
import LoginHome from './index'
import { loginUser, loginUserFail, loginStart, loginError, loggedIn } from '../../../actions/login-actions'
import { loadUserData } from '../../../actions/admin-start-actions'


const mapStateToProps = state => ({
      fetched: state.search.fetched,
})

const mapDispatchToProps = dispatch => ({
      loginUser: (resp) => dispatch(loginUser(resp)),
      loginStart: (resp) => dispatch(loginStart(resp)),
      loginUserFail: (resp) => dispatch(loginUserFail(resp)),
      loadUserData: (resp) => dispatch(loadUserData(resp))
    
 })

export default connect(mapStateToProps, mapDispatchToProps)(LoginHome);

