// withHooks

import React from 'react';
import { View, Text } from 'react-native';
import { ComponentHeader, LibScroll, LibStyle, ComponentTouchable, LibNavigation, LibUtils, esp } from 'esoftplay';


export interface UserAddress_labelProps {

}
export default function m(props: UserAddress_labelProps): any {

  const data = LibUtils.getArgs(props, 'data')

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader btnBack title="Label Alamat" />
      <LibScroll>
        {
          data.map((item: any, i: number) => {
            return (
              <ComponentTouchable key={i} onPress={() => {
                LibNavigation.sendBackResult(item)
              }} style={{ padding: 10, flex: 1, backgroundColor: LibStyle.colorLightGrey }}>
                <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 15, color: "#000", marginLeft: 8 }} >{item.label}</Text>
              </ComponentTouchable>
            )
          })
        }
      </LibScroll>
    </View>
  )
}