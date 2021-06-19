// withHooks

import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { LibStyle, LibNavigation } from 'esoftplay';


export interface VegetablesVoucherProps {

}

export default function m(props: VegetablesVoucherProps): any {
  const width = LibStyle.width - 34
  const height = width * 0.16
  return (
    <TouchableOpacity activeOpacity={1}  onPress={()=>{ LibNavigation.navigate("voucher/list") }} style={{ height: LibStyle.width * 0.16, width: LibStyle.width, alignItems: 'center', justifyContent: 'center' }} >
      <Image source={{ uri: "https://lelogama.go-jek.com/post_thumbnail/promo_makan_murah.jpg" }} style={{ height, width, backgroundColor: "#f9f9f9", borderRadius: 5 }} />
    </TouchableOpacity>
  )
}