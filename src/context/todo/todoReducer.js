// Название файла с маленькой буквы, потому что не JSX компонент
import { ADD_TODO, UPDATE_TODO, REMOVE_TODO } from '../types'

const handlers = {
  // Возвращаем объекты
  // Квадратные скобки - обращение к константе
  // Обязательно не изменяем уже существующий оюъект, а создаём ссылку на новый
  [ADD_TODO]: (state, { title }) => ({
    ...state, // Разворачиваем нынешний state
    todos: [
      // Изменяем поле todos
      ...state.todos,
      {
        id: Date.now().toString(),
        title,
      },
    ],
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
  }),
  [UPDATE_TODO]: (state, { title, id }) => ({
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id === id) {
        todo.title = title
      }
      return todo
    }),
  }),
  DEFAULT: state => state,
}

// ? Какой-то Reducer
export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
