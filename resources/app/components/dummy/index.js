import React from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchSymbols } from '../../redux/reducers/symbols'

class Dummy extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchSymbols())
  }

  render() {
    const { loading, symbols } = this.props
    return (
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            <li>This is a space beyond...</li>
            {symbols.map(s => (
              <li>{s}</li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

Dummy.propTypes = {
  dispatch: PropTypes.func.isRequired,
  symbols: PropTypes.arrayOf,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  loading: state.symbols.loading,
  symbols: state.symbols.symbols,
})

export default withRouter(connect(mapStateToProps)(Dummy))
