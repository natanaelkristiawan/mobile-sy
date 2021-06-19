// withHooks

import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { ComponentHeader, LibPicture, LibStyle, LibUtils, LibScroll, ComponentTouchable, LibIcon, useSafeState, ComponentFooter, esp, LibDialog, LibCurl, LibLoading, LibNavigation, ComponentButton, LibCarrousel, ProductItem, LibFocus, usePersistState, LibObject, ComponentBadge, LibToastProperty, VegetablesIndexProperty, LibList, LibStatusbar, LibInput, LibKeyboard_avoid, LibTextstyle, applyStyle } from 'esoftplay';

export interface ProductDetailProps {

}
export default function m(props: ProductDetailProps): any {

  const [result, setResult] = useSafeState<any>('')
  const [_qty, set_qty] = useSafeState<any>(1)
  const url = LibUtils.getArgs(props, 'url')
  const [offCart, setOffCart, reOffCart, delOffCart] = usePersistState<any>('offlineCart', [])
  const user = LibUtils.getReduxState('user_class')

  useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    if (url == '') {
      LibDialog.warning("Kesalahan", "Produk Tidak ditemukan")
    } else {
      new LibCurl(url, null, (result, msg) => {
        setResult(result)
        esp.log(result.related.list);
      }, (error) => {
        LibDialog.warning("Kesalahan", error)
      })
    }
  }

  function add(): void {
    set_qty(_qty + 1)
  }

  function min(): void {
    set_qty(_qty == 1 ? 1 : _qty - 1)
  }

  if (!result) {
    return <LibLoading />
  }

  function addToCartCurl(value: any) {
    let post = {
      product_id: value.product_id,
      qty: _qty,
      notes: '',
    }

    new LibCurl('cart', post, (result, msg) => {
      viewAddToCart()
      // for update count cart
      new LibCurl('cart_list', null, (result, msg) => {
        setOffCart(result.list)
      }, (error) => {
        // LibToastProperty.show(error)
      })

    }, (error) => {
      LibDialog.warning("Kesalahan", error)
      // LibToastProperty.show(error)
    })
  }

  function viewAddToCart() {
    LibDialog.custom(
      <View>

        <View style={{ marginTop: -10, padding: 10 }}>
          <Text allowFontScaling={false} style={{ marginBottom: 10, fontFamily: "Arial", fontSize: 14, marginTop: 10, color: "#B9B7B7" }} numberOfLines={2} >Item yang dipilih</Text>

          {/* View untuk image sak deret */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Image source={{ uri: result.image }} style={{ resizeMode: 'cover', height: 100, width: 100 }} />
            <View style={{ marginLeft: 10, justifyContent: 'space-between', flex: 1 }}>
              <View style={{ flex: 1 }}>
                <Text allowFontScaling={false} style={{ flex: 1, fontFamily: "Arial", fontSize: 15, color: "#B9B7B7", flexWrap: 'wrap' }} ellipsizeMode={"tail"} numberOfLines={2} >{LibUtils.ucwords(result.title)}</Text>
                <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14, fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b" }}>Qty {_qty}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignContent: 'flex-end', alignItems: 'flex-end' }}>
                <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, color: "#B9B7B7", marginTop: 4 }} >Total</Text>
                <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, color: "#B9B7B7", marginTop: 4 }} >{LibUtils.money((_qty * result.sale))}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15, paddingBottom: 0 }}>
            <ComponentTouchable onPress={() => {
              LibDialog.hide()
            }}>
              <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 11, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: LibStyle.colorRed }}>LANJUT BELANJA</Text>
            </ComponentTouchable>
            <ComponentTouchable onPress={() => {
              LibDialog.hide()
              LibNavigation.navigate('cart/index', { from: 'detailProduct' })
            }}>
              <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 11, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: LibStyle.colorPrimaryGreen }}>LIHAT KERANJANG</Text>
            </ComponentTouchable>
          </View>
        </View>
        <View style={{ position: 'absolute', top: -20, right: -20, borderRadius: 12.5, backgroundColor: 'white' }}>
          <ComponentTouchable onPress={() => { LibDialog.hide() }}>
            <LibIcon name="close-circle-outline" size={25} />
          </ComponentTouchable>
        </View>
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <LibStatusbar style="dark" />
      <LibKeyboard_avoid style={{ flex: 1 }} >

        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          {/* <View style={{ height: LibStyle.STATUSBAR_HEIGHT, backgroundColor: '#fff' }} /> */}
          <LibCarrousel
            delay={5000}
            style={{ height: LibStyle.width, width: LibStyle.width }}
            autoplay
            bullets
            bulletStyle={{ width: 7, height: 7, backgroundColor: "#7e7e7e", borderRadius: 3.5, borderWidth: 0, marginHorizontal: 2 }}
            chosenBulletStyle={{ width: 7, height: 7, backgroundColor: "white", borderRadius: 3.5, borderWidth: 0, marginHorizontal: 2 }}
            bulletsContainerStyle={{ marginBottom: -15 }} >
            {
              result && result.images.length > 0 && result.images.map((item: any, i: number) => {
                return (
                  <ComponentTouchable key={i} onPress={() => { LibNavigation.navigate('content/gallery', { images: result.images, index: i }) }}>
                    <LibPicture resizeMode="cover" source={{ uri: item.image }} style={{ height: LibStyle.width, width: LibStyle.width }} />
                  </ComponentTouchable>
                )
              })
            }
          </LibCarrousel>

          <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 20, textAlign: 'center', color: "#9b9b9b", marginTop: 15 }} numberOfLines={1} >{LibUtils.ucwords(result.title)}</Text>
          {
            (result?.sub_title != '' && result?.sub_title) && <LibTextstyle textStyle="caption2" text={result.sub_title} style={{ textAlign: 'center', color: "#888" }} />
          }
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 15, textAlign: 'center', marginTop: 10, color: "#B9B7B7" }} >{result.unit_qty} {result.unit_name}</Text>
          {
            parseInt(result.price) > parseInt(result.sale) &&
            <View style={applyStyle({ flexDirection: 'row', alignItems: 'center', marginBottom: 5, justifyContent: "center", marginTop: 10 })}>
              <Text allowFontScaling={false} style={applyStyle({ fontFamily: "Arial", fontSize: 9, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#B9B7B7", textDecorationLine: 'line-through' })} >{LibUtils.money(result.price)}</Text>
              <View style={{ borderRadius: 3, backgroundColor: "#FF5501", paddingHorizontal: 6, marginLeft: 4, paddingVertical: 3 }} >
                {
                  result.discount.includes('%') ?
                    <LibTextstyle textStyle="caption2" text={result?.discount_text + ' ' + result.discount} style={{ color: "white", fontFamily: "Arial", fontWeight: "bold", fontSize: 9 }} />
                    :
                    <LibTextstyle textStyle="caption2" text={result?.discount_text + ' ' + LibUtils.money(result.discount)} style={{ color: "white", fontFamily: "Arial", fontWeight: "bold", fontSize: 9 }} />
                }
              </View>
            </View>
          }
          <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 16, textAlign: 'center', marginTop: 5, color: "red" }} >{LibUtils.money(result.sale)}</Text>

          <View style={{ flexDirection: 'row', alignContent: 'center', alignItems: 'center', alignSelf: 'center', marginTop: 10 }}>
            <ComponentTouchable onPress={() => { min() }}>
              <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: "#ecf0f1", alignContent: 'center', alignItems: 'center' }}>
                <LibIcon name="minus" color="#e74c3c" />
              </View>
            </ComponentTouchable>
            <Text style={{ fontFamily: "Arial", fontSize: 20, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b", marginLeft: 13, marginRight: 13 }}>{_qty}</Text>
            <ComponentTouchable onPress={() => { add() }}>
              <View style={{ width: 28, height: 28, borderRadius: 6, backgroundColor: "#ecf0f1", alignContent: 'center', alignItems: 'center' }}>
                <LibIcon name="plus" color="#16a085" />
              </View>
            </ComponentTouchable>
          </View>
          {
            result.description !== "" &&
            <View style={{ margin: 15, backgroundColor: '#F4F4F4', padding: 10, borderRadius: 6 }}>
              <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 15, color: "#9b9b9b" }} numberOfLines={2} >Deskripsi</Text>
              <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, marginTop: 7, color: "#9b9b9b", textAlign: 'justify' }} >{result.description}</Text>
            </View>
          }
          {
            result && result.related && result.related.list.length > 0 &&
            <Text allowFontScaling={false} style={{ margin: 15, fontFamily: "Arial", fontSize: 15, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#000", marginTop: 10 }} numberOfLines={1} ellipsizeMode={"tail"} >Produk Terkait</Text>
          }

          <View style={{ flexDirection: 'row', padding: 8 }} >
            <LibList
              data={result && result.related.list && result.related.list.length > 0 && result.related.list}
              horizontal
              renderItem={(item: any, i: number) => {
                return (
                  <View style={{ borderTopWidth: 1, borderTopColor: "#f4f4f4" }} key={i} >
                    <ProductItem
                      onPress={() => {
                        result.id !== item.id && LibNavigation.replace('product/detail', { url: item.url })
                      }}
                      {...item}
                      fromHome
                    />
                  </View>
                )
              }}
            />
          </View>
          {
            (result?.label_name != '' && result?.label_name) &&
            <View style={{ position: "absolute", top: 60 + LibStyle.STATUSBAR_HEIGHT, left: -1 }} >
              <View style={{ backgroundColor: result.label_color || '#898181', paddingHorizontal: 10 }} >
                <LibTextstyle textStyle={'caption1'} text={result.label_name} style={{ color: "white" }} />
              </View>
            </View>
          }
        </ScrollView>
        <View style={{ flexDirection: 'row', marginBottom: 15, marginLeft: 15 }}>
          <ComponentTouchable onPress={() => {
            LibNavigation.backToRoot()
          }}>
            <View style={{ paddingLeft: 15, height: 40, borderBottomLeftRadius: 5, borderTopLeftRadius: 5, justifyContent: 'center', alignContent: 'center', alignItems: 'center', paddingRight: 20, backgroundColor: LibStyle.colorGrey }}>
              <Image style={{ height: 24, width: 24, resizeMode: 'contain' }} source={esp.assets('icons/home.png')} />
            </View>
          </ComponentTouchable>
          <View style={{ flex: 1, marginRight: 10, marginLeft: -10 }}>
            <ComponentButton onPress={() => {
              VegetablesIndexProperty.isLogin(() => {
                let item = {
                  product_id: result.id,
                  product_name: result.title,
                  image: result.image,
                  price: parseInt(result.price),
                  sale: parseInt(result.sale)
                }
                if (user) {
                  addToCartCurl(item)
                }
              })
              // viewAddToCart()

            }} label="TAMBAH KE KERANJANG" />
          </View>
        </View>

        <View style={{ top: LibStyle.STATUSBAR_HEIGHT, flex: 1, width: LibStyle.width, justifyContent: 'space-between', position: "absolute", flexDirection: 'row', padding: 15, paddingVertical: 10, alignItems: 'center', height: 60 }} >
          <TouchableOpacity activeOpacity={1} hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }} onPress={() => {
            LibNavigation.back()
          }} >
            <Image style={{ height: 27, width: 27 }} source={esp.assets('icons/ic_header_back.png')} />
          </TouchableOpacity>
          <ComponentTouchable style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center', height: 27, width: 27, borderRadius: 13.5, backgroundColor: '#fff', borderColor: LibStyle.colorPrimaryGreen, borderWidth: 1 }}
            onPress={() => {
              LibNavigation.navigate('cart/index', { from: 'detailProduct' })
            }} >
            <LibIcon name="cart" size={15} color={LibStyle.colorPrimaryGreen} />
            <ComponentBadge counter={offCart && offCart.length > 0 ? offCart.length : 0} />
          </ComponentTouchable>
        </View>
      </LibKeyboard_avoid>
    </View>
  )
}