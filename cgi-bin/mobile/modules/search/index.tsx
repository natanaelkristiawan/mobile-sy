// withHooks

import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LibStyle, ComponentHeader, LibCurl, LibLoading, LibNavigation, LibProgress, LibUtils, ComponentFooter, LibPicture, useSafeState, SearchItem, LibScroll, LibFocus, LibInfinite, esp, LibList, ProductItem, ComponentNotfound, VegetablesState, LibTextstyle, ComponentSection } from 'esoftplay';



export interface SearchIndexProps {
  navigation: any
}


export default function m(props: SearchIndexProps): any {
  const [homeData, setHomeData] = VegetablesState().useState()
  const [result, setResult] = useSafeState<any>([])
  const [query, setQuery] = useSafeState<string>('')
  const [error, setError] = useSafeState<string>('')

  useEffect(() => {
    doSearch()
  }, [query])


  function doSearch() {
    if (query != '') {
      LibProgress.show("Mohon Tunggu")
      new LibCurl('search?keyword=' + query, null, (result, msg) => {
        setResult(result)
        LibProgress.hide()
        // LibNavigation.navigate("search/list", { query: query, data: result })
      }, (error) => {
        LibProgress.hide()
      })
    }
  }

  const itemWidth = (LibStyle.width - 2)
  const itemHeight = itemWidth * 9 / 16

  let menus = []
  if (homeData) {
    menus = homeData.blocks.filter((x: any) => x.type == 'menu')?.[0]?.list
    menus = menus.filter((x: any) => x.publish == 1)
  }

  if (result && query) {
    menus = []
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader doSearch={() => {
        doSearch()
      }}
        onChangeText={(q) => {
          LibUtils.debounce(() => {
            setQuery(q)
            setError('')
          }, 500)
        }} btnBack />
      {
        error != '' ?
          <ComponentNotfound text={error} />
          :
          <ScrollView key={query} style={{ flex: 1 }} showsVerticalScrollIndicator={false}  >
            {
              result && result.map((item: any, index: number) => {
                if (item.type == "list" && item.list && item.list.length > 0) {
                  return (
                    <View key={index} >
                      <Text allowFontScaling={false} style={{ marginHorizontal: 17, marginVertical: 10, fontFamily: "ArialBold", fontSize: 15, lineHeight: 22, color: "#000" }} >{item.title}</Text>
                      <View style={{ backgroundColor: '#fff', marginBottom: 10, flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                          item.list && item.list.length > 0 && item.list.map((item2: any, i2: any) => {
                            return (
                              <View key={i2} style={{ width: LibStyle.width * 0.5 }} >
                                <ProductItem
                                  {...item2}
                                  onPress={() => { LibNavigation.push('product/detail', { url: item2.url }) }}
                                />
                              </View>
                            )
                          })
                        }
                      </View>
                    </View>
                  )
                }
              })
            }
            {
              menus.length > 0 &&
              <>
                <View style={{ marginHorizontal: 15, marginTop: 12, paddingBottom: 8, borderBottomWidth: 1, borderBottomColor: "#f4f4f4" }} >
                  {/* <LibTextstyle textStyle="body" text={""} /> */}
                  <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 15, lineHeight: 22, color: "#000" }} >{"Pencarian berdasarkan kategori"}</Text>
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10, marginHorizontal: 5 }} >
                  {
                    menus.map((x: any) => (
                      <TouchableOpacity activeOpacity={1}
                        key={x.id}
                        onPress={() => LibNavigation.navigate('product/list', { url: 'product?cat_id=' + x.id, title: x.title })}
                        style={{ paddingHorizontal: 15, marginBottom: 10, marginLeft: 10, paddingVertical: 8, borderRadius: 4, borderWidth: 1, borderColor: LibStyle.colorPrimary }} >
                        <LibTextstyle textStyle="caption2" text={x.title}
                          numberOfLines={2} ellipsizeMode="tail" style={{ textAlign: 'center', fontSize: 10, color: LibStyle.colorPrimary }} />
                      </TouchableOpacity>
                    ))
                  }
                </View>
              </>
            }
          </ScrollView>
      }
    </View>
  )
}