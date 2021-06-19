// withHooks

import React from 'react';
import { View, Text } from 'react-native';
import { LibStyle, LibPicture, LibUtils, ComponentTouchable, applyStyle, LibTextstyle, esp } from 'esoftplay';


export interface ProductItemProps {
  currency: string,
  description: string,
  discount: string,
  discount_text: string,
  id: string,
  image: string,
  label_color: string,
  label_name: string,
  min_order: string,
  params: string,
  price: string,
  sale: string,
  stocks: string,
  title: string,
  unit_name: string,
  sub_title: string,
  unit_qty: string,
  url: string,
  first: boolean,
  last: boolean,
  fromHome?: boolean,
  onPress: () => void,
}
export default function m(props: ProductItemProps): any {
  // const itemWidth = (LibStyle.width - 48) * 0.5
  const imageWidth = props.fromHome ? (LibStyle.width) * 0.33 : (LibStyle.width) * 0.5

  return (
    <ComponentTouchable
      style={applyStyle({ borderLeftWidth: props.first ? 1 : 0.5, borderBottomWidth: 1, borderRightWidth: props.last ? 1 : 0.5, borderColor: "#f4f4f4", flex: 0.5 })}
      onPress={() => { props.onPress() }} >
      <View style={applyStyle({ width: imageWidth, backgroundColor: '#fff', paddingBottom: 10 })} >
        <LibPicture resizeMode="cover" source={{ uri: props.image }} style={applyStyle({ borderRadius: 5, height: imageWidth - 16, margin: 8, width: imageWidth - 16, alignSelf: 'center' })} />
        <View style={applyStyle({ paddingHorizontal: 8, alignContent: 'flex-start' })}>
          <Text allowFontScaling={false} style={applyStyle({ fontFamily: "Arial", fontSize: 12, lineHeight: 16, minHeight: 16, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#00b894", marginTop: 3, flexWrap: 'wrap' })} numberOfLines={1} ellipsizeMode={"tail"} >{LibUtils.ucwords(props.title)}</Text>
          {
            (props?.sub_title != '' && props?.sub_title) && <LibTextstyle textStyle="caption2" text={props.sub_title || "Masmun JOS"} style={{ fontSize: 9, color: "#888" }} />
          }
          <View style={{ marginTop: 10 }} >
            {
              parseInt(props.price) > parseInt(props.sale) &&
              <View style={applyStyle({ flexDirection: 'row', alignItems: 'center', marginBottom: 5 })}>
                <Text allowFontScaling={false} style={applyStyle({ fontFamily: "Arial", fontSize: 9, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#B9B7B7", textDecorationLine: 'line-through', flex: 1 })} >{LibUtils.money(props.price)}</Text>
                <View style={{ borderRadius: 3, backgroundColor: "#FF5501", paddingHorizontal: 6, paddingVertical: 3 }} >
                  {
                    props.discount.includes('%') ?
                      <LibTextstyle textStyle="caption2" text={props?.discount_text + " " + props.discount} style={{ color: "white", fontFamily: "Arial", fontWeight: "bold", fontSize: 9 }} />
                      :
                      <LibTextstyle textStyle="caption2" text={props?.discount_text + " " + LibUtils.money(props.discount)} style={{ color: "white", fontFamily: "Arial", fontWeight: "bold", fontSize: 9 }} />
                  }
                </View>
              </View>
            }
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }} >
            <Text allowFontScaling={false} style={applyStyle({ fontFamily: "Arial", fontSize: 13, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "red" })} >{LibUtils.money(props.sale)}</Text>
            <Text allowFontScaling={false} style={applyStyle({ fontFamily: "Arial", fontSize: 10, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b" })} > / {props.unit_qty} {props.unit_name}</Text>
          </View>
        </View>
      </View>
      {
        (props?.label_name != '' && props?.label_name) &&
        <View style={{ position: "absolute", top: 10, left: -1 }} >
          <View style={{ backgroundColor: props.label_color || '#898181', paddingHorizontal: 10 }} >
            <LibTextstyle textStyle={'caption1'} text={props.label_name} style={{ color: "white" }} />
          </View>
        </View>
      }
    </ComponentTouchable>
  )
}