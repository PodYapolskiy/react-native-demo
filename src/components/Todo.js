import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'

import { AppText } from './ui/AppText'

export const Todo = ({ todo, onOpen, onRemove }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onOpen(todo.id)} //{() => console.log(`Pressed ${todo.id}`)}
      // Используя замыкание и callback функции реализуем ужаление при долгом нажатии
      onLongPress={() => onRemove(todo.id)} // onRemove.bind(null, todo.id)
    >
      <View style={styles.todo}>
        <AppText>{todo.title}</AppText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,

    // Border
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,

    marginBottom: 10,
  },
})
