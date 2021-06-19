// withHooks

import React, { useRef } from 'react';
import { View, StatusBar, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { esp, LibStyle, LibNavigation, ComponentBadge, ComponentTouchable, VegetablesIndexProperty, VegetablesIndex, LibStatusbar } from 'esoftplay';
import { Icon } from 'native-base';
import { useSelector } from 'react-redux';


export interface ComponentHeader_homeProps {
  doSearch?: (query: string) => void,
  onChangeText?: (query: string) => void,
  searchPlaceholder?: string,
  title?: string,
  subtitle?: string,
  bgSubtitle?: string,
  cart?: boolean,
  bgColor?: boolean,
  notif?: boolean,
  btnBack?: boolean,
  onPress: () => void
}
export default function m(props: ComponentHeader_homeProps): any {
  const notif = useSelector((state: any) => state.user_notification.data)
  const counter = notif.filter((item: any) => item.status != 2).length
  let inputSearch: any = useRef()
  let query: string = ''
  return (
    <View style={{}} >
      <LibStatusbar style={"light"} />
      <View style={{ height: LibStyle.STATUSBAR_HEIGHT, backgroundColor: LibStyle.colorPrimaryGreen }} />
      <View style={{ flexDirection: 'row', backgroundColor: LibStyle.colorPrimaryGreen, padding: 15, paddingVertical: 10, alignItems: 'center', height: 60 }} >
        {
          props.btnBack &&
          <TouchableOpacity activeOpacity={1} hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }} onPress={() => LibNavigation.back()} >
            <Image style={{ height: 27, width: 27 }} source={esp.assets('icons/ic_header_back.png')} />
          </TouchableOpacity>
          ||
          <TouchableOpacity activeOpacity={1} hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }} onPress={() => {
            VegetablesIndexProperty.setTab(0)
            LibNavigation.backToRoot()
          }} >
            <Image style={{ height: 28, width: 28 }} source={esp.assets('icons/logoputih.png')} />
          </TouchableOpacity>
        }
        <ComponentTouchable style={{ flex: 1 }} onPress={() => props.onPress()}>
          <View style={{ height: 40, borderRadius: 5, flexDirection: 'row', padding: 5, alignItems: 'center', backgroundColor: "#ffffff", borderStyle: "solid", borderWidth: 0.5, borderColor: "#c5c5c5", flex: 1, marginHorizontal: 12 }} >
            <Image style={{ height: 15, width: 15, marginLeft: 6, marginRight: 6 }} source={esp.assets('icons/ic_search.png')} />
            <View style={{ height: 30, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 12, color: "#e5e5e5", marginLeft: 8 }} >Cari...</Text>
            </View>
          </View>
        </ComponentTouchable>
        {
          props.notif ?
            <View />
            :
            <ComponentTouchable onPress={() => {
              VegetablesIndexProperty.isLogin(() => {
                LibNavigation.navigate('user/notification_list')
              })
            }}>
              <View>
                <View style={{ borderRadius: 25, backgroundColor: '#fff', padding: 4 }}>
                  <Image style={{ height: 18, width: 18, resizeMode: 'contain' }} source={esp.assets('icons/ic_notification.png')} />
                  <ComponentBadge counter={counter} />
                </View>
              </View>
            </ComponentTouchable>
        }
      </View>
    </View>
  )
}