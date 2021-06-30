import React from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'

export const MainScreen = ({ todos, addTodo, removeTodo }) => {
  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      <FlatList // Более оптимизированная версия, прогружающая элементы только когда надо
        keyExtractor={item => item.id.toString()} // Ключ должен быть строкой
        data={todos}
        renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} />}
      />

      {/* <ScrollView>
        {todos.map(todo => (
        <Todo todo={todo} key={todo.id} /> // <Text key={todo.id}>{todo.title}</Text>
        ))}
        </ScrollView> 
      */}
    </View>
  )
}

const styles = StyleSheet.create({})
