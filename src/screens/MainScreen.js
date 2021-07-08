import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'

import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'

export const MainScreen = ({ todos, addTodo, openTodo, removeTodo }) => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get('window').width - 2 * THEME.PADDING_HORISONTAL
  )

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

  // const width = Dimensions.get('window').width - 2 * THEME.PADDING_HORISONTAL

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList // Более оптимизированная версия, прогружающая элементы только когда надо
        keyExtractor={item => item.id.toString()} // Ключ должен быть строкой
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onOpen={openTodo} onRemove={removeTodo} />
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
      {/* <ScrollView>
        {todos.map(todo => (
        <Todo todo={todo} key={todo.id} /> // <Text key={todo.id}>{todo.title}</Text>
        ))}
        </ScrollView> 
      */}
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
})
