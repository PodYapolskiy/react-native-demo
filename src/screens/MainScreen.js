import React from 'react'
import { StyleSheet, View, FlatList, Image } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'

export const MainScreen = ({ todos, addTodo, openTodo, removeTodo }) => {
  let content = (
    <FlatList // Более оптимизированная версия, прогружающая элементы только когда надо
      keyExtractor={item => item.id.toString()} // Ключ должен быть строкой
      data={todos}
      renderItem={({ item }) => (
        <Todo todo={item} onOpen={openTodo} onRemove={removeTodo} />
      )}
    />
  )

  if (todos.length === 0) {
    content = (
      <View style={styles.image_wrap}>
        <Image style={styles.image} source={require('../../assets/no-items.png')} />
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
