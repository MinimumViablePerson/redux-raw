import { createStore, combineReducers } from 'redux'

// Input:
// state = current state held by redux
// action = { type: 'SOME_TYPE', payload?: 123 }

// Output:
// New state
const countReducer = (
  count = 0,
  action = { type: 'SOME_TYPE', payload: 0 }
) => {
  switch (action.type) {
    case 'UP':
      return count + 1
    case 'DOWN':
      return count > 0 ? count - 1 : count
    case 'RESET':
      return 0
    case 'UP_BY_X':
      return count + action.payload
    default:
      return count
  }
}

const todosReducer = (todos = [], action = { type: '', payload: [] }) => {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo = {
        title: action.payload,
        completed: false
      }
      return [...todos, newTodo]
    case 'REMOVE_TODO':
      return todos.filter(todo => todo.title !== action.payload)
    default:
      return todos
  }
}

const rootReducer = combineReducers({
  count: countReducer,
  todos: todosReducer
})

const store = createStore(rootReducer)

store.subscribe(() => {
  console.log(store.getState())
  const state = store.getState()
  displayEl.textContent = state.count
})

const displayEl = document.querySelector('.display')
const upBtn = document.querySelector('.up-btn')
const downBtn = document.querySelector('.down-btn')
const resetBtn = document.querySelector('.reset-btn')
const upBy10Btn = document.querySelector('.upBy10-btn')
const upBy150Btn = document.querySelector('.upBy150-btn')

upBy10Btn.addEventListener('click', () => {
  store.dispatch({ type: 'UP_BY_X', payload: 10 })
})

upBy150Btn.addEventListener('click', () => {
  store.dispatch({ type: 'UP_BY_X', payload: 150 })
})

upBtn.addEventListener('click', () => {
  store.dispatch({ type: 'UP' })
})

downBtn.addEventListener('click', () => {
  store.dispatch({ type: 'DOWN' })
})

resetBtn.addEventListener('click', () => {
  store.dispatch({ type: 'RESET' })
})

// Redux is:
// createStore(reducer)
// store.getState()
// store.dispatch({ type: "WHAT_TO_DO" })
// store.subscribe(() => {})

store.dispatch({ type: 'ADD_TODO', payload: 'Buy milk' })
store.dispatch({ type: 'ADD_TODO', payload: 'Cook dinner' })
store.dispatch({ type: 'ADD_TODO', payload: 'Sleep well' })
store.dispatch({ type: 'ADD_TODO', payload: 'Learn Redux' })

store.dispatch({ type: 'REMOVE_TODO', payload: 'Sleep well' })
store.dispatch({ type: 'REMOVE_TODO', payload: 'Cook dinner' })
