// withHooks

import React from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import { LibTextstyle, LibStyle, LibList, ProductItem, LibNavigation, LibPicture, esp, ComponentDivider, ComponentWebviewArgs } from 'esoftplay';
import { Text } from 'native-base';


export interface VegetablesSection_viewProps {
  id: string,
  title: string,
  description: string,
  image: string,
  show_more: string,
  list: any[],
  params: any,
  url: string,
  module: string
}
/*
{
    "id": "1",
    "title": "yang manis buat kamu",
    "description": "test yang manis buat kamu",
    "image": "http:\/\/api.test.apps.sayurrumahan.com\/images\/modules\/vegetable\/product_section\/5f200b5fa3773.jpeg",
    "show_more": "1",
    "list_product": [
        {
            "product_id": "16",
            "name": "Bawang Putih Kating 500 gr",
            "image": "http:\/\/api.test.apps.sayurrumahan.com\/images\/modules\/vegetable\/product\/16\/thumb_bawang-putih.jpg",
            "price": "15000",
            "discount": "",
            "sale": "15000",
            "unit_qty": "500",
            "unit_name": "gr",
            "min_order": "1",
            "stocks": "996",
            "url": "http:\/\/api.test.apps.sayurrumahan.com\/product_detail\/16"
        },
        {
            "product_id": "15",
            "name": "Bawang Bombay 500 gr",
            "image": "http:\/\/api.test.apps.sayurrumahan.com\/images\/modules\/vegetable\/product\/15\/thumb_bawang-bombay.jpg",
            "price": "12000",
            "discount": "",
            "sale": "12000",
            "unit_qty": "500",
            "unit_name": "gr",
            "min_order": "1",
            "stocks": "992",
            "url": "http:\/\/api.test.apps.sayurrumahan.com\/product_detail\/15"
        }
    ]
}
*/


export default function m(props: VegetablesSection_viewProps): any {
  return (
    <>
      <View style={{ flexDirection: 'row', marginTop: 18, marginHorizontal: 16, alignItems: 'flex-start' }} >
        <View style={{ flex: 1 }} >
          <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 15, lineHeight: 22, color: "#000" }} >{props.title}</Text>
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 10, color: "#888" }} >{props.description}</Text>
        </View>
        {
          props.show_more == '1' &&
          <TouchableOpacity activeOpacity={1}
            onPress={() => { LibNavigation.navigate("product/list", { url: props.params.more_url, title: props.title }) }}
            style={{ marginTop: 5, marginLeft: 10 }} >
            <LibTextstyle text="Lihat Semua" textStyle="caption2" style={{ color: LibStyle.colorPrimaryGreen, fontWeight: 'bold' }} />
          </TouchableOpacity>
        }
      </View>
      <TouchableOpacity activeOpacity={1} onPress={() => {
        if (props.url) {
          if (props.module) {
            LibNavigation.navigate(props.module, { url: props.url, title: props.title })
          } else {
            LibNavigation.navigate<ComponentWebviewArgs>("component/webview", { url: props.url, title: props.title })
            // if (Linking.canOpenURL(props.url)) {
            //   Linking.openURL(props.url)
            // }
          }
        }
      }} >
        <LibPicture
          source={{ uri: props.image || " " }}
          resizeMode={"cover"}
          style={{ marginHorizontal: 16, borderRadius: 5, marginTop: 10, width: LibStyle.width - 32, backgroundColor: "#f1f2f3", height: ((LibStyle.width - 32) * 0.25) }} />
      </TouchableOpacity>
      <View style={{ height: 1, backgroundColor: "#f1f2f3", width: "100%", marginTop: 20 }} />
      <LibList
        data={props.list}
        style={{ marginTop: 0, paddingLeft: 16 }}
        horizontal
        renderItem={(item: any, i: number) => {
          return (
            <ProductItem
              key={i}
              first={i == 0}
              last={i == (props.list.length - 1)}
              onPress={() => { LibNavigation.push('product/detail', { url: item.url }) }}
              {...item}
              fromHome
            />
          )
        }}
      />
      <ComponentDivider />
    </>
  )
}