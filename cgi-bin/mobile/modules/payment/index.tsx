// withHooks

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { ComponentHeader, LibScroll, CartItems, LibIcon, LibStyle, ComponentTouchable, LibNavigation, useSafeState, LibCurl, esp, LibDialog, LibUtils, LibFocus, UseForm_persist, usePersistState, LibToastProperty } from 'esoftplay';


export interface PaymentIndexProps {

}
export default function m(props: PaymentIndexProps): any {

  const [result, setResult] = useSafeState<any>()
  const [cart, setCart] = useSafeState<any>()

  function reloadCart() {
    new LibCurl('cart_list', null, (res, msg) => {
      setCart(res)
          }, (msg) => {
      LibToastProperty.show(msg)
    })
  }
  useEffect(() => {
    loadData()
    reloadCart()
  }, [])

  function loadData() {
    new LibCurl('location_member', null, (result, msg) => {
      setResult(result)
    }, (error) => {
      LibDialog.warning('Kesalahan', error)
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F8' }}>
      <ComponentHeader title="Checkout" btnBack />
      <LibFocus onFocus={() => { loadData(); reloadCart() }} />
      <LibScroll>
        {
          result && result && result.filter((item: any) => item.is_primary == "1").map((item: any, i: number) => {
            return (
              <ComponentTouchable key={i} onPress={() => { LibNavigation.navigate('user/address_list', { data: result }) }}>
                <View style={[{ flex: 1, flexDirection: 'row', padding: 10, backgroundColor: '#fff', marginBottom: 0 }, LibStyle.elevation(8)]}>
                  <View >
                    <LibIcon name="map-marker" size={25} />
                  </View>
                  <View style={{ marginLeft: 5, flex: 1 }}>
                    <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", marginTop: 4, fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#606a7b" }} >{item.name}</Text>
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginTop: 4, fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#606a7b" }} numberOfLines={3} ellipsizeMode={"tail"} >{item.address + " | " + item.phone}</Text>
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#606a7b" }} numberOfLines={3} ellipsizeMode={"tail"} >{item.location_detail.district + " - " + item.location_detail.city + ", " + item.location_detail.state + ", " + item.zipcode}</Text>
                  </View>
                  <View style={{ marginRight: 5, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <LibIcon name="chevron-right" size={30} />
                  </View>
                </View>
              </ComponentTouchable>
            )
          })
        }

        {
          cart && cart.list.length > 0 && cart.list.reverse().map((item: any, i: number) => {
            return (
              <CartItems
                key={i}
                {...item}
                onPressDelete={() => { }}
                onPress={() => { }}
                checkout />
            )
          })
        }
        <View />
      </LibScroll>
    </View>
  )
}