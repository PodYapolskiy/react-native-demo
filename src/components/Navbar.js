import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { THEME } from '../theme'

export const Navbar = props => {
  return (
    <View style={styles.navbar}>
      <Text style={styles.text}>Todo app</Text>
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
