// withHooks

import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LibStyle, LibTextstyle, LibIcon, LibNavigation, LibPicture, LibUtils, VoucherDetailProperty, VoucherMineProperty, LibToastProperty, esp } from 'esoftplay';


export interface VoucherItemProps {
  amount: string,
  code: string,
  id: string,
  image: string,
  is_claim: 0 | 1,
  claim_id: number,
  target: string,
  title: string,
  type: string,
  type_list: string,
  qty: number,
  qty_left: number,
  start_date: string,
  expired_date: string,
  url: string,
  resultKey?: number,
  forClaim?: boolean,
  forUsed?: boolean,
  mine?: boolean,
  onClaimed: () => void
}

const width = LibStyle.width - 34
const height = width * 0.3


export default function m(props: VoucherItemProps): any {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => LibNavigation.navigate("voucher/detail", { url: props.url, title: props.title, mine: props.mine, forClaim: props.forClaim, forUsed: props.forUsed, resultKey: props.resultKey })}>
      <View style={{ marginHorizontal: 17, marginVertical: 10, borderRadius: 6, backgroundColor: "white", ...LibStyle.elevation(2) }}  >
        <View style={{ height, width, borderTopRightRadius: 6, borderTopLeftRadius: 6, }} >
          <LibPicture source={{ uri: props.image }} style={{ height, width, borderTopRightRadius: 6, borderTopLeftRadius: 6, }} />
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }} >
            <View style={{ height: 20, borderRadius: 10, marginLeft: -10, width: 20, backgroundColor: "#EAEBF0" }} />
            <View style={{ height: 20, borderRadius: 10, marginRight: -10, width: 20, backgroundColor: "#EAEBF0" }} />
          </View>
        </View>
        <LibTextstyle textStyle="callout" text={props.title} style={{ paddingHorizontal: 10, paddingVertical: 4, fontWeight: "bold" }} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }} >
          <View style={{ paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', flex: 1 }} >
            <LibIcon name="clock" color={"#888"} />
            <View style={{ marginLeft: 10 }} >
              <LibTextstyle textStyle="caption1" text="Periode" style={{ color: "#888" }} />
              <LibTextstyle textStyle="caption2" text={LibUtils.getDateRange(props.start_date, props.expired_date, "-", { month: " MMM ", date: "DD", year: "YY" })} style={{ fontWeight: "bold", color: "#333" }} />
            </View>
          </View>
          {
            props.amount > '0' &&
            <View style={{ paddingHorizontal: 13, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', flex: 1 }} >
              <LibIcon name="cash" color={"#888"} />
              <View style={{ marginLeft: 10 }} >
                <LibTextstyle textStyle="caption1" text="Nominal" style={{ color: "#888" }} />
                <LibTextstyle textStyle="caption1" text={props.amount} style={{ fontWeight: "bold", color: "#333" }} />
              </View>
            </View>
          }
        </View>
        {
          props.forUsed &&
          <TouchableOpacity activeOpacity={1}
            onPress={() => {
              VoucherMineProperty.use(
                props.claim_id,
                () => LibNavigation.sendBackResult(props, props.resultKey),
                (msg) => LibToastProperty.show(msg)
              )
            }} style={{ paddingHorizontal: 15, paddingVertical: 8, margin: 8, alignItems: 'center', borderRadius: 4, backgroundColor: props.is_claim ? LibStyle.colorGrey : LibStyle.colorPrimary }} >
            <LibTextstyle textStyle="caption1" text={"GUNAKAN"} style={{ fontWeight: "bold", color: "white" }} />
          </TouchableOpacity>
        }
        {
          props.forClaim &&
          <TouchableOpacity activeOpacity={1}
            disabled={props.is_claim == 1}
            onPress={() => { VoucherDetailProperty.claim(props.id, props.onClaimed) }} style={{ paddingHorizontal: 15, paddingVertical: 8, margin: 8, alignItems: 'center', borderRadius: 4, backgroundColor: props.is_claim ? LibStyle.colorGrey : LibStyle.colorPrimary }} >
            <LibTextstyle textStyle="caption1" text={props.is_claim == 0 ? "KLAIM" : "SUDAH DIKLAIM"} style={{ fontWeight: "bold", color: "white" }} />
          </TouchableOpacity>
        }
      </View>
    </TouchableOpacity>
  )
}