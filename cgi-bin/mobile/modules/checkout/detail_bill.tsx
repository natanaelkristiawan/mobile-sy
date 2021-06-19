// withHooks

import React, { useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { ComponentHeader, usePersistState, CartItems, LibUtils, esp, useSafeState, LibList, LibStyle } from 'esoftplay';


export interface CheckoutDetail_billProps {

}
export default function m(props: CheckoutDetail_billProps): any {

  // untuk dari order/detail
  let from = LibUtils.getArgs(props, 'from')
  let data = LibUtils.getArgs(props, 'data')

  esp.log(data);

  function viewFooter() {
    return (
      <View style={{ padding: 15, backgroundColor: '#fff', paddingTop: 7 }}>
        <View style={{ height: 30, justifyContent: 'center', alignContent: 'center' }}>
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 16, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#333942" }} >Ringkasan</Text>
        </View>
        <View style={{ marginTop: 10, flexDirection: 'row', height: 30, justifyContent: 'space-between', alignContent: 'center' }}>
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", color: "#333942" }}>Total Harga Produk</Text>
          <Text allowFontScaling={false}>{LibUtils.money(data.total_price)}</Text>
        </View>
        <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between', alignContent: 'center' }}>
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", color: "#333942" }}>Ongkos Kirim</Text>
          <Text allowFontScaling={false}>{LibUtils.money(data.shipping_cost)}</Text>
        </View>
        {
          data.v_code && parseInt(data.v_code) != 0 &&
          <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between', alignContent: 'center' }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", color: "#333942" }}>Kode Pembayaran</Text>
            <Text allowFontScaling={false}>{LibUtils.money(data.v_code)}</Text>
          </View>
        }
        {
          data && data.discount > 0 &&
          <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between', alignContent: 'center' }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", color: "#333942" }}>Potongan Harga</Text>
            <Text style={{ color: LibStyle.colorRed }} allowFontScaling={false}>-{LibUtils.money(data && data.discount)}</Text>
          </View>
        }
        <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between', alignContent: 'center' }}>
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", color: "#333942" }}>Total Pembayaran</Text>
          <Text allowFontScaling={false}>{LibUtils.money(data.grand_total)}</Text>
        </View>
      </View>
    )
  }

  if (from == "order/detail") {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F7F8' }}>
        <ComponentHeader title="Detail Tagihan" btnBack />
        <LibList
          data={data.list_order_product && data.list_order_product.length > 0 && data.list_order_product}
          renderItem={(item, i) => {
            return (
              <View key={i} style={{ padding: 15, backgroundColor: '#fff', paddingBottom: 10, paddingTop: 10, marginBottom: 5 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 14, fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#333942" }}>{LibUtils.ucwords(item.product_name)}</Text>
                  {/* <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", marginTop: 4, fontSize: 12, fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#00b894" }} numberOfLines={3} ellipsizeMode={"tail"} >{LibUtils.money(item.price)}</Text> */}
                </View>
                {
                  parseInt(item.price) > parseInt(item.sale) ?
                    <View style={{ alignContent: 'center', marginBottom: 10, marginTop: 5 }}>
                      <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 10, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#B9B7B7", textDecorationLine: 'line-through' }} >{LibUtils.money(item.price)}</Text>
                      <View style={{ flexDirection: "row", alignItems: "flex-end" }} >
                        <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 15, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#00b894" }} >{LibUtils.money(item.sale)}</Text>
                        <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 10, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b" }} > / {item?.unit_qty} {item?.unit_name}</Text>
                      </View>
                    </View>
                    :
                    <View style={{ flexDirection: "row", alignItems: "flex-end", marginTop: 5, marginBottom: 10 }} >
                      <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 15, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#00b894" }} >{LibUtils.money(item.price)}</Text>
                      <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 10, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b" }} > / {item?.unit_qty} {item?.unit_name}</Text>
                    </View>
                }
                <Text style={{ fontFamily: "Arial", fontSize: 14, fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b" }}>Qty {item.qty}</Text>
              </View>

            )
          }}
          renderFooter={() => {
            return (
              viewFooter()
            )
          }}
        />

      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F8' }}>
      <ComponentHeader title="Detail Tagihan" btnBack />

      <LibList
        data={data.list}
        renderItem={(item, i) => {
          return (
            <View key={i} style={{ padding: 15, backgroundColor: '#fff', paddingBottom: 10, paddingTop: 10, marginBottom: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 14, fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#333942" }}>{LibUtils.ucwords(item.product_name)}</Text>
                <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", marginTop: 4, fontSize: 12, fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#00b894" }} numberOfLines={3} ellipsizeMode={"tail"} >{LibUtils.money(item.sale)}</Text>
              </View>
              {
                parseInt(item.price) > parseInt(item.sale) ?
                  <View style={{ alignContent: 'center', marginBottom: 10, marginTop: 5 }}>
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 10, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#B9B7B7", textDecorationLine: 'line-through' }} >{LibUtils.money(item.price)}</Text>
                    <View style={{ alignItems: "flex-end", flexDirection: "row" }} >
                      <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 15, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#00b894" }} >{LibUtils.money(item.sale)}</Text>
                      <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 10, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b" }} > / {item?.unit_qty} {item?.unit_name}</Text>
                    </View>
                  </View>
                  :
                  <View style={{ alignItems: "flex-end", flexDirection: "row", marginBottom: 10, marginTop: 5, }} >
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 15, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#00b894" }} >{LibUtils.money(item.sale)}</Text>
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 10, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b" }} > / {item?.unit_qty} {item?.unit_name}</Text>
                  </View>
              }
              <Text style={{ fontFamily: "Arial", fontSize: 14, fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b" }}>Qty {item.qty}</Text>
            </View>

          )
        }}
        renderFooter={() => {
          return (
            viewFooter()
          )
        }}
      />
    </View>
  )
}