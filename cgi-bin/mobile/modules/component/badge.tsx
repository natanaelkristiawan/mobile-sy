// withHooks

import React from 'react';
import { View, Text } from 'react-native';
import { LibStyle } from 'esoftplay';


export interface ComponentBadgeProps {
  counter: number
}
export default function m(props: ComponentBadgeProps): any {
  if (props.counter <= 0) return null
  return (
    <View style={{ position: 'absolute', top: -3, right: -3, height: 15, borderRadius: 10, padding: 5, paddingVertical: 2, backgroundColor: LibStyle.colorRed }} >
      <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 10, letterSpacing: 0, color: "#ffffff" }} >{props.counter}</Text>
    </View>
  )
}