// withHooks

import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { ComponentHeader, ComponentSection, LibStyle, LibTextstyle, LibNavigation, LibUtils, LibCurl, esp, LibInfinite, useSafeState, HubDetailArgs, LibScroll, LibDialog, HubListProperty, ProfileIndexProperty, LibList } from 'esoftplay';


export interface HubListArgs {
  url: string,
  title: string,
  list: any,
  id: string,
  index: number
}
export interface HubListProps {

}

export function confirmArrivedHUB(orderId: string, onResult: (x: any) => void) {
  let post = {
    order_id: orderId
  }
  new LibCurl("order_check", post,
    (res, msg) => {
      onResult(res)
    }, (msg) => {
      LibDialog.warning("Oops.!", msg)
    }
  )
}

export default function m(props: HubListProps): any {

  const { url, title, list, id, index } = LibUtils.getArgsAll(props)
  const [showTitle, setShowTitle] = useSafeState(false)
  const [active, setActive] = useSafeState(id)
  const [_url, _setUrl] = useSafeState(url)
  const [_title, _setTitle] = useSafeState(title)
  const [_key, set_Key] = useSafeState('')
  const [activeGroupId] = ProfileIndexProperty.groupIdState().useState()

  const scroll = useRef<LibList>(null)

  useEffect(() => {
    if (list.length > 0) {
      setTimeout(() => {
        scroll?.current?.scrollToIndex(index)
      }, 300);
    }
  }, [])

  useEffect(() => {
    getTotal()
  }, [_url])

  function getTotal(): void {
    new LibCurl(_url, null,
      (res, msg) => {
        setShowTitle(true)
      }, (msg) => {
        setShowTitle(false)
      }
    )
  }

  return (
    <View style={{ flex: 1 }} >
      <ComponentHeader title={_title} btnBack />
      <View style={{ marginVertical: 5, height: 35 }} >
        <LibList
          ref={scroll}
          horizontal
          bounces={false}
          initialNumToRender={list.length}
          style={{ paddingHorizontal: 15 }}
          data={list}
          renderItem={(item) => (
            <TouchableOpacity onPress={() => {
              setActive(item.id)
              _setUrl(item.url)
              _setTitle(item.title)
            }} activeOpacity={1} style={{ flex: 1, backgroundColor: active == item.id ? LibStyle.colorPrimary : "white", marginRight: 10, borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}>
              <Text allowFontScaling={false} style={{ color: active == item.id ? "#fff" : "#888", fontSize: 12, alignItems: 'center', textAlign: 'center', paddingVertical: 8, paddingHorizontal: 15 }}>{item.title}</Text>
            </TouchableOpacity>
          )}
          ListFooterComponent={
            <View style={{ width: 20 }} />
          }
        />
      </View>
      <LibInfinite
        key={_url + '-' + _key}
        url={_url}
        keyExtractor={(x, i) => i.toString()}
        ListHeaderComponent={
          <>
            {
              showTitle &&
              <LibTextstyle textStyle='footnote' text={_title} style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 10 }} />
            }
          </>
        }
        renderItem={(item: any, i: number) => {
          return (
            <View key={i} style={{ marginHorizontal: 17, marginVertical: 10, borderRadius: 6, paddingHorizontal: 17, paddingVertical: 10, backgroundColor: "white", ...LibStyle.elevation(2) }} >
              <TouchableOpacity activeOpacity={1}
                onPress={() => LibNavigation.navigate<HubDetailArgs>("hub/detail", { url: item.url })}
                style={{ alignItems: "center", flexDirection: "row" }} >
                <View style={{ flex: 1 }} >
                  <LibTextstyle
                    style={{ fontWeight: "bold" }}
                    textStyle="callout" text={LibUtils.ucwords(item.buyer_name)} />
                  <LibTextstyle
                    style={{ marginTop: 10 }}
                    numberOfLines={3}
                    ellipsizeMode={"tail"}
                    textStyle="caption1" text={item.address} />
                  {
                    LibUtils.checkUndefined(item, "location_detail") &&
                    <>
                      {/* <LibTextstyle
                      style={{ marginTop: 5 }}
                      numberOfLines={3}
                      ellipsizeMode={"tail"}
                      textStyle="caption1" text={item.location_detail.subdistrict.title + ", " + item.location_detail.city.title + ", " + item.location_detail.state.title + ", " + item.location_detail.country.title} /> */}
                      <LibTextstyle
                        style={{ marginTop: 5 }}
                        numberOfLines={3}
                        ellipsizeMode={"tail"}
                        textStyle="caption1" text={item?.location_detail?.subdistrict?.title + ", " + item?.location_detail?.city?.title + ", " + item?.location_detail?.state?.title + ", " + item?.location_detail?.country?.title} />
                    </>
                  }
                </View>
                <View style={{ flex: 1, alignItems: "flex-end" }} >
                  <LibTextstyle textStyle="callout" text={item.invoice} style={{ fontWeight: "bold", fontSize: 14 }} />
                  <View style={{ flex: 1 }} />
                  <LibTextstyle textStyle="footnote" text={LibUtils.money(item.grand_total)} style={{ fontWeight: "bold" }} />
                </View>
              </TouchableOpacity>
              {
                item.status_send == 0 && item.status == 3 && activeGroupId == 7 &&
                <View style={{ borderTopWidth: 1, borderTopColor: "#d1d1d1", marginTop: 15, paddingTop: 10 }} >
                  <TouchableOpacity onPress={() => {
                    LibDialog.confirm("Konfirmasi", "Konfirmasi Barang ini?", "Ya",
                      () => {
                        HubListProperty.confirmArrivedHUB(item.order_id, (res: any) => { set_Key(res) })
                      }, "Batal", () => { })
                  }} activeOpacity={1} style={{ padding: 10, backgroundColor: LibStyle.colorPrimary, borderRadius: 18, alignSelf: "flex-end" }} >
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, color: "white", paddingHorizontal: 15 }} >Konfirmasi Barang</Text>
                  </TouchableOpacity>
                </View>
              }
              {
                item.status_send != 0 && item.courier_id == 0 && activeGroupId == 7 &&
                <View style={{ borderTopWidth: 1, borderTopColor: "#d1d1d1", marginTop: 15, paddingTop: 10 }} >
                  <TouchableOpacity onPress={() => {
                    LibNavigation.navigate("hub/courier_list", { from: "detail", order_id: item.order_id })
                  }} activeOpacity={1} style={{ padding: 10, backgroundColor: LibStyle.colorPrimary, borderRadius: 18, alignSelf: "flex-end" }} >
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, color: "white", paddingHorizontal: 15 }} >Pilih Kurir</Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          )
        }}
      />
    </View>
  )
}