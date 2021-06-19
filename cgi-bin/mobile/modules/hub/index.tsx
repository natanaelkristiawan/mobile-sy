// withHooks

import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { esp, LibStyle, LibTextstyle, LibScroll, LibIcon, LibNavigation, ComponentHeader, VegetablesMenu_item, useSafeState, LibCurl, LibUtils, LibLoading, VegetablesIndexProperty, UserNotification, UseCurl, LibList, ComponentEmpty } from 'esoftplay';
import { HubListArgs } from './list';


export interface HubIndexProps {

}
export default function m(props: HubIndexProps): any {

  const { url } = LibUtils.getArgsAll(props)
  const [curl, loading, error] = UseCurl()
  const [result, setResult] = useSafeState<any>()
  const menuWidth = (LibStyle.width - 50) / 4

  useEffect(() => {
    loadData()
    UserNotification.user_notification_loadData()
  }, [])

  function loadData() {
    curl("main_hub", null, (res) => {
      setResult(res)
    }, 1)
  }

  if (loading) {
    return <LibLoading />
  }

  return (
    <View style={{ flex: 1 }} >
      <ComponentHeader title={"HUB: " + String(result?.profile?.name || "").toUpperCase()} />
      {
        error ?
          <LibScroll>
            <></>
            <View style={{ flex: 1, marginTop: LibStyle.height * 0.3, justifyContent: 'center', alignItems: 'center' }} >
              <LibTextstyle text={error} textStyle="body" style={{ textAlign: 'center' }} />
            </View>
          </LibScroll>
          :
          <LibScroll onRefresh={() => {
            loadData()
            UserNotification.user_notification_loadData()
          }} >
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
                        <View style={{ height: 40, width: 1, borderRadius: 0, marginHorizontal: 17, backgroundColor: "#f4f4f4" }} />
                        <View style={{ flex: 1 }} >
                          <LibTextstyle textStyle="title2" text={LibUtils.money(item.list.commision)} style={{ fontWeight: "bold", color: "#333" }} />
                          <LibTextstyle textStyle="footnote" text="Komisi" style={{ color: "#888" }} />
                        </View>
                      </View>
                    </View>
                  )
                }
                else if (item.type == "menu") {
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
                }
                else if (item.type == "link") {
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