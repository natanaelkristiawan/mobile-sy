// withHooks

import React from 'react';
import { View, Text } from 'react-native';
import { ComponentTouchable, LibIcon, LibStyle } from 'esoftplay';


export interface ComponentInput_touchableProps {
  text?: string
  placeholder?: string
  iconName?: string
  iconShow?: boolean
  iconColor?: any
  onPress: () => void
}
export default function m(props: ComponentInput_touchableProps): any {
  return (
    <ComponentTouchable style={{ flex: 1, borderRadius: 5, padding: 2, marginTop: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: "#ffffff", borderStyle: "solid", borderWidth: 0.5, borderColor: "#9e9e9e" }} onPress={() => { props.onPress() }}>
      <View style={{ height: 30, justifyContent: 'center', alignContent: 'center', flex: 1 }}>
        {
          props.text ?
            <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 13, color: LibStyle.colorTextPrimary, marginLeft: 8 }} >{props.text}</Text>
            :
            <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 12, color: "#e5e5e5", marginLeft: 8 }} >{props.placeholder}</Text>
        }
      </View>
      {
        props.iconShow &&
        <View style={{ width: 39, height: 35, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }}>
          <LibIcon name={"chevron-right"} color={props.iconColor || LibStyle.colorPrimaryGreen} size={20} />
        </View>
      }
    </ComponentTouchable>
  )
}