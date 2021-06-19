// withHooks

import React from 'react';
// import TouchableScale from 'react-native-touchable-scale';
import { TouchableOpacity } from 'react-native';

export interface ComponentTouchableProps {
  onPress: () => void,
  style?: any,
  children: any
}
export default function m(props: ComponentTouchableProps): any {
  return (
    <TouchableOpacity activeOpacity={1}  hitSlop={{ top: 7, left: 7, right: 7, bottom: 7 }} style={props.style} onPress={props.onPress} >
      {props.children}
    </TouchableOpacity>
  )
}