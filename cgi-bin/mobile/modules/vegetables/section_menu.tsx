// withHooks

import React from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { LibStyle, LibNavigation, LibTextstyle, LibPicture, ComponentSection, LibUtils, esp, ComponentDivider } from 'esoftplay';


export interface VegetableSection_menuProps {
  data: any[],
  item: any
}


function split2Lines(data: any[]): [any[], any[]] {
  let line1 = []
  let line2 = []
  // Jika <=5 satu baris
  if (data.length <= 5) {
    line1 = data
  } else
    // jika <= 10 tampilkan 5, baris kedua sisanya
    if (data.length > 5 && data.length < 11) {
      line1 = data.slice(0, 5)
      line2 = data.slice(5, 10)
    } else
      // jika > 10 bagi dua, banyak yang atas
      if (data.length > 10) {
        let split = Math.ceil(data.length / 2)
        line1 = data.slice(0, split)
        line2 = data.slice(split, data.length)
      }
  return [line1, line2]
}

function getMenuSize(data: any[]): number {
  return LibStyle.width * (data.length > 10 ? 0.22 : 0.2)
}

/**
 * "cat_id": "5",
   "title": "Sayur Daun",
   "description": "",
   "lang_id": "1",
   "id": "5",
   "par_id": "0",
   "name": "Sayur Daun",
   "image": "",
   "publish": "1"
 */

export default function m(props: VegetableSection_menuProps): any {

  if (!LibUtils.checkUndefined(props, 'data.0')) {
    return null
  }

  const { data } = props
  const _data = Array.isArray(data) && data.filter((x) => x.publish == 1) || []
  return (
    <View>
      {
        props.item.show_title == 1 &&
        <ComponentSection
          text={props.item.title}
          textColor={"#000"}
          icon={props.item.show_title == 1 && props.item.more_module == '' ? '' : 'icons/ic_btn_more_rounded.png'}
          moreAction={() => LibNavigation.navigate('product/list', { url: props.item.params.more_url, title: props.item.title })}
        />
      }
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 24 }} >
        <View>
          {
            split2Lines(_data).map((level, i) => (
              <View key={i} style={{ flexDirection: 'row' }} >
                {
                  level.map((item, i) => (
                    <View key={i} style={{ width: getMenuSize(data), padding: 4 }} >
                      <TouchableOpacity activeOpacity={1} 
                        onPress={() => LibNavigation.navigate('product/list', { url: 'product?cat_id=' + item.id, title: item.title })}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <LibPicture source={{ uri: item.image }} style={{ height: 40, width: 40 }} resizeMode="contain" />
                        <LibTextstyle textStyle="caption2" text={item.title}
                          numberOfLines={2} ellipsizeMode="tail" style={{ marginTop: 10, textAlign: 'center', fontSize: 10, minHeight: 30 }} />
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
            ))
          }
        </View>
      </ScrollView>
      <ComponentDivider />
    </View>
  )
}