import React, { useState, useContext } from 'react'
import { View, StyleSheet } from 'react-native'

import { Navbar } from './components/Navbar'
import { ScreenContext } from './context/screen/screenContext'
import { TodoContext } from './context/todo/todoContext'
import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'

import { THEME } from './theme'

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext)

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

  return (
    <View>
      <Navbar />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORISONTAL,
    paddingVertical: 20,
  },
})
