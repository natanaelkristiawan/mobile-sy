// withHooks

import { ComponentHeader, esp, LibCurl, LibIcon, LibNavigation, LibStatusbar, LibStyle } from 'esoftplay';
import React, { useEffect } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


export interface LocationIndexArgs {

}
export interface LocationIndexProps {

}
export default function m(props: LocationIndexProps): any {

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center", justifyContent: "center" }} >
      <LibStatusbar style={"dark"} />
      <LibIcon name="map-marker-question" size={80} color={LibStyle.colorPrimary} />
      <Text allowFontScaling={false} style={{ marginHorizontal: 15, marginVertical: 15, textAlign: "center", fontSize: 16, fontFamily: "Arial", lineHeight: 20, letterSpacing: 0.6 }} >Saat ini Anda belum memilih lokasi pengiriman. Untuk dapat melanjutkan ke halaman utama, silahkan pilih lokasi pengiriman terlebih dahulu.</Text>
      <TouchableOpacity onPress={() => LibNavigation.navigate("location/list")} activeOpacity={1} style={{ backgroundColor: LibStyle.colorPrimary, marginTop: 15, paddingHorizontal: 15, paddingVertical: 10, borderRadius: 18 }} >
        <Text allowFontScaling={false} style={{ color: "white", fontSize: 14, fontFamily: "Arial" }} >Pilih Lokasi Pengiriman</Text>
      </TouchableOpacity>
    </View >
  )
}