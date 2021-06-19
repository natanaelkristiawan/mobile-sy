// withHooks

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ComponentHeader, ProductItem, LibStyle, LibInfinite, LibUtils, esp, LibNavigation, LibPicture, LibIcon } from 'esoftplay';


export interface ProductListProps {

}
export default function m(props: ProductListProps): any {

  let url = LibUtils.getArgs(props, 'url')
  let title = LibUtils.getArgs(props, 'title')

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader title={title || "List Product"} btnBack notif customRight={() => (
        <TouchableOpacity activeOpacity={1} onPress={() => LibNavigation.navigate("search/index")} style={{ width: 40, alignItems: "flex-end" }} >
          <LibIcon name='magnify' color={"white"} />
        </TouchableOpacity>)} />
      <LibInfinite
        url={url}
        numColumns={2}
        key={url}
        errorView={(error: any) => {
          return (
            <View style={{ flex: 1, height: LibStyle.height - 60, width: LibStyle.width, padding: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <LibPicture source={esp.assets("logo.png")} resizeMode="contain" style={{ height: 200, width: 200 }} />
              <Text allowFontScaling={false} style={{ marginTop: 0, textAlign: 'center', fontFamily: "ArialBold", fontSize: 17, fontWeight: "600", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: LibStyle.colorPrimaryGreen, alignSelf: 'center' }} >{error}</Text>
            </View>
          )
        }}
        renderItem={(item: any, i: number) => (
          <ProductItem
            key={i}
            {...item}
            onPress={() => { LibNavigation.push('product/detail', { url: item.url }) }}
          />
        )}
      />
    </View>
  )
}