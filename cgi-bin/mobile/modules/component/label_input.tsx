// withHooks

import React from 'react';
import { View, Text } from 'react-native';


export interface ComponentLabel_inputProps {
  mandatory?: boolean,
  mandatoryColor?: string,
  label: string,
  labelColor?: string
}
export default function m(props: ComponentLabel_inputProps): any {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: props.labelColor ? props.labelColor : "#9b9b9b", marginTop: 16 }}>{props.label}</Text>
      {props.mandatory && <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: props.mandatoryColor ? props.mandatoryColor : "#d0021b", marginTop: 16 }}> *</Text>}
    </View>
  )
}