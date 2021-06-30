import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

export default function App() {
  const [todos, setTodos] = useState([]) // Изменение состояния какого-либо объекта
  const [todoId, setTodoId] = useState(null)

  const addTodo = title => {
    // const newTodo = {
    //   id: Date.now().toString(),
    //   title: title
    // }

    // setTodos(todos.concat([ newTodo]))
    // setTodos((prevTodos) => {
    //   return [
    //     ...prevTodos,
    //     newTodo
    //   ]
    // })

    setTodos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        title, // title: title; когда одинаковые значения
      },
    ])
  }

  const removeTodo = id => {
    // Изменяет state todos, оставляя все элементы не равные параметру `id`
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  let content = (
    <MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} />
  )

  if (todoId) {
    content = <TodoScreen />
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
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
})

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,  // Занимает всю доступную высоту экрана
//     flexDirection: 'column',  // Выравнивания ниже зависят от этого
//     backgroundColor: '#000',
//     alignItems: 'flex-end',  // Выравнивание по горизонтали
//     justifyContent: 'center',  // Выравнивание по вертикали
//   },
//   text: {
//     color: '#fff',
//     fontSize: 26
//   }
// });
