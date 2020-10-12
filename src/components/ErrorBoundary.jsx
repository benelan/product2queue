import React from 'react'
import PropTypes from 'prop-types'

/**
 * Error Boundary resets the state or refreshes the page if no resetState function is provided
 * @component
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
    this.resetComponentState = this.resetComponentState.bind(this)
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo)
  }

  resetComponentState() {
    const { resetState } = this.props
    if (resetState) resetState()
    else document.location.reload()
    this.setState({ hasError: false })
  }

  render() {
    const { hasError } = this.state
    const { children } = this.props
    if (hasError) {
      return (
        <div className="d-flex justify-content-center m-4">
          <button
            type="button"
            className="btn btn-success btn-sm ml-2"
            onClick={this.resetComponentState}
          >
            Something Went Wrong, Click To Reset.
          </button>
        </div>
      )
    }

    return children
  }
}

ErrorBoundary.defaultProps = {
  resetState: null,
}

ErrorBoundary.propTypes = {
  /** the children */
  children: PropTypes.node.isRequired,
  /** reset the state of the failed component */
  resetState: PropTypes.func,
}

export default ErrorBoundary
