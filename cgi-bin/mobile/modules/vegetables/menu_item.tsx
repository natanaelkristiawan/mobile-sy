// withHooks

import React from 'react';
import { View, Text, Image } from 'react-native';
import { esp, ComponentBadge, ComponentTouchable, LibStyle } from 'esoftplay';


export interface VegetablesMenu_itemProps {
  text: string,
  icon: 'home' | 'cart' | 'order' | 'profile',
  active: boolean,
  onPress: () => void,
  couter?: number
}
export default function m(props: VegetablesMenu_itemProps): any {
  let active_icon = 'icons/' + props.icon + '.png'
  let inactive_icon = 'icons/' + props.icon + '-o.png'
  return (
    <ComponentTouchable onPress={() => props.onPress()} >
      <View>
        <View style={{ alignItems: 'center' }} >
          <Image style={{ height: 24, width: 24, resizeMode: 'contain' }} source={esp.assets(props.active ? active_icon : inactive_icon)} />
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 10, textAlign: "center", color: props.active ? LibStyle.colorPrimary : "#888", marginTop: 4 }} >{props.text}</Text>
        </View>
        <ComponentBadge counter={props.couter || 0} />
      </View>
    </ComponentTouchable>
  )
}