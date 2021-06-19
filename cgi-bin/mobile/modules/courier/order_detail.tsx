// withHooks

import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ComponentHeader, LibTextstyle, LibScroll, LibIcon, LibStyle, ComponentTouchable, LibDialog, LibNavigation, LibUtils, esp, UseCurl } from 'esoftplay';


export interface CourierOrder_detailProps {

}
export default function m(props: CourierOrder_detailProps): any {
  const { url } = LibUtils.getArgsAll(props)
  const [curl, loading, error] = UseCurl()

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <ComponentHeader title="Detail Pesanan" btnBack />
      <LibScroll>
        <View style={{ paddingHorizontal: 17, paddingVertical: 10, backgroundColor: "white" }} >
          <LibTextstyle textStyle={"footnote"} text="Status Pesanan" style={{ color: "#888", fontWeight: "bold" }} />
          <LibTextstyle textStyle="largeTitle" text={"Pesanan Dikirim"} style={{ fontWeight: "bold" }} />
        </View>
        <LibTextstyle textStyle='footnote' text="Pemesan" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
          <LibTextstyle textStyle="callout" text="Nama" />
          <LibTextstyle textStyle="callout" text="Munawar Kholil" style={{ color: "#888" }} />
        </View>
        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
          <LibTextstyle textStyle="callout" text="No Handphone" />
          <LibTextstyle textStyle="callout" text="62123456789" style={{ color: "#888" }} />
        </View>
        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "flex-end", marginTop: 2, backgroundColor: "white" }} >
          <TouchableOpacity activeOpacity={1} style={{ marginLeft: 17, justifyContent: "center", height: 50, width: 50, backgroundColor: "white", alignItems: 'center', borderRadius: 25, flexDirection: "row", ...LibStyle.elevation(2) }} >
            <LibIcon name="phone" color={LibStyle.colorPrimary} />
            {/* <LibTextstyle textStyle="callout" text="Panggil" style={{ color: LibStyle.colorPrimary, marginLeft: 10 }} /> */}
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1} style={{ marginLeft: 17, justifyContent: "center", height: 50, width: 50, backgroundColor: "white", alignItems: 'center', borderRadius: 25, flexDirection: "row", ...LibStyle.elevation(2) }} >
            <LibIcon name="whatsapp" color={LibStyle.colorPrimary} />
            {/* <LibTextstyle textStyle="callout" text="WhatsApp" style={{ color: LibStyle.colorPrimary, marginLeft: 10 }} /> */}
          </TouchableOpacity>
        </View>
        <LibTextstyle textStyle='footnote' text="Alamat Pengiriman" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
          <LibTextstyle textStyle="callout" text="Alamat" />
          <LibTextstyle textStyle="callout" text="Ganesha IV RT 11/04 Prambatan" style={{ color: "#888" }} />
        </View>
        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
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
        </View>
        <LibTextstyle textStyle='footnote' text="Detail Produk" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />

        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
          <LibTextstyle textStyle="callout" text="2x" />
          <View style={{ height: 30, width: 30, backgroundColor: "#f4f4f4", marginLeft: 10 }} />
          <View style={{ flex: 1, marginLeft: 10 }} >
            <LibTextstyle textStyle="callout" text="Biaya Pengiriman" />
            <LibTextstyle textStyle="caption2" text="Biaya Pengiriman" style={{ color: "#888" }} />
          </View>
          <LibTextstyle textStyle="callout" text="Rp 24.000.000" style={{ color: "#888" }} />
        </View>
        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
          <LibTextstyle textStyle="callout" text="2x" />
          <View style={{ height: 30, width: 30, backgroundColor: "#f4f4f4", marginLeft: 10 }} />
          <View style={{ flex: 1, marginLeft: 10 }} >
            <LibTextstyle textStyle="callout" text="Biaya Pengiriman" />
            <LibTextstyle textStyle="caption2" text="Biaya Pengiriman" style={{ color: "#888" }} />
          </View>
          <LibTextstyle textStyle="callout" text="Rp 24.000.000" style={{ color: "#888" }} />
        </View>
        <LibTextstyle textStyle='footnote' text="Detail Transaksi" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />

        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
          <LibTextstyle textStyle="callout" text="Biaya Pengiriman" />
          <LibTextstyle textStyle="callout" text="Rp 24.000.000" style={{ fontWeight: "bold" }} />
        </View>
        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
          <LibTextstyle textStyle="callout" text="Grand Total" />
          <LibTextstyle textStyle="callout" text="Rp 24.000.000" style={{ fontWeight: "bold" }} />
        </View>
      </LibScroll >
    </View >
  )
}
