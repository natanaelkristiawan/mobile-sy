// withHooks

import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { ComponentHeader, LibUtils, esp, LibScroll, ProfileItem, ComponentTouchable, LibNavigation, useSafeState, LibCurl, LibLoading, LibList } from 'esoftplay';
import HTML from 'react-native-render-html';

export interface ProfileDetailsProps {

}
export default function m(props: ProfileDetailsProps): any {
  const title = LibUtils.getArgs(props, 'title')
  const url = LibUtils.getArgs(props, 'url')
  const [result, setResult] = useSafeState<any>("")

  useEffect(() => {
    new LibCurl(url, null, (result, msg) => {
      setResult(result)
    }, (error) => {
    })
  }, [])

  if (result === "") {
    return <LibLoading />
  }

  if (result.length == 1) {
    return (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ComponentHeader title={title} btnBack />
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={{ margin: 15 }}>
            <HTML html={result[0].content} />
          </View>
        </ScrollView>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader title={title} btnBack />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{ margin: 15 }}>
          {
            result && result.length > 0 && result.map((item: any, i: number) => {
              return (
                <View style={{ marginBottom: 10 }} key={i}>
                  <ComponentTouchable onPress={() => {
                    if (item.hasOwnProperty('list') && item.list.length == 0) {

                    } else if (item.hasOwnProperty('list') && item.list.length > 0) {
                      LibNavigation.navigate('profile/details2', { data: item.list })
                    }
                  }}>
                    <ProfileItem title={item.title} subtitle={""} />
                  </ComponentTouchable>
                </View>
              )
            })
          }
        </View>
      </ScrollView>
    </View>
  )
}