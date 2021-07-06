import React from 'react'
import { StyleSheet, View } from 'react-native'

import { AppTextBold } from './ui/AppTextBold'

import { THEME } from '../theme'

export const Navbar = props => {
  return (
    <View style={styles.navbar}>
      <AppTextBold style={styles.text}>Todo app</AppTextBold>
    </View>
  )
}

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: THEME.MAIN_COLOR,
    paddingBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
})
