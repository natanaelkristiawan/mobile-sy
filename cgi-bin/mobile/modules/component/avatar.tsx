// withHooks

import React from 'react';
import { View, Image } from 'react-native';
import { LibPicture } from 'esoftplay';


export interface ComponentAvatarProps {
  uri: string,
  style?: any,
  borderColor?: string
}
export default function m(props: ComponentAvatarProps): any {
  return (
    <View style={[{ height: 100, width: 100, borderRadius: 50, overflow: 'hidden', backgroundColor: 'FDC403', borderColor: props.borderColor ? props.borderColor : 'white', borderWidth: 5 }, props.style]} >
      <LibPicture source={{ uri: props.uri }} style={{ height: 100, width: 100, borderRadius: 50, resizeMode: 'cover' }} />
    </View>
  )
}
