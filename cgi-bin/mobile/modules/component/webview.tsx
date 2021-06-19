// withHooks

import React, { useEffect } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview'
import { ComponentHeader, LibUtils, esp, useSafeState } from 'esoftplay';


export interface ComponentWebviewArgs {
  url: string,
  title: string
}
export interface ComponentWebviewProps {

}
export default function m(props: ComponentWebviewProps): any {
  const { url, title } = LibUtils.getArgsAll(props)

  return (
    <View style={{ flex: 1 }} >
      <ComponentHeader btnBack notif title={title} />
      {
        <WebView
          style={{ flex: 1 }}
          allowsFullscreenVideo
          source={{ uri: url }}
        />
      }
    </View>
  )
}