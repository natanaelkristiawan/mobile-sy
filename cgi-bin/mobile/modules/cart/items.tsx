// withHooks

import React from 'react';
import { View, Text } from 'react-native';
import { LibPicture, ComponentTouchable, LibIcon, LibStyle, LibUtils, LibInput, esp } from 'esoftplay';


export interface CartItemsProps {
  checkout?: boolean,
  onPress: () => void,
  onPressDelete: () => void,
  onPressMin: () => void,
  onBlur: () => void,
  onChangeNotes: (notes: string) => void,
  onPressAdd: () => void,
  image: string,
  location_range_id: string,
  notes: string,
  price: string,
  product_id: string,
  product_name: string,
  qty: string,
  sale: string,
  status: string,
  stocks: string,
  unit_id: string,
  unit_name: string,
  unit_qty: string,
  freeze?: boolean
}
export default function m(props: CartItemsProps): any {
  return (
    <>
      <ComponentTouchable onPress={() => { props.onPress() }} style={{ backgroundColor: '#fff', flexDirection: 'row', marginTop: 5, marginBottom: 1 }}>
        <LibPicture resizeMode="cover" style={{ margin: 16, height: 60, width: 60, borderRadius: 5 }} source={{ uri: props.image }} />
        <View style={{ marginLeft: 0, margin: 10, flex: 1 }}>
          <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 14, fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#333942" }}>{LibUtils.ucwords(props.product_name)}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
            <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", marginTop: 4, fontSize: 12, fontWeight: "600", fontStyle: "normal", letterSpacing: 0, color: "#00b894" }} numberOfLines={3} ellipsizeMode={"tail"} >{LibUtils.money(props.sale)}</Text>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 10, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b" }} > / {props.unit_qty} {props.unit_name}</Text>
          </View>
          <View style={{ flex: 1, marginTop: 9, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
              {
                !props.checkout &&
                <ComponentTouchable onPress={() => { props.onPressMin() }}>
                  <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: "#ecf0f1", alignContent: 'center', alignItems: 'center' }}>
                    <LibIcon name="minus" color="#e74c3c" />
                  </View>
                </ComponentTouchable>
              }
              {
                props.checkout ?
                  <Text style={{ fontFamily: "Arial", fontSize: 14, fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b" }}>Qty {props.qty}</Text>
                  :
                  <Text style={{ fontFamily: "Arial", fontSize: 20, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b", marginLeft: 13, marginRight: 13 }}>{props.qty}</Text>
              }
              {
                !props.checkout &&
                <ComponentTouchable onPress={() => { props.onPressAdd() }}>
                  <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: "#ecf0f1", alignContent: 'center', alignItems: 'center' }}>
                    <LibIcon name="plus" color="#16a085" />
                  </View>
                </ComponentTouchable>
              }
            </View>
            {
              props.checkout ?
                <View />
                :
                <ComponentTouchable onPress={() => { props.onPressDelete() }}>
                  <LibIcon name={"delete-empty"} size={25} color={LibStyle.colorRed} style={{ marginRight: 10 }} />
                </ComponentTouchable>
            }
          </View>
        </View>
      </ComponentTouchable>
      {
        // esp.isDebug() &&
        <View style={{ paddingHorizontal: 10, paddingVertical: 8, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }} >
          <LibIcon.SimpleLineIcons name="pencil" color={"#888"} size={12} />
          <LibInput editable={!props.freeze} base defaultValue={props.notes} onChangeText={props.onChangeNotes} placeholder={props.freeze ? "Tidak ada catatan" : "Catatan (opsional)"} style={{ fontSize: 12, marginLeft: 10, flex: 1, color: "#888" }} />
        </View>
      }
    </>
  )
}