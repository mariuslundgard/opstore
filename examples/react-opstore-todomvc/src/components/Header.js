import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import TodoForm from './TodoForm'

class Header extends PureComponent {
  render () {
    const {addTodo} = this.props

    return (
      <div className="header">
        <h1>todos</h1>
        <TodoForm addTodo={addTodo} />
      </div>
    )
  }
}

Header.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default Header
