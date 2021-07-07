import React from 'react'
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  Platform,
} from 'react-native'

import { AppTextBold } from './ui/AppTextBold'

import { THEME } from '../theme'

export const Navbar = props => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          // Выбираем какая платформа и какой стиль применить для неё
          ios: styles.navbarIos,
          android: styles.navbarAndroid,
        }),
      }}
    >
      <AppTextBold style={styles.text}>Todo app</AppTextBold>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navbarIos: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 1,
  },
  text: {
    color: Platform.OS === 'ios' ? THEME.MAIN_COLOR : '#fff', // В зависимости от платформы будет меняться цвет текста в навбаре
    fontSize: 20,
  },
})
