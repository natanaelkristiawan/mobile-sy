// withHooks

import React from 'react';
import { View, Image, Text } from 'react-native';
import { esp } from 'esoftplay';


export interface ComponentNotFoundProps {
  text: string
}
export default function m(props: ComponentNotFoundProps): any {
  return (
    <View style={{ alignItems: 'center', margin: 16, flex: 1, justifyContent: 'center', alignContent: 'center' }} >
      <Image style={{ height: 150, width: 150 }} source={esp.assets('logo.png')} />
      <Text allowFontScaling={false} style={{ marginTop: 10, fontFamily: "Arial", fontSize: 10, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: "#c8c8c8" }} >{props.text || 'No more product'}</Text>
    </View>)
}