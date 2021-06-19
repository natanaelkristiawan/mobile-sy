// withHooks

import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ComponentHeader, LibPicture, esp, LibTextstyle, LibIcon, LibStyle, LibScroll, LibUtils, UseCurl, useSafeState, LibLoading } from 'esoftplay';


export interface CourierDetailProps {

}
export default function m(props: CourierDetailProps): any {

  const { url } = LibUtils.getArgsAll(props)
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
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }} >
      <ComponentHeader btnBack title={"Detail Kurir"} />
      {
        !data ? <LibLoading /> :
          <LibScroll>
            <View style={{ alignItems: 'center', paddingVertical: 10, backgroundColor: "white" }} >
              <LibPicture source={{ uri: data.image }} style={{ width: 100, height: 100, borderRadius: 50 }} resizeMode="cover" />
            </View>
            <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
              <LibTextstyle textStyle="callout" text="Nama" />
              <LibTextstyle textStyle="callout" text={data.name} style={{ color: "#888" }} />
            </View>
            <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
              <LibTextstyle textStyle="callout" text="No Handphone" />
              <LibTextstyle textStyle="callout" text={data.phone} style={{ color: "#888" }} />
            </View>
            <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "flex-end", marginTop: 2, backgroundColor: "white" }} >
              <TouchableOpacity onPress={() => { LibUtils.telTo(data.phone) }} activeOpacity={1} style={{ marginLeft: 17, justifyContent: "center", height: 50, width: 50, backgroundColor: "white", alignItems: 'center', borderRadius: 25, flexDirection: "row", ...LibStyle.elevation(2) }} >
                <LibIcon name="phone" color={LibStyle.colorPrimary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { LibUtils.waTo(data.phone) }} activeOpacity={1} style={{ marginLeft: 17, justifyContent: "center", height: 50, width: 50, backgroundColor: "white", alignItems: 'center', borderRadius: 25, flexDirection: "row", ...LibStyle.elevation(2) }} >
                <LibIcon name="whatsapp" color={LibStyle.colorPrimary} />
              </TouchableOpacity>
            </View>
            <LibTextstyle textStyle='footnote' text="Alamat Kurir" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
            <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
              <LibTextstyle textStyle="callout" text="Alamat" />
              <LibTextstyle textStyle="callout" text={data.address} style={{ color: "#888" }} />
            </View>
            {/* <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
              <LibTextstyle textStyle="callout" text="Desa" />
              <LibTextstyle textStyle="callout" text="Getassrabi" style={{ color: "#888" }} />
            </View>
            <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
              <LibTextstyle textStyle="callout" text="Kecamatan" />
              <LibTextstyle textStyle="callout" text="Gebog" style={{ color: "#888" }} />
            </View>
            <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
              <LibTextstyle textStyle="callout" text="Kota/Kabupaten" />
              <LibTextstyle textStyle="callout" text="Kudus" style={{ color: "#888" }} />
            </View>
            <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
              <LibTextstyle textStyle="callout" text="Provinsi" />
              <LibTextstyle textStyle="callout" text="Jawa Tengah" style={{ color: "#888" }} />
            </View>
            <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
              <LibTextstyle textStyle="callout" text="Kode POS" />
              <LibTextstyle textStyle="callout" text="59333" style={{ color: "#888" }} />
            </View> */}
            <LibTextstyle textStyle='footnote' text="Email Kurir" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
            <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
              <LibTextstyle textStyle="callout" text="Email" />
              <LibTextstyle textStyle="callout" text={data.email} style={{ color: "#888" }} />
            </View>
            <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "flex-end", marginTop: 2, backgroundColor: "white" }} >
              <TouchableOpacity onPress={() => { LibUtils.mailTo(data.email) }} activeOpacity={1} style={{ marginLeft: 17, justifyContent: "center", height: 50, width: 50, backgroundColor: "white", alignItems: 'center', borderRadius: 25, flexDirection: "row", ...LibStyle.elevation(2) }} >
                <LibIcon name="email-check-outline" color={LibStyle.colorPrimary} />
              </TouchableOpacity>
            </View>
          </LibScroll >
      }
    </View>
  )
}