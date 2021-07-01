import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, FlatList, Alert } from 'react-native'
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

export default function App() {
  const [todos, setTodos] = useState([
    { id: '1', title: 'Выучить React Native' },
    { id: '2', title: 'Выучить React' },
  ]) // Изменение состояния какого-либо объекта
  const [todoId, setTodoId] = useState('1')

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
    const todo = todos.find(t => t.id === id)

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
            setTodoId(null) // Переходим обратно на главный экран
            // Изменяет state todos, оставляя все элементы не равные параметру `id`
            setTodos(prev => prev.filter(todo => todo.id !== id))
          },
        },
      ],
      { cancelable: false } // При открытом окне и нажатии вне его зоны окно закрываться не будет
    )
  }

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
