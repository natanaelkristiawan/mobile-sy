// withHooks

import React from 'react';
import { View, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { esp, LibStyle, LibNavigation } from 'esoftplay';


export interface ComponentHeaderLog_RegProps {
  btnBack?: boolean,
}

// Login Register
export default function m(props: ComponentHeaderLog_RegProps): any {
  return (
    <ImageBackground resizeMode={"cover"} source={esp.assets('header-logo.png')} style={{ paddingTop: LibStyle.STATUSBAR_HEIGHT, height: LibStyle.width * 0.5 }} >
      {
        props.btnBack &&
        <View style={{ height: 60, padding: 10, flexDirection: 'row' }}>
          <TouchableOpacity activeOpacity={1}  hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }} onPress={() => LibNavigation.back()} >
            <Image style={{ height: 27, width: 27, marginTop: 5 }} source={esp.assets('icons/ic_header_back.png')} />
          </TouchableOpacity>
        </View>
      }
    </ImageBackground>
  )
}