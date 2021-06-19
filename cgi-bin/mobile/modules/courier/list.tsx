// withHooks

import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, ScrollView, Text } from 'react-native';
import { ComponentHeader, LibStyle, LibTextstyle, LibNavigation, LibUtils, esp, UseCurl, LibInfinite, useSafeState, ProfileIndexProperty, HubDetailArgs, LibList } from 'esoftplay';


export interface CourierListArgs {
  url: string,
  title: string,
  list: string,
  id: string,
  index: number
}
export interface CourierListProps {

}
export default function m(props: CourierListProps): any {

  const { url, title, list, id, index } = LibUtils.getArgsAll(props)
  const [curl, loading, error] = UseCurl()
  const [result, setResult] = useSafeState()
  const [active, setActive] = useSafeState(id)
  const [_url, _setUrl] = useSafeState(url)
  const [_title, _setTitle] = useSafeState(title)
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
    curl(_url, null, (res) => {
      setResult(res)
    })
  }, [_url])

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
        key={_url}
        url={_url}
        keyExtractor={(x, i) => i.toString()}
        ListHeaderComponent={
          <>
            {
              !error &&
              < LibTextstyle textStyle='footnote' text={_title} style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5 }} />
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
                item.status == 3 && item.status_send == 2 && item.courier_id != 0 && activeGroupId == 8 &&
                <View style={{ borderTopWidth: 1, borderTopColor: "#d1d1d1", marginTop: 15, paddingTop: 10 }} >
                  <TouchableOpacity onPress={() => {
                    LibNavigation.navigate("courier/confirmation", { url: item.url })
                  }} activeOpacity={1} style={{ padding: 10, backgroundColor: LibStyle.colorPrimary, borderRadius: 18, alignSelf: "flex-end" }} >
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, color: "white" }} >Selesaikan Pesanan</Text>
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