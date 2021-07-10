import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from '../types'

import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [], // [{ id: '1', title: 'Выучить React Native' }],
    loading: false,
    error: null,
  }
  const { changeScreen } = useContext(ScreenContext)
  // Функция dispatch позволяет изменять state
  const [state, dispatch] = useReducer(todoReducer, initialState) // Что-то что лучше чем useState

  const addTodo = async title => {
    const response = await fetch(
      'https://rn-todo-app-22a28-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      }
    )
    const data = await response.json()
    console.log(data.name)
    dispatch({ type: ADD_TODO, title, id: data.name })
  }

  const removeTodo = id => {
    const todo = state.todos.find(t => t.id === id)

    Alert.alert(
      'Удаление элемента', // Заголовок
      `Вы уверены, что хотите удалить ${todo.title}?`, // Сообщение
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Удалить',
          onPress: () => {
            changeScreen(null) // Меняем экран обратно на Main
            dispatch({ type: REMOVE_TODO, id })
          },
        },
      ],
      { cancelable: false } // При открытом окне и нажатии вне его зоны окно закрываться не будет
    )
  }

  const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const hideLoader = () => dispatch({ type: HIDE_LOADER })

  const showError = error => dispatch({ type: SHOW_ERROR, error })

  const clearError = () => dispatch({ type: CLEAR_ERROR })

  const fetchTodos = async () => {
    showLoader() // Показывает знак загрузки
    const response = await fetch(
      'https://rn-todo-app-22a28-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
    const data = await response.json()
    console.log('Fetch Data', data)
    const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))
    dispatch({ type: FETCH_TODOS, todos })
    hideLoader()
  }

  return (
    // Создаём прослойку, в которой будут хранится сами задачи
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
