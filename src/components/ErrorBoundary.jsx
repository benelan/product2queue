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
    const { children, buttonClass, buttonText } = this.props
    if (hasError) {
      return (
        <div className="d-flex justify-content-center m-4">
          <button
            type="button"
            className={buttonClass}
            onClick={this.resetComponentState}
          >
            {buttonText}
          </button>
        </div>
      )
    }
    return children
  }
}

ErrorBoundary.defaultProps = {
  resetState: null,
  buttonClass: 'btn btn-outline-secondary btn-sm m-2',
  buttonText: 'Something Went Wrong, Click To Reset.',
}

ErrorBoundary.propTypes = {
  /** the children */
  children: PropTypes.node.isRequired,
  /** the class of the reload button for css styling */
  buttonClass: PropTypes.string,
  /** the text for the reload button */
  buttonText: PropTypes.string,
  /** reset the state of the failed component */
  resetState: PropTypes.func,
}

export default ErrorBoundary
