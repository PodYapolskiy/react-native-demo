import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import { MainLayout } from './src/MainLayout'
import { TodoState } from './src/context/todo/TodoState'

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

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

  return (
    <TodoState>
      <MainLayout />
    </TodoState>
  )
}

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
