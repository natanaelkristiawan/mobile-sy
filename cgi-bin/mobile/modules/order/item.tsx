// withHooks

import React, { useEffect } from 'react';
import { View, Text, AppState } from 'react-native';
import { LibStyle, LibUtils, ComponentTouchable, LibTextstyle, useSafeState } from 'esoftplay';
import moment from 'moment/min/moment-with-locales'
import CountDown from 'react-native-countdown-component';


export interface OrderItemProps {
  onPress: () => void
  created: string
  total_pay: string
  status: string
  color: string
  invoice: string
  total_shipping: string
  v_code: string
  exp_date: string
  status_id: string
  grand_total: string
}
moment.locale('id')

export default function m(props: OrderItemProps): any {
  const [isExp, setIsExp] = useSafeState(false)


  return (
    <ComponentTouchable onPress={() => { props.onPress() }} style={[{ padding: 15, margin: 15, flex: 1, backgroundColor: '#fff', marginBottom: 0, }, LibStyle.elevation(4)]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontWeight: 'bold', fontSize: 15, color: "#000" }}>{props.invoice}</Text>
        <View style={{ paddingLeft: 10, paddingRight: 10, maxWidth: 150, height: 20, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, backgroundColor: props.color, alignSelf: 'flex-end', marginRight: -15, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 10, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0.12, textAlign: "center", color: "#fff", justifyContent: 'center', alignSelf: 'center' }}>{props.status}</Text>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        {/* <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 20, color: "#9b9b9b" }}>{LibUtils.money(parseInt(props.total_pay) + parseInt(props.total_shipping) + parseInt(props.v_code))}</Text> */}
        <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 20, color: "#9b9b9b" }}>{LibUtils.money(parseInt(props.grand_total))}</Text>
        <View style={{ flexDirection: 'row', marginTop: 7, alignContent: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 13, color: "#9b9b9b" }}>Tanggal Pesanan</Text>
          <Text allowFontScaling={false} style={{ marginLeft: 10, fontFamily: "Arial", fontSize: 12, fontWeight: 'bold', color: "#9b9b9b" }}>{moment(props.created).format("dddd, DD MMMM YYYY")}</Text>
        </View>
      </View>
      {
        props.status_id == "1"
        &&
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <Text allowFontScaling={false} style={{ marginTop: -15, fontFamily: "Arial", fontWeight: 'bold', fontSize: 10, color: "#000" }}>Batas Waktu Pembayaran</Text>
          {
            isExp ?
              <LibTextstyle textStyle="body" text="Expired" />
              :
              <CountDown
                until={LibUtils.getDateTimeSeconds(LibUtils.getTimezoneByConfig(), props.exp_date)}
                onFinish={() => { setIsExp(true) }}
                digitStyle={{ backgroundColor: '#FFF' }}
                digitTxtStyle={{ color: '#1CC625' }}
                timeToShow={['D', 'H', 'M', 'S']}
                timeLabels={{ d: 'Hari', h: 'Jam', m: 'Menit', s: 'Detik' }}
                style={{ alignSelf: 'flex-start' }}
                size={15}
              />
          }
        </View>
      }
    </ComponentTouchable>
  )
}