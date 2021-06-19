// withHooks

import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { VegetablesMenu_item, LibNavigation, LibStyle, LibScroll, ComponentHeader, LibTextstyle, esp, LibIcon, useSafeState, UseCurl, LibLoading, LibUtils, HubListArgs, LibList, ComponentEmpty, UserNotification } from 'esoftplay';


export interface DispatcherIndexArgs {

}
export interface DispatcherIndexProps {

}
export default function m(props: DispatcherIndexProps): any {

  const [curl, loading, error] = UseCurl()
  const [result, setResult] = useSafeState<any>()
  const menuWidth = (LibStyle.width - 50) / 4

  useEffect(() => {
    loadData()
    UserNotification.user_notification_loadData()
  }, [])

  function loadData() {
    curl('main_dispatcher', null, (res) => {
      setResult(res)
    }, 1)
  }

  if (loading) {
    return <LibLoading />
  }

  return (
    <View style={{ flex: 1 }} >
      <ComponentHeader title={"DISPATCHER: " + String(result?.profile?.name || "").toUpperCase()} />
      {
        error ?
          <LibScroll>
            <></>
            <View style={{ flex: 1, marginTop: LibStyle.height * 0.3, justifyContent: 'center', alignItems: 'center' }} >
              <LibTextstyle text={error} textStyle="body" style={{ textAlign: 'center' }} />
            </View>
          </LibScroll>
          :
          <LibScroll onRefresh={loadData} >
            {
              LibUtils.checkUndefined(result, "blocks") && result.blocks.map((item: any, i: number) => {
                if (item.type == "column" && item.list != null && typeof (item.list) != "string") {
                  return (
                    <View key={i} >
                      <LibTextstyle textStyle='footnote' text={item.title} style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
                      <View style={{ marginHorizontal: 17, alignItems: "center", flexDirection: "row", borderRadius: 6, paddingHorizontal: 17, paddingVertical: 10, backgroundColor: "white", borderWidth: 1, borderColor: "#f4f4f4" }} >
                        <View>
                          <LibTextstyle textStyle="title2" text={LibUtils.number(item.list.total)} style={{ fontWeight: "bold", color: "#333" }} />
                          <LibTextstyle textStyle="footnote" text="Total Pengiriman" style={{ color: "#888" }} />
                        </View>
                      </View>
                    </View>
                  )
                } else if (item.type == "menu") {
                  return (
                    <View key={i} >
                      <LibTextstyle textStyle='footnote' text={item.title} style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
                      <LibList
                        data={item.list}
                        numColumns={4}
                        style={{ marginHorizontal: 17 }}
                        renderItem={(item2: any, i2: number) => (
                          <TouchableOpacity key={i2} activeOpacity={1} onPress={() => { LibNavigation.navigate<HubListArgs>("hub/list", { url: item2.url, title: item2.title, list: item.list, id: item2.id, index: i2 }) }} style={{ width: menuWidth, alignItems: 'center', marginBottom: 10 }} >
                            <Image style={{ height: 40, width: 40, marginBottom: 8 }} source={esp.assets('icon.png')} />
                            <LibTextstyle textStyle="caption1" text={item2.title} style={{ textAlign: "center", color: "#888" }} />
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  )
                } else if (item.type == "link") {
                  return (
                    <View key={i} >
                      <LibTextstyle textStyle='footnote' text={item.title} style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
                      <TouchableOpacity onPress={() => {
                        LibNavigation.navigate(item.module, { title: item.title, url: item.url })
                      }} activeOpacity={1} style={{ marginHorizontal: 17, alignItems: "center", flexDirection: "row", marginBottom: 10, borderRadius: 6, paddingHorizontal: 17, paddingVertical: 12, backgroundColor: "white", ...LibStyle.elevation(2) }} >
                        <LibTextstyle textStyle="body" text={item.intro} style={{ flex: 1 }} />
                        <LibIcon.SimpleLineIcons name="arrow-right" size={15} color={LibStyle.colorPrimary} />
                      </TouchableOpacity>
                    </View>
                  )
                }
              })
            }
          </LibScroll>
      }

      <View style={[{ flexDirection: 'row', height: 50, justifyContent: 'flex-end', paddingHorizontal: 20, backgroundColor: 'white', alignItems: 'center' }, LibStyle.elevation(4)]} >
        <VegetablesMenu_item onPress={() => {
          LibNavigation.navigate("profile/index")
        }} text={"Profile"} icon={'profile'} active />
      </View>
    </View>
  )
}