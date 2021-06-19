// withHooks

import React from 'react';
import { View, Text } from 'react-native';
import { ComponentTouchable, ComponentBadge } from 'esoftplay';


export interface OrderMenu_itemProps {
  text: string,
  active: boolean,
  onPress: () => void,
  couter?: number

}


export default function m(props: OrderMenu_itemProps): any {
  return (
    <ComponentTouchable style={{ flex: 1 }} onPress={() => props.onPress()} >
      <View>
        <View style={{ alignItems: 'center' }} >
          <Text allowFontScaling={false} style={{ fontWeight: props.active ? 'bold' : 'normal', fontFamily: "Arial", fontSize: 15, textAlign: "center", color: props.active ? "#6c432c" : "#9b9b9b" }} >{props.text}</Text>
        </View>
        {/* <ComponentBadge counter={props.couter || 0} /> */}
      </View>
    </ComponentTouchable>
  )
}