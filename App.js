import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { Navbar } from './src/Navbar'
import { AddTodo } from './src/AddTodo'
import { Todo } from './src/Todo'

export default function App() {
  const [todos, setTodos] = useState([]) // Изменение состояния какого-либо объекта

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

  return (
    <View>
      <Navbar />
      <View style={styles.container}>
        <AddTodo onSubmit={addTodo} />

        <FlatList // Более оптимизированная версия, прогружающая элементы только когда надо
          keyExtractor={item => item.id.toString()} // Ключ должен быть строкой
          data={todos}
          renderItem={({ item }) => <Todo todo={item} />}
        />

        {/* <ScrollView>
          {todos.map(todo => (
            <Todo todo={todo} key={todo.id} /> // <Text key={todo.id}>{todo.title}</Text>
          ))}
        </ScrollView> */}
      </View>
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
