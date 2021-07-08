import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'

import { Navbar } from './components/Navbar'
import { TodoContext } from './context/todo/todoContext'
import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'

import { THEME } from './theme'

export const MainLayout = () => {
  const { todos, addTodo, removeTodo, updateTodo } = useContext(TodoContext) // ?
  //   const [todos, setTodos] = useState([]) // Изменение состояния какого-либо объекта
  const [todoId, setTodoId] = useState(null)

  //   const addTodo = title => {
  //     // const newTodo = {
  //     //   id: Date.now().toString(),
  //     //   title: title
  //     // }

  //     // setTodos(todos.concat([ newTodo]))
  //     // setTodos((prevTodos) => {
  //     //   return [
  //     //     ...prevTodos,
  //     //     newTodo
  //     //   ]
  //     // })

  //     setTodos(prev => [
  //       ...prev,
  //       {
  //         id: Date.now().toString(),
  //         title, // title: title; когда одинаковые значения
  //       },
  //     ])
  //   }

  //   const removeTodo = id => {
  //     const todo = todos.find(t => t.id === id)

  //     Alert.alert(
  //       'Удаление элемента', // Заголовок
  //       `Вы уверены, что хотите удалить ${todo.title}?`, // Сообщение
  //       [
  //         {
  //           text: 'Отмена',
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Удалить',
  //           onPress: () => {
  //             setTodoId(null) // Переходим обратно на главный экран
  //             // Изменяет state todos, оставляя все элементы не равные параметру `id`
  //             setTodos(prev => prev.filter(todo => todo.id !== id))
  //           },
  //         },
  //       ],
  //       { cancelable: false } // При открытом окне и нажатии вне его зоны окно закрываться не будет
  //     )
  //   }

  //   const updateTodo = (id, title) => {
  //     setTodos(prev =>
  //       prev.map(todo => {
  //         // Зная, что в `prev` лежит массив используем метод map
  //         if (todo.id === id) {
  //           //Если id совпадает, меняем title на новый
  //           todo.title = title
  //         }
  //         return todo // На каждой итерации возвращаем todo
  //       })
  //     )
  //   }

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      openTodo={setTodoId} //{id => {setTodoId(id)}}
      removeTodo={removeTodo}
    />
  )

  if (todoId) {
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => setTodoId(null)}
        todo={todos.find(todo => todo.id === todoId)}
        onSave={updateTodo}
      />
    )
  }

  return (
    <View>
      <Navbar />
      <View style={styles.container}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORISONTAL,
    paddingVertical: 20,
  },
})
