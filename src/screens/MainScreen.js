import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'

import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { AppLoader } from '../components/ui/AppLoader'
import { AppText } from '../components/ui/AppText'
import { AppButton } from '../components/ui/AppButton'
import { ScreenContext } from '../context/screen/screenContext'
import { TodoContext } from '../context/todo/todoContext'
import { THEME } from '../theme'

export const MainScreen = () => {
  const { addTodo, todos, removeTodo, fetchTodos, loading, error } =
    useContext(TodoContext)
  const { changeScreen } = useContext(ScreenContext)
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - 2 * THEME.PADDING_HORISONTAL
  )

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

  useEffect(() => {
    loadTodos()
  }, [])

  // Вызывается только раз при инициализации объекта
  useEffect(() => {
    const update = () => {
      // Высчитывает ширину в зависимости от её нового значения
      const width =
        Dimensions.get('window').width - 2 * THEME.PADDING_HORISONTAL
      setDeviceWidth(width)
    }

    Dimensions.addEventListener('change', update)

    // Когда происходит дейстрой компонента удаляем событие 'change' и функцию 'update'
    return () => {
      Dimensions.removeEventListener('change', update)
    }
  })

  if (loading) {
    return <AppLoader />
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Повторить</AppButton>
      </View>
    )
  }

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList // Более оптимизированная версия, прогружающая элементы только когда надо
        keyExtractor={item => item.id.toString()} // Ключ должен быть строкой
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onOpen={changeScreen} onRemove={removeTodo} />
        )}
      />
    </View>
  )

  if (todos.length === 0) {
    content = (
      <View style={styles.image_wrap}>
        <Image
          style={styles.image}
          source={require('../../assets/no-items.png')}
        />
        {/* <Image style={styles.image} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' }} /> */}
      </View>
    )
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  image_wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
  },
})
