import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'

class Footer extends PureComponent {
  handleFilterClick (event) {
    const anchorElement = event.target.closest('a')

    if (anchorElement) {
      this.props.setFilter(anchorElement.hash.substr(2) || '*')
    }
  }

  render () {
    const {clearCompletedTodos, filter, todoCount} = this.props

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{todoCount}</strong>
          {todoCount > 1 ? ' items left' : ' item left'}
        </span>
        <ul className="filters" onClick={this.handleFilterClick.bind(this)}>
          <li>
            <a className={filter === '*' ? 'selected' : ''} href="#/">All</a>
          </li>
          <li>
            <a className={filter === 'active' ? 'selected' : ''} href="#/active">Active</a>
          </li>
          <li>
            <a className={filter === 'completed' ? 'selected' : ''} href="#/completed">Completed</a>
          </li>
        </ul>
        <button className="clear-completed" onClick={clearCompletedTodos}>
          Clear completed
        </button>
      </footer>
    )
  }
}

Footer.propTypes = {
  filter: PropTypes.string.isRequired,
  todoCount: PropTypes.number.isRequired,
  clearCompletedTodos: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired
}

export default Footer
