// withHooks

import React from 'react';
import { View, Text, Image } from 'react-native';
import { esp, ComponentTouchable, LibStyle } from 'esoftplay'

export interface ComponentButtonProps {
  icon?: string,
  label: string,
  style?: any,
  fontColor?: string,
  borderColor?: string,
  backgroundColor?: string,
  onPress: () => void
}
export default function m(props: ComponentButtonProps): any {
  return (
    <View>
      <ComponentTouchable onPress={() => props.onPress()}>
        {
          props.icon ?
            <View style={[{ borderWidth: 1, borderColor: props.borderColor ? props.borderColor : 'rgba(0, 0, 0, 0)', height: 40, borderRadius: 5, backgroundColor: props.backgroundColor || LibStyle.colorPrimaryGreen, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 9 }, props.style]} >
              <Image source={esp.assets(props.icon)} style={{ width: 18, height: 18, resizeMode: 'contain' }} />
              <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 14, textAlign: "center", textAlignVertical: 'center', color: 'white', flex: 1, marginRight: 30, marginLeft: 10 }} >{props.label}</Text>
            </View>
            :
            <View style={[{ borderWidth: 1, borderColor: props.borderColor ? props.borderColor : 'rgba(0, 0, 0, 0)', height: 40, borderRadius: 5, backgroundColor: props.backgroundColor || LibStyle.colorPrimaryGreen, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 9 }, props.style]} >
              <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 14, textAlign: "center", textAlignVertical: 'center', color: props.fontColor ? props.fontColor : 'white', marginRight: 10, marginLeft: 10 }} >{props.label}</Text>
            </View>
        }
      </ComponentTouchable>
    </View>
  )
}