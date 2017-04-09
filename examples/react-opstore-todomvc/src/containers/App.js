import {connect} from 'react-opstore'
import PropTypes from 'prop-types'
import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import Footer from '../components/Footer'

class App extends React.PureComponent {
  render () {
    const {
      addTodo,
      clearCompletedTodos,
      destroyTodo,
      filter,
      items,
      toggleAllTodos,
      toggleTodo,
      updateTodo,
      setFilter
    } = this.props

    return (
      <div className="todoapp">
        <Header addTodo={addTodo} />
        {items.length > 0 && <Main
          filter={filter}
          items={items}
          destroyTodo={destroyTodo}
          toggleAllTodos={toggleAllTodos}
          toggleTodo={toggleTodo}
          updateTodo={updateTodo} />}
        {items.length > 0 && <Footer
          filter={filter}
          todoCount={items.length}
          clearCompletedTodos={clearCompletedTodos}
          setFilter={setFilter} />}
      </div>
    )
  }
}

App.propTypes = {
  addTodo: PropTypes.func.isRequired,
  clearCompletedTodos: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  updateTodo: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return state.todo
}

const mapStoreToProps = (store) => {
  const ref = store.ref('todo')

  return {
    addTodo (title) {
      ref.lpush('items', {completed: false, title})
    },
    clearCompletedTodos () {
      const items = ref.get('items').filter((item) => !item.completed)
      ref.set('items', items)
    },
    destroyTodo (index) {
      ref.lremi('items', index)
    },
    toggleAllTodos (completed) {
      const items = ref.get('items').map((item) => {
        if (item.completed !== completed)
          return Object.assign({}, item, {completed})
        return item
      })
      ref.set('items', items)
    },
    toggleTodo (index, completed) {
      const items = ref.get('items')
      ref.lset('items', index, Object.assign({}, items[index], {completed}))
    },
    updateTodo (index, title) {
      const items = ref.get('items')
      ref.lset('items', index, Object.assign({}, items[index], {title}))
    },
    setFilter (filter) {
      ref.set('filter', filter)
    }
  }
}

export default connect(mapStateToProps, mapStoreToProps)(App)
