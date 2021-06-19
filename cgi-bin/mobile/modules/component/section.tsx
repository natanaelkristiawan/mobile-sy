// withHooks

import React from 'react';
import { View, Text } from 'react-native';
import { ComponentTouchable, LibTextstyle, LibStyle } from 'esoftplay';

export interface ComponentSectionProps {
  text: string,
  textColor: string,
  caption?: string,
  icon?: string,
  moreAction?: () => void
}
export default function m(props: ComponentSectionProps): any {
  return (
    <View style={{ flexDirection: 'row', marginTop: 18, marginHorizontal: 17, alignItems: 'center' }} >
      <View style={{ flex: 1 }} >
        <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 15, lineHeight: 22, color: props.textColor }} >{props.text}</Text>
        {props.caption && <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 10, color: "#b8b8b8" }} >{props.caption}</Text>}
      </View>
      {
        props.icon &&
        <ComponentTouchable onPress={() => props.moreAction ? props.moreAction() : {}} >
          <LibTextstyle text="Lihat Semua" textStyle="caption2" style={{ color: LibStyle.colorPrimaryGreen, fontWeight: 'bold' }} />
        </ComponentTouchable>
      }
    </View>
  )
}