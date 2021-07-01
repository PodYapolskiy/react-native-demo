import React from 'react'
import { StyleSheet, View } from 'react-native'

export const AppCard = props => (
  // Добавляем стиль как объект из развёртываемых объектов стилей
  // Стили из `props` будут переписывать уже существующие в default
  <View style={{ ...styles.default, ...props.style }}>{props.children}</View>
)

const styles = StyleSheet.create({
  default: {
    padding: 20,

    // Border
    // borderWidth: 2,
    // borderColor: 'green',

    // Positioning
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // Shadow (Работает только на IOS)
    shadowColor: '#000',
    shadowRadius: 2,
    shadowOpacity: 0.3, // Непрозрачность
    shadowOffset: { width: 2, height: 2 }, // Смещение

    // Shadow
    elevation: 8,

    backgroundColor: '#fff',
    borderRadius: 10,
  },
})
