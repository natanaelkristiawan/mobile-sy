// withHooks

import React from 'react';
import { View, Text } from 'react-native';
import { LibIcon, LibStyle, ComponentTouchable, LibUtils } from 'esoftplay';


export interface ProfileItemProps {
  title: string,
  subtitle?: string,
  noIconRight?: boolean
}
export default function m(props: ProfileItemProps): any {
  return (
    <View style={[{ flex: 1, backgroundColor: '#F4F4F4', padding: 10, flexDirection: 'row', justifyContent: "space-between", alignItems:'center', borderRadius: 5 }, LibStyle.elevation(3)]}>
      {
        props.subtitle ?
          <View>
            <Text allowFontScaling={false} ellipsizeMode={"tail"} numberOfLines={1} style={{ fontFamily: "Arial", fontSize: 15, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0.12, color: "#24253d" }}>{LibUtils.ucwords(props?.title)}</Text>
            <Text allowFontScaling={false} ellipsizeMode={"tail"} numberOfLines={1} style={{ fontFamily: "Arial", marginTop: 3, fontSize: 13, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0.12, color: "#24253d" }}>{props?.subtitle}</Text>
          </View>
          :
          <View>
            <Text allowFontScaling={false} ellipsizeMode={"tail"} numberOfLines={1} style={{ fontFamily: "Arial", fontSize: 15, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0.12, color: "#24253d" }}>{LibUtils.ucwords(props?.title)}</Text>
          </View>
      }
      {
        !props.noIconRight &&
        <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
          <LibIcon name="chevron-right-circle" />
        </View>
      }
    </View>
  )
}