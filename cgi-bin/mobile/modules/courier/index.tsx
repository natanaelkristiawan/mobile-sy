// withHooks

import React, { useEffect } from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { ComponentHeader, LibScroll, LibTextstyle, esp, VegetablesMenu_item, LibNavigation, LibStyle, UseCurl, useSafeState, LibLoading, LibUtils, CourierListProps, LibList, HubListArgs, CourierListArgs, ComponentEmpty, UserNotification } from 'esoftplay';


export interface CourierIndexProps {

}
export default function m(props: CourierIndexProps): any {

  const [curl, loading, error] = UseCurl()
  const [result, setResult] = useSafeState<any>()
  const menuWidth = (LibStyle.width - 50) / 4

  useEffect(() => {
    loadData()
    UserNotification.user_notification_loadData()
  }, [])

  function loadData() {
    curl('main_courier', null, (res) => {
      setResult(res)
    }, 1)
  }

  if (loading) {
    return <LibLoading />
  }

  return (
    <View style={{ flex: 1 }} >
      <ComponentHeader title={"COURIER: " + String(result?.profile?.name || "").toUpperCase()} />
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
                if (item.type == "menu") {
                  return (
                    <View key={i} >
                      <LibTextstyle textStyle='footnote' text={item.title} style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
                      <LibList
                        data={item.list}
                        numColumns={4}
                        style={{ marginHorizontal: 17 }}
                        renderItem={(item2: any, i2: number) => (
                          <TouchableOpacity key={i2} activeOpacity={1} onPress={() => { LibNavigation.navigate<CourierListArgs>("courier/list", { url: item2.url, title: item2.title, list: item.list, id: item2.id, index: i2 }) }} style={{ width: menuWidth, alignItems: 'center', marginBottom: 10 }} >
                            <Image style={{ height: 40, width: 40, marginBottom: 8 }} source={esp.assets('icon.png')} />
                            <LibTextstyle textStyle="caption1" text={item2.title} style={{ textAlign: "center", color: "#888" }} />
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  )
                } else {
                  return null
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