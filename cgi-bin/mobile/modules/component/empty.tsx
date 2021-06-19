// withHooks

import React from 'react';
import { View, Text, Alert } from 'react-native';
import { LibStyle, LibPicture, ComponentButton, esp } from 'esoftplay';


export interface ComponentEmptyProps {
  text: string
  onPress: () => void
  label: string
}
export default function m(props: ComponentEmptyProps): any {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
      <LibPicture source={esp.assets("logo.png")} resizeMode="contain" style={{ height: 300, width: 300, marginTop: 40 }} />
      <Text allowFontScaling={false} style={{ marginTop: 0, fontFamily: "ArialBold", fontSize: 17, fontWeight: "600", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: LibStyle.colorPrimaryGreen, alignSelf: 'center', textAlign: 'center' }} >{props.text}</Text>
      <View style={{ marginTop: 20, marginLeft: 50, marginRight: 50 }}>
        <ComponentButton label={props.label}
          backgroundColor={LibStyle.colorGrey} borderColor={LibStyle.colorPrimaryGreen} fontColor={LibStyle.colorPrimaryGreen}
          onPress={() => {
            props.onPress()
          }}
        />
      </View>
    </View>)
}