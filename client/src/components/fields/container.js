import { connect } from "react-redux"
import AllFields from "./all-fields"

const mapStateToProps = (state) => {
  return {
    fetched: state.search.fetched,
  }
}

const Container = connect(
  mapStateToProps
)(AllFields)

export default Container