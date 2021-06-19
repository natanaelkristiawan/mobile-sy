// withHooks

import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { ComponentHeader, LibUtils, useSafeState, LibCurl, esp, LibLoading } from 'esoftplay';
import HTML from 'react-native-render-html';

export interface ProfileDetails2Props {

}
export default function m(props: ProfileDetails2Props): any {
  const data = LibUtils.getArgs(props, 'data')

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader title={data[0].title} btnBack />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{ margin: 15 }}>
          <HTML html={data[0].content} />
        </View>
      </ScrollView>
    </View>
  )
}