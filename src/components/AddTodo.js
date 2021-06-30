import React, { useState } from 'react'
import { StyleSheet, TextInput, Button, View, Alert } from 'react-native'

import { THEME } from '../theme'

export const AddTodo = props => {
  const [value, setValue] = useState('')

  const pressHandler = () => {
    // Если пустой инпут
    if (value.trim()) {
      props.onSubmit(value)
      setValue('')
    } else {
      Alert.alert('Название дела не может быть пустым')
    }
  }

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setValue} // {text => setValue(text)}
        value={value}
        placeholder='Введите название дела...'
        autoCorrect={false} // Убирает исправления Т9
        autoCapitalize='none' // Убирает автоматическую капитализацию
      />
      <Button title='Добавить' onPress={pressHandler} />
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    width: '70%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR,
  },
})
