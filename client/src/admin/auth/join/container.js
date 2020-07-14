import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { joinStarted } from './actions'
import { loginUser } from '../../../actions/login-actions'
import JoinMiddle from './middleware'


const mapStateToProps = (state) => {
  return {
    fetched: state.search.fetched,
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  joinStarted, loginUser,
}, dispatch)


// if you want to use mapDispatchToProps without a mapStateToProps just use null for the first argument.
// e.g export default connect(null, mapDispatchToProps)(Start)

//export default connect(null, mapDispatchToProps)(JoinMiddle);

export default connect(mapStateToProps, mapDispatchToProps)(JoinMiddle);

