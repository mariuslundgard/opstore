import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'

const ENTER_KEY = 13

class TodoItem extends PureComponent {
  constructor (props) {
    super()
    this.state = {
      editing: false,
      title: props.title
    }
  }
  
  componentDidUpdate (_, prevState) {
    if (prevState.editing === false && this.state.editing) {
      this.editInput.focus()
    }
  }

  handleToggle (event) {
    this.props.toggleTodo(this.props.index, event.target.checked)
  }

  handleDestroy () {
    this.props.destroyTodo(this.props.index)
  }
  
  handleEdit () {
    this.setState({editing: true})
  }
  
  handleKeyDown (event) {
    if (event.keyCode === ENTER_KEY) {
      this.handleBlur()
    }
  }
  
  handleTitleChange (event) {
    this.setState({title: event.target.value})
  }

  handleBlur () {
    this.props.updateTodo(this.props.index, this.state.title)
    this.setState({editing: false})
  }

  render () {
    const {completed, title} = this.props
    const {editing} = this.state
    const classList = []

    if (completed) classList.push('completed')
    if (editing) classList.push('editing')

    return (
      <li className={classList.join(' ')}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onChange={this.handleToggle.bind(this)}
            checked={completed} />
          <label onDoubleClick={this.handleEdit.bind(this)}>{title}</label>
          <button
            className="destroy"
            onClick={this.handleDestroy.bind(this)} />
        </div>
        <input
          ref={(ref) => (this.editInput = ref)}
          className="edit"
          type="text"
          onChange={this.handleTitleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          autoFocus="true"
          value={this.state.title} />
      </li>
    )
  }
}

TodoItem.propTypes = {
  completed: PropTypes.bool.isRequired,
  destroyTodo: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
}

export default TodoItem
