// withHooks

import React from 'react';
import { View, Text } from 'react-native';
import { LibStyle, ComponentTouchable } from 'esoftplay';


export interface UserLocation_itemProps {
  detail: string,
  id: string,
  latitude: string,
  longitude: string,
  par_id: string,
  phone: string,
  postcode: string,
  publish: string,
  title: string,
  type: string,
  onPress: (location: any) => void
}
export default function m(props: UserLocation_itemProps): any {
  return (
    <ComponentTouchable onPress={() => props.onPress(props)} >
      <View style={{ marginVertical: 16, marginHorizontal: 20, width: LibStyle.width, flex: 1 }} >
        <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 13, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: LibStyle.colorBlue }} >{props.title}</Text>
        <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 11, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b", marginTop: 3 }} >{props.detail}</Text>
      </View>
    </ComponentTouchable>
  )
}