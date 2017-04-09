import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'

const ENTER_KEY = 13

class TodoForm extends PureComponent {
  constructor () {
    super()
    this.state = {
      text: ''
    }
  }

  handleChange (event) {
    this.setState({text: event.target.value})
  }

  handleKeyDown (event) {
    if (event.keyCode === ENTER_KEY) {
      if (this.state.text) {
        this.props.addTodo(this.state.text)
        this.setState({text: ''})
      }
    }
  }

  render () {
    return (
      <input
        className="new-todo"
        type="text"
        placeholder="What needs to be done?"
        autoFocus="true"
        onChange={this.handleChange.bind(this)}
        onKeyDown={this.handleKeyDown.bind(this)}
        value={this.state.text} />
    )
  }
}

TodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default TodoForm
