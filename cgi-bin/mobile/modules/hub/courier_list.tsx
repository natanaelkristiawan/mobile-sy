// withHooks

import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import { ComponentHeader, LibTextstyle, LibNavigation, LibStyle, LibPicture, esp, LibUtils, LibCurl, useSafeState, LibLoading, LibDialog, LibList, UseCurl, HubDetailArgs } from 'esoftplay';


export interface HubCourier_listProps {

}
export default function m(props: HubCourier_listProps): any {

  const { title, url, from, order_id } = LibUtils.getArgsAll(props)
  const [curl, loading, error] = UseCurl()
  const [data, setData] = useSafeState<any>()

  useEffect(() => {
    curl(url || "courier_list", null,
      (res) => {
        setData(res)
      })
  }, [])

  function setCourier(courier_id: number) {
    let post = {
      order_id: order_id,
      courier_id: courier_id
    }
    new LibCurl("courier_set", post, (res, msg) => {
      esp.log(res, msg);
      LibNavigation.backToRoot()
      LibNavigation.navigate<HubDetailArgs>("hub/detail", { url: res.url })
    }, (err) => {
      LibDialog.warning("Oops", err)
    }, 1)
  }

  return (
    <View style={{ flex: 1 }} >
      <ComponentHeader btnBack title={title || "Daftar Kurir"} />
      <LibList
        data={data}
        ListEmptyComponent={
          loading ? <LibLoading /> :
            <View style={{ flex: 1, marginTop: LibStyle.height * 0.3, justifyContent: 'center', alignItems: 'center' }} >
              <LibTextstyle text={error} textStyle="body" style={{ textAlign: 'center' }} />
            </View>
        }
        renderItem={(item: any, i: number) => {
          return (
            <TouchableOpacity activeOpacity={1} key={i}
              onPress={() => {
                if (from == 'detail') {
                  LibDialog.confirm("Konfirmasi", "Yakin pilih " + item.name + " untuk mengirimkan pesanan?", "Ya", () => {
                    setCourier(item.id)
                  }, "Batal", () => { })

                } else {
                  LibNavigation.navigate("courier/detail", { url: item.url })
                }
              }}
              style={{ marginHorizontal: 17, alignItems: "center", flexDirection: "row", marginVertical: 10, borderRadius: 6, paddingHorizontal: 17, paddingVertical: 10, backgroundColor: "white", ...LibStyle.elevation(2) }} >
              <View style={{ flex: 1 }} >
                <LibTextstyle
                  style={{ fontWeight: "bold" }}
                  textStyle="callout" text={item.name} />
                <LibTextstyle
                  style={{ marginTop: 10 }}
                  numberOfLines={3}
                  ellipsizeMode={"tail"}
                  textStyle="caption1" text={item.address} />
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }} >
                <LibPicture source={{ uri: item.image }} style={{ width: 50, height: 50, borderRadius: 25 }} resizeMode="cover" />
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}