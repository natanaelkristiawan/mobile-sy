// withHooks

import React, { useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback, Linking, TouchableOpacity, Image } from 'react-native';
import { LibStyle, LibFocus, LibCarrousel, LibPicture, ComponentSection, ProductItem, LibNavigation, LibCurl, esp, usePersistState, LibLoading, ComponentTouchable, LibUpdater, LibUpdaterProperty, ComponentHeader_home, LibUtils, LibList, VegetablesState, VegetablesSection_menu, VegetablesSection_view, VegetablesVoucher, VoucherItem, VoucherMine, VoucherMini, ComponentWebviewArgs, VegetablesIndexProperty, LibIcon, LocationListArgs } from 'esoftplay';
import { useSelector } from 'react-redux';


export interface VegetablesHomeProps {

}
export default function m(props: VegetablesHomeProps): any {

  const [result, setResult] = VegetablesState().useState()
  const [, , reOffCart] = usePersistState<any>('offlineCart')
  // const user = LibUtils.getReduxState('user_class')
  const [, setLocations] = usePersistState<any>('locations')
  let user = useSelector((state: any) => state.user_class)

  useEffect(() => {
    loadData()
    loadLocations()
  }, [])

  function loadData() {
    new LibCurl('main', null,
      (result, msg) => {
        setResult(result)
      },undefined,1)
  }

  function loadLocations() {
    new LibCurl('location', null,
      (res, msg) => {
        setLocations(res)
      }
    )
  }

  if (!result) {
    return (
      <LibLoading />
    )
  }


  function redirectSlider(item1: any) {
    if (item1.url) {
      if (item1.module) {
        LibNavigation.navigate(item1.module, { url: item1.url, title: item1.title })
      } else {
        LibNavigation.navigate<ComponentWebviewArgs>("component/webview", { url: item1.url, title: item1.title })
        // if (Linking.canOpenURL(item1.url)) {
        //   Linking.openURL(item1.url)
        // }
      }
    }
  }

  const sliderHeight = 0.50 * LibStyle.width

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader_home onPress={() => LibNavigation.navigate('search/index')} />
      <LibFocus onFocus={() => { reOffCart(); }} />
      <LibList
        data={result && result.blocks && result.blocks.length > 0 && result.blocks}
        onRefresh={() => loadData()}
        ListHeaderComponent={
          <>
            {
              user && /* esp.isDebug() && */
              <TouchableOpacity onPress={() => {
                LibNavigation.navigate<LocationListArgs>("location/list", { location_range_id: user.location_range_id })
              }} activeOpacity={1} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f1f1f1", padding: 8, borderRadius: 4, marginHorizontal: 10, marginTop: 10 }} >
                <Text allowFontScaling={false} style={{ flex: 1, fontSize: 14, fontFamily: "Arial" }} >{user.location_range_name == "" ? "Pilih Lokasi Anda" : "Lokasi saat ini " + user.location_range_name}</Text>
                <LibIcon name="map-marker" color={LibStyle.colorPrimary} />
              </TouchableOpacity>
            }
          </>
        }
        renderItem={(item: any, i: number) => {
          if (item.type == 'slider') {
            return (
              <>
                {
                  item.show_title == 1 &&
                  <ComponentSection key={i}
                    text={item.title}
                    textColor={"#333"}
                    icon={(item.show_more == 1 && item.params.more_module == '') ? " " : 'icons/ic_btn_more_rounded.png'}
                    moreAction={() => LibNavigation.navigate(item.params.more_module, { url: item.params.more_url, title: item.title })}
                  />
                }
                {
                  LibUtils.checkUndefined(item.list, "0") && typeof (item.list) != "string" &&
                  <View style={{ borderRadius: 5, height: sliderHeight, width: LibStyle.width - 20, margin: 10, marginBottom: 20 }} >
                    <LibCarrousel
                      delay={5000}
                      style={{ height: sliderHeight, width: LibStyle.width - 20 }}
                      autoplay
                      bullets
                      bulletStyle={{ width: 7, height: 7, backgroundColor: "#fff", borderRadius: 3.5, borderWidth: 0, marginHorizontal: 2 }}
                      chosenBulletStyle={{ width: 7, height: 7, backgroundColor: LibStyle.colorPrimaryGreen, borderRadius: 3.5, borderWidth: 0, marginHorizontal: 2 }}
                      bulletsContainerStyle={{ marginBottom: -15 }} >
                      {
                        item && item.list && item.list !== "null" && item.list !== "Failed to Access" && item.list !== "Empty data" && typeof (item.list) != "string" && item.list.length > 0 && item.list.map((item1: any, i: number) => (
                          <TouchableWithoutFeedback key={i} onPress={() => redirectSlider(item1)} >
                            <LibPicture source={{ uri: item1.image }} style={{ resizeMode: "cover", borderRadius: 5, height: sliderHeight, width: LibStyle.width - 20 }} />
                          </TouchableWithoutFeedback>
                        ))
                      }
                    </LibCarrousel>
                  </View>
                }
              </>
            )
          } else if (item.type == 'voucher'/*  && esp.isDebug() */) {
            return (
              <>
                {
                  LibUtils.checkUndefined(item.list, "0") && typeof (item.list) != 'string' &&
                  <View key={i} style={{ flexDirection: "row", marginHorizontal: 5, justifyContent: 'space-evenly' }} >
                    {
                      item.list.map((item: any, idx: number) => {
                        if (item.total) {
                          return (
                            <TouchableOpacity key={idx} activeOpacity={1} onPress={() => {
                              VegetablesIndexProperty.isLogin(() => {
                                LibNavigation.navigate("voucher/mine", { url: item.url })
                              })
                            }} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f1f1f1", padding: 10, borderRadius: 4, flex: 1, margin: 5 }} >
                              <LibPicture source={esp.assets('icons/voucher.png')} style={{ width: 30, height: 30 }} resizeMode="contain" />
                              <View style={{ flex: 1, marginLeft: 5 }} >
                                <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, color: "#b8b8b8", paddingBottom: 2 }} >{item.title}</Text>
                                <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 12, letterSpacing: 0, color: "#000" }} >{item.total}</Text>
                              </View>
                            </TouchableOpacity>

                          )
                        } else {
                          return (
                            <TouchableOpacity key={idx} activeOpacity={1} onPress={() => {
                              VegetablesIndexProperty.isLogin(() => {
                                LibNavigation.navigate("user/referral", { url: item.url })
                              })
                            }} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#f1f1f1", padding: 10, borderRadius: 4, flex: 1, margin: 5 }} >
                              <LibPicture source={esp.assets('icons/share.png')} style={{ width: 30, height: 30 }} resizeMode="contain" />
                              <View style={{ flex: 1, marginLeft: 5 }} >
                                <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, color: "#b8b8b8", paddingBottom: 2 }} >{item.title}</Text>
                                <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 12, letterSpacing: 0, color: "#000" }} >Dapatkan Voucher</Text>
                              </View>
                            </TouchableOpacity>
                          )
                        }
                      })
                    }
                  </View>
                }
              </>
            )
          }
          else if (item.type == 'promo'/*  && esp.isDebug() */) {
            return (
              <>
                {
                  LibUtils.checkUndefined(item.list, "0") && typeof (item.list) != "string" &&
                  <>
                    {
                      item.show_title == 1 &&
                      <ComponentSection
                        text={item.title}
                        textColor={'#000'}
                        icon={item.show_more == 1 && item.params.more_module == '' ? '' : 'icons/ic_btn_more_rounded.png'}
                        moreAction={() => LibNavigation.navigate(item.params.more_module, { url: item.params.more_url, title: item.title })}
                      />
                    }
                    <LibList
                      data={item && item.list && item.list !== "List produk kosong." && item.list.length > 0 && item.list}
                      style={{ marginHorizontal: 17 }}
                      horizontal
                      renderItem={(item: any, ix: number) => {
                        return (
                          <VoucherMini forClaim {...item} key={ix} />
                        )
                      }}
                    />
                  </>
                }
              </>
            )
          } else if (item.type == 'product_list') {
            return (
              <View>
                {
                  item.show_title == 1 &&
                  <ComponentSection
                    text={item.title}
                    textColor={LibStyle.colorRed}
                    icon={item.more_module == '' ? '' : 'icons/ic_btn_more_rounded.png'}
                    moreAction={() => LibNavigation.navigate('product/list', { url: item.params.more_url, title: item.title })}
                  />
                }
                <View style={{ flexDirection: 'row', padding: 8 }} >
                  <LibList
                    data={item && item.list && item.list !== "List produk kosong." && item.list.length > 0 && item.list}
                    horizontal
                    renderItem={(item: any, id: number) => {
                      return (
                        <ProductItem
                          key={id}
                          onPress={() => { LibNavigation.push('product/detail', { url: item.url }) }}
                          {...item}
                          fromHome
                        />
                      )
                    }}
                  />
                  {
                    item && item.list && item.list === "List produk kosong." &&
                    <View style={{ flex: 1, width: LibStyle.width, padding: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                      <LibPicture source={esp.assets("logo.png")} resizeMode="contain" style={{ height: 200, width: 200 }} />
                      <Text allowFontScaling={false} style={{ marginTop: 0, textAlign: 'center', fontFamily: "ArialBold", fontSize: 17, fontWeight: "600", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: LibStyle.colorPrimaryGreen, alignSelf: 'center' }} >{item.list}</Text>
                    </View>
                  }
                </View>
              </View>
            )
          } else if (item.type == 'menu') {
            return <VegetablesSection_menu data={item.list} item={item} />
          } else if (item.type == 'column') {
            return <VegetablesSection_view {...item.list} params={item.params} show_more={item.show_more} />
          }
          return null
        }}
      />
    </View>
  )
}