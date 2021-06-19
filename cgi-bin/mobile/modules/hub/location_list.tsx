// withHooks

import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ComponentHeader, esp, LibList, LibLoading, LibStyle, LibTextstyle, LibUtils, UseCurl, useSafeState } from 'esoftplay';


export interface HubLocation_listArgs {
  title: string,
  url: string
}
export interface HubLocation_listProps {

}
export default function m(props: HubLocation_listProps): any {

  const { title, url } = LibUtils.getArgsAll(props)
  const [curl, loading, error] = UseCurl()
  const [data, setData] = useSafeState<any>()

  useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    curl(url, null, (res) => {
      setData(res)
    })
  }

  return (
    <View style={{ flex: 1 }} >
      <ComponentHeader title={title} btnBack />
      <LibList
        data={data}
        renderItem={(item: any, i: number) => {
          return (
            <View key={i}
              style={{ marginHorizontal: 17, alignItems: "center", flexDirection: "row", marginVertical: 10, borderRadius: 6, paddingHorizontal: 17, paddingVertical: 10, backgroundColor: "white", ...LibStyle.elevation(2) }} >
              <View style={{ flex: 1 }} >
                <LibTextstyle
                  style={{ fontWeight: "bold" }}
                  textStyle="callout" text={item.title} />
                <LibTextstyle
                  style={{ marginTop: 10 }}
                  numberOfLines={3}
                  ellipsizeMode={"tail"}
                  textStyle="caption1" text={item.detail} />
              </View>
            </View>
          )
        }}
        ListEmptyComponent={
          loading ? <LibLoading /> :
            <View style={{ flex: 1, marginTop: LibStyle.height * 0.3, justifyContent: 'center', alignItems: 'center' }} >
              <LibTextstyle text={error} textStyle="body" style={{ textAlign: 'center' }} />
            </View>
        }
      />
    </View>
  )
}