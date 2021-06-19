// withHooks

import React, { useRef } from 'react';
import { View, StatusBar, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { esp, LibStyle, LibNavigation, ComponentBadge, ComponentTouchable, ComponentButton, VegetablesIndexProperty, LibStatusbar } from 'esoftplay';
import { useSelector } from 'react-redux';


export interface ComponentHeaderProps {
  doSearch?: (query: string) => void,
  onChangeText?: (query: string) => void,
  onBack?: () => void,
  searchPlaceholder?: string,
  title?: string,
  subtitle?: string,
  bgSubtitle?: string,
  cart?: boolean,
  bgColor?: boolean,
  notif?: boolean,
  btnBack?: boolean,
  btnGoHome?: boolean,
  onPressMore?: () => void,
  customRight?: () => any,
  rightView?: boolean
  onPressRight?: () => void,
}

export default function m(props: ComponentHeaderProps): any {
  const notif = useSelector((state: any) => state.user_notification.data)
  const counter = notif.filter((item: any) => item.status != 2).length
  let inputSearch: any = useRef(null)
  let query: string = ''

  return (
    <View style={{}} >
      <LibStatusbar style={"light"} />
      <View style={{ height: LibStyle.STATUSBAR_HEIGHT, backgroundColor: LibStyle.colorPrimaryGreen }} />
      <View style={{ flexDirection: 'row', backgroundColor: LibStyle.colorPrimaryGreen, padding: 15, paddingVertical: 10, alignItems: 'center', height: 60 }} >
        {
          props.btnBack &&
          <TouchableOpacity activeOpacity={1} hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }} onPress={() => {
            LibNavigation.back()
            props.onBack && props.onBack()
          }} >
            <Image style={{ height: 27, width: 27 }} source={esp.assets('icons/ic_header_back.png')} />
          </TouchableOpacity>
          ||
          !props.btnGoHome && <TouchableOpacity activeOpacity={1} hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }} onPress={() => {
            VegetablesIndexProperty.setTab(0)
            LibNavigation.backToRoot()
          }} >
            <Image style={{ height: 28, width: 28 }} source={esp.assets('icons/logoputih.png')} />
          </TouchableOpacity>
        }
        {
          props.btnGoHome &&
          <TouchableOpacity activeOpacity={1} hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }} onPress={() => {
            LibNavigation.reset()
            VegetablesIndexProperty.setTab(0)
          }} >
            <Image style={{ height: 27, width: 27 }} source={esp.assets('icons/ic_header_back.png')} />
          </TouchableOpacity>
        }
        {
          props.doSearch || props.onChangeText ?
            <View style={{ marginLeft: 15, borderRadius: 5, flexDirection: 'row', padding: 5, alignItems: 'center', backgroundColor: "#ffffff", borderStyle: "solid", borderWidth: 0.5, borderColor: "#c5c5c5", flex: 1, marginHorizontal: 12 }} >
              <Image style={{ height: 15, width: 15, marginLeft: 6, marginRight: 6 }} source={esp.assets('icons/ic_search.png')} />
              <TextInput
                // autoFocus
                ref={r => inputSearch = r}
                style={{ minHeight: 30, fontFamily: "ArialBold", fontSize: 11, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, flex: 1 }}
                placeholder={props.searchPlaceholder || 'Cari Produk'}
                onChangeText={(t) => props.onChangeText && props.onChangeText(query = t)}
                returnKeyType={'search'}
                returnKeyLabel={'Search'}
                placeholderTextColor={'#e5e5e5'}
                onSubmitEditing={() => props.doSearch && props.doSearch(query)}
              />
            </View>
            :
            <View style={{ marginHorizontal: 12, flex: 1 }} >
              <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 14, fontStyle: "normal", letterSpacing: 0, color: "#fff" }} numberOfLines={1} >{props.title}</Text>
              {props.subtitle && <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 12, letterSpacing: 0, color: props.bgSubtitle ? props.bgSubtitle : "#e5e5e5", marginTop: 3 }} >{props.subtitle}</Text>}
            </View>
        }

        {
          props.rightView &&
          <View style={{ flex: 1 }}>
            <ComponentButton style={{ width: LibStyle.width * 0.3, alignSelf: 'flex-end' }} label="Tambah" borderColor="#fff" onPress={() => { props.onPressRight && props.onPressRight() }} />
          </View>
        }
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
                <View style={{ marginLeft: 5, borderRadius: 25, backgroundColor: '#fff', padding: 4 }}>
                  <Image style={{ height: 18, width: 18, resizeMode: 'contain' }} source={esp.assets('icons/ic_notification.png')} />
                  <ComponentBadge counter={counter} />
                </View>
              </View>
            </ComponentTouchable>
        }
        {
          props.customRight && props.customRight()
        }
      </View>
    </View>
  )
}