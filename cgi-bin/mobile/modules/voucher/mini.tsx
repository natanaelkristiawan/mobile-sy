// withHooks

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LibStyle, LibNavigation, LibPicture } from 'esoftplay';


export interface VoucherMiniProps {
  amount: string,
  code: string,
  id: string,
  image: string,
  is_claim: 0 | 1,
  target: string,
  title: string,
  type: string,
  type_list: string,
  start_date: string,
  expired_date: string,
  url: string,
  forClaim?: boolean,
  forUsed?: boolean,
  mine?: boolean,
  onClaimed: () => void
}

const width = 200
const height = width * 0.3

export default function m(props: VoucherMiniProps): any {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => LibNavigation.navigate("voucher/detail", { url: props.url, title: props.title, mine: props.mine, forClaim: props.forClaim, forUsed: props.forUsed })}>
      <View style={{ marginRight: 10, marginLeft: 1, marginVertical: 10, borderRadius: 6, width, backgroundColor: "white", ...LibStyle.elevation(2) }}  >
        <View style={{ height, width, borderRadius: 6, }} >
          <LibPicture source={{ uri: props.image }} style={{ height, width, borderRadius: 6, }} />
        </View>
        {/* <LibTextstyle numberOfLines={1} textStyle="footnote" text={props.title} style={{ paddingHorizontal: 10, paddingVertical: 4 }} ellipsizeMode="tail" /> */}
      </View>
    </TouchableOpacity>
  )
}