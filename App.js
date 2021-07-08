import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'
import { THEME } from './src/theme'

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

  const [todos, setTodos] = useState([
    { id: '1', title: 'Выучить React Native' },
  ]) // Изменение состояния какого-либо объекта
  const [todoId, setTodoId] = useState(null)

  if (!isReady) {
    // Пока не будут отрисованы шрифты, будет выполняться данный код
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }

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

  const updateTodo = (id, title) => {
    setTodos(prev =>
      prev.map(todo => {
        // Зная, что в `prev` лежит массив используем метод map
        if (todo.id === id) {
          //Если id совпадает, меняем title на новый
          todo.title = title
        }
        return todo // На каждой итерации возвращаем todo
      })
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
