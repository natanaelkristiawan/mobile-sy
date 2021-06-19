// withHooks

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { LibNavigation, LibStyle, LibPicture, LibUtils, ComponentTouchable } from 'esoftplay';


export interface SearchItemProps {
  url: string,
  image: string,
  title: string,
  description: string,
  price: string,
  sale: string,
  onPress: () => void
}
export default function m(props: SearchItemProps): any {

  const itemWidth = (LibStyle.width - 48) * 0.33

  return (
    <View>
      <ComponentTouchable onPress={() => props.onPress()} >
        <View style={[{ width: itemWidth, borderRadius: 5, backgroundColor: '#fff', margin: 8 }, LibStyle.elevation(2)]} >
          {
            props.image == "" ?
              <View style={{ borderTopRightRadius: 5, borderTopLeftRadius: 5, height: 80, width: itemWidth, alignSelf: 'center', backgroundColor: LibStyle.colorGrey }} />
              :
              <LibPicture source={{ uri: props.image }} style={{ height: 80, width: itemWidth, resizeMode: 'contain', alignSelf: 'center' }} />
          }
          <View style={{ paddingHorizontal: 8, alignContent: 'flex-start' }}>
            <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 12, color: "#9b9b9b", marginTop: 10 }} numberOfLines={1} >{props.title}</Text>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 8, color: "#B9B7B7" }} numberOfLines={2} >{props.description}</Text>
            {
              parseInt(props.price) > parseInt(props.sale) ?
                <View>
                  <Text allowFontScaling={false} style={{ marginTop: 15, fontFamily: "Arial", fontSize: 10, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#00b894" }} >{LibUtils.money(props.sale)}</Text>
                  <Text allowFontScaling={false} style={{ marginBottom: 10, fontFamily: "Arial", fontSize: 8, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#e74c3c", textDecorationLine: 'line-through' }} >{LibUtils.money(props.price)}</Text>
                </View>
                :
                <Text allowFontScaling={false} style={{ marginBottom: 10, marginTop: 15, fontFamily: "Arial", fontSize: 10, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#00b894" }} >{LibUtils.money(props.sale)}</Text>
            }
          </View>
        </View>
      </ComponentTouchable>

    </View>
  )
}