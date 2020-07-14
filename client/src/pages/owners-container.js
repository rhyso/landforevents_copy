import { connect } from "react-redux"
import { bindActionCreators } from 'redux';
import {getOwnersError, getOwners, getOwnersPending} from '../reducers/owner-reducer';
import fetchOwners from '../api/fetch-owners';

import OwnersPage from "./owners";


const mapStateToProps = state => ({
    error: getOwnersError(state),
    owners: getOwners(state),
    pending: getOwnersPending(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
    fetchOwners: fetchOwners
}, dispatch)

const Container = connect(
    mapStateToProps,
    mapDispatchToProps
)(OwnersPage);

export default Container

