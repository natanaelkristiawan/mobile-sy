// withHooks

import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { ComponentHeader, LibUtils, useSafeState, LibCurl, esp, LibLoading } from 'esoftplay';
import HTML from 'react-native-render-html';


export interface UserTermsProps {

}
export default function m(props: UserTermsProps): any {

  const [result, setResult] = useSafeState<any>("")

  useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    new LibCurl('term', null, (result, msg) => {
      setResult(result)
    }, (error) => {

    })
  }

  if (result == "") {
    return (
      <LibLoading />
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader title={result.title} btnBack />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{ margin: 15, paddingBottom: 10 }}>
          <HTML html={result.content} />
        </View>
      </ScrollView>
    </View>)
}