// Название файла с маленькой буквы, потому что не JSX компонент
import {
  ADD_TODO,
  UPDATE_TODO,
  REMOVE_TODO,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ERROR,
  CLEAR_ERROR,
  FETCH_TODOS,
} from '../types'

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
  [SHOW_LOADER]: state => ({ ...state, loading: true }),
  [HIDE_LOADER]: state => ({ ...state, loading: false }),
  [SHOW_ERROR]: state => ({ ...state, error: null }),
  [CLEAR_ERROR]: (state, { error }) => ({ ...state, error }),
  [FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),
  DEFAULT: state => state,
}

export const todoReducer = (state, action) => {
  // Выбирает функцию для изменения `state`, в зависимости от переданного параметра `action`
  const handler = handlers[action.type] || handlers.DEFAULT
  return handler(state, action)
}
