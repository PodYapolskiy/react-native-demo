import React, { useState, useContext } from 'react'
import { StyleSheet, View, Button, Dimensions } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'

import { AppCard } from '../components/ui/AppCard'
import { EditModal } from '../components/EditModal'
import { AppTextBold } from '../components/ui/AppTextBold'

import { AppButton } from '../components/ui/AppButton'

import { THEME } from '../theme'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const TodoScreen = () => {
  const { todos, updateTodo, removeTodo } = useContext(TodoContext)
  const { todoId, changeScreen } = useContext(ScreenContext)
  const [modal, setModal] = useState(false)

  const todo = todos.find(t => t.id === todoId)

  const saveHandler = async title => {
    // Дожидается выполнения функции по изменению todo и затем закрывает модальное окно
    await updateTodo(todo.id, title)
    setModal(false)
  }

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
      />

      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton
            color={THEME.GREY_COLOR}
            onPress={() => changeScreen(null)}
          >
            <AntDesign name='back' size={20} />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={() => removeTodo(todo.id)}
          >
            <FontAwesome name='remove' size={20} />
          </AppButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 20,
  },
  button: {
    // Адаптивность
    // width: Dimensions.get('window') > 400 ? 150 : 100
    width: Dimensions.get('window').width / 3, // '40%'
  },
  title: {
    fontSize: 20,
  },
})
