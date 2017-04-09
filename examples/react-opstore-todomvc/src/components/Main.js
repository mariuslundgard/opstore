import PropTypes from 'prop-types'
import React, {PureComponent} from 'react'
import TodoItem from './TodoItem'

class Main extends PureComponent {
  handleToggleAll (event) {
    this.props.toggleAllTodos(event.target.checked)
  }

  render () {
    const {destroyTodo, filter, items, toggleTodo, updateTodo} = this.props

    return (
      <section className="main">
        <input
          className="toggle-all"
          id="toggle-all"
          type="checkbox"
          onChange={this.handleToggleAll.bind(this)} />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {items.map((item, idx) => {
            if (filter !== '*' && item.completed === (filter !== 'completed')) {
              return null
            }

            return <TodoItem
              key={idx.toString()}
              index={idx}
              destroyTodo={destroyTodo}
              toggleTodo={toggleTodo}
              updateTodo={updateTodo}
              {...item} />
          })}
        </ul>
      </section>
    )
  }
}

Main.propTypes = {
  destroyTodo: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  toggleAllTodos: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
}

export default Main
