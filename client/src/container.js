import { connect } from 'react-redux'
import Router from './router'


const mapStateToProps = (state) => {
    return {
      login: state.login,
    }
  }

// const mapDispatchToProps = dispatch => ({
//     performSearch: () => dispatch(performSearchAction)
// })

export default connect(mapStateToProps)(Router);
