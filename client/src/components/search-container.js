import { connect } from 'react-redux'
import { performSearchAction } from '../actions/search-actions'
import Search from './search'

const mapStateToProps = state => ({ ...state })

const mapDispatchToProps = dispatch => ({
    performSearch: () => dispatch(performSearchAction)
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
