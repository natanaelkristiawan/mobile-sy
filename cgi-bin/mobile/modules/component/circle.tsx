// withHooks

import React from 'react';
import { View, Image, Text } from 'react-native';
import { esp, ComponentTouchable } from 'esoftplay';


export interface ComponentCircleProps {
  image: string
  color: string
  title: string
  onPress: () => void
}
export default function m(props: ComponentCircleProps): any {
  return (
    <View style={{ flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
      <ComponentTouchable onPress={() => props.onPress()}>
        <View style={{ alignContent: 'center', alignItems: 'center', justifyContent: 'center', borderRadius: 30, width: 50, height: 50, backgroundColor: props.color }} >
          <Image source={esp.assets(props.image)} style={{ width: 25.8, height: 29, resizeMode: 'contain' }} />
        </View>
      </ComponentTouchable>
      <Text allowFontScaling={false} style={{ marginTop: 10, fontFamily: "Arial", fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: "#4a4a4a" }}>{props.title}</Text>
    </View>
  )
}