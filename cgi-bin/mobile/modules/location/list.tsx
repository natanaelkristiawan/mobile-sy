// withHooks

import { ComponentHeader, esp, LibCurl, LibDialog, LibIcon, LibList, LibLoading, LibNavigation, LibStyle, LibTextstyle, LibUtils, UseCurl, useSafeState } from 'esoftplay';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


export interface LocationListArgs {
  location_range_id: string
}
export interface LocationListProps {

}
export default function m(props: LocationListProps): any {

  const { location_range_id } = LibUtils.getArgsAll(props)
  const [result, setResult] = useSafeState<any>()
  const [curl, loading, error] = UseCurl()

  useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    curl('location_range', null, (res) => {
      setResult(res)
    })
  }

  function setLocationSend(id: string) {
    let post = {
      location_range_id: id
    }
    new LibCurl("location_range_edit", post,
      (res) => {
        LibNavigation.reset('vegetables/index')
      }, (err) => {
        LibDialog.warning("Oops.!", err)
      })
  }

  return (
    <View style={{ flex: 1 }} >
      <ComponentHeader title="Daftar Lokasi Pengiriman" btnBack notif />
      <LibList
        onRefresh={loadData}
        data={result}
        ListEmptyComponent={
          loading ? <LibLoading /> : error ?
            <View style={{ flex: 1, marginTop: LibStyle.height * 0.3, justifyContent: 'center', alignItems: 'center' }} >
              <LibTextstyle text={error} textStyle="body" style={{ textAlign: 'center' }} />
            </View>
            : null
        }
        renderItem={(item: any, i: number) => {
          return (
            <TouchableOpacity key={i} onPress={() => {
              LibDialog.warningConfirm("Konfirmasi", item.title + " akan dijadikan lokasi pengiriman, Lanjutkan?",
                "Ya", () => {
                  setLocationSend(item.id)
                }, "Batalkan", () => { })
            }} activeOpacity={1} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", padding: 10, marginHorizontal: 10, borderRadius: 5, marginVertical: 5, ...LibStyle.elevation(2) }} >
              <View style={{ flex: 1 }} >
                <Text allowFontScaling={false} style={{ fontSize: 14, fontFamily: "Arial", paddingBottom: 5 }} >{item.title}</Text>
                <Text allowFontScaling={false} style={{ fontSize: 10, fontFamily: "Arial" }} >{item.detail}</Text>
              </View>
              {
                item.id == location_range_id &&
                <LibIcon name="check-circle" color={LibStyle.colorPrimary} />
              }
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}