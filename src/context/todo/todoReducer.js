// Название файла с маленькой буквы, потому что не JSX компонент
import { ADD_TODO, UPDATE_TODO, REMOVE_TODO } from '../types'

// ? Какой-то Reducer
export const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      // Обязательно не изменяем уже существующий оюъект, а создаём ссылку на новый
      return {
        ...state, // Разворачиваем нынешний state
        todos: [
          // Изменяем поле todos
          ...state.todos,
          {
            id: Date.now().toString(),
            title: action.title,
          },
        ],
      }

    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      }

    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id === action.id) {
            todo.title = action.title
          }
          return todo
        }),
      }
    default:
      return state
  }
}
