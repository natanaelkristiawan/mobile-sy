// withHooks

import React from 'react';
import { View, Image, Linking } from 'react-native';
import { ComponentButton, esp, LibStyle, ComponentTouchable, LibUtils, LibNavigation } from 'esoftplay';


export interface ComponentFooterProps {
  view?: any,
  whatsapp?: string
}
export default function m(props: ComponentFooterProps): any {
  return (
    <View style={{ padding: 10 }}>
      {
        props.view ?
          props.view
          :
          <View style={{ flexDirection: 'row' }}>
            <ComponentTouchable onPress={() => {
              LibNavigation.reset()
              // LibNavigation.navigate('vegetables/index')
            }}>
              <View style={{ paddingLeft: 15, height: 40, borderBottomLeftRadius: 10, borderTopLeftRadius: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingRight: 20, backgroundColor: LibStyle.colorGrey }}>
                <Image style={{ height: 24, width: 24, resizeMode: 'contain' }} source={esp.assets('icons/ic_btm_nav_active_home.png')} />
              </View>
            </ComponentTouchable>
            <View style={{ flex: 1, marginRight: 10, marginLeft: -10 }}>
              <ComponentButton onPress={() => {
                Linking.openURL(props.whatsapp ? props.whatsapp : '')
              }} label="BELI SEKARANG" />
            </View>
          </View>
      }
    </View>
  )
}