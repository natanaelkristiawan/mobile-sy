// withHooks

import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, Keyboard } from 'react-native';
import {
  ComponentHeader,
  LibUtils,
  LibStyle,
  ComponentFooter,
  ComponentButton,
  LibNavigation,
  CartItems,
  usePersistState,
  esp,
  LibPicture,
  VegetablesIndexProperty,
  LibObject,
  LibDialog,
  LibList,
  LibCurl,
  LibToastProperty,
  VegetablesState,
  LibFocus,
  VoucherMineProperty,
  LibSlidingup,
  LibKeyboard_avoid
} from 'esoftplay';

export interface CartIndexProps {

}

export default function m(props: CartIndexProps): any {

  const [offCart, setOffCart] = usePersistState<any>('offlineCart', [])
  let subTotal = useRef<number>(0).current
  // const from = LibUtils.getArgs(props, 'from')
  const user = LibUtils.getReduxState('user_class')
  const [result] = VegetablesState().useState()

  subTotal = useMemo(() => offCart?.reduce?.((acc: number, cur: any) => acc + (cur?.sale * cur?.qty), 0), [offCart])

  useEffect(() => {
    loadData()
  }, [])


  function setNotes(product_id: string, text: string) {
    LibUtils.debounce(() => {
      new LibCurl('cart_edit?product_id=' + product_id, { notes: text }, (result, msg) => {
        loadData()
      }, (error) => {
        LibToastProperty.show(error)
      })
    }, 150)
  }

  function loadData() {
    if (user) {
      new LibCurl('cart_list', null, (result, msg) => {
        setOffCart(result.list)
      }, (error) => {
        LibToastProperty.show(error)
      }, 1)
    }
  }

  function deleteItem(item: any, index: any) {
    LibDialog.warningConfirm("Peringatan", "Hapus Produk ini ?",
      "Ya", () => {
        if (user) {
          var post = {
            product_id: item.product_id,
            user_id: user.id,
            member_id: user.member_id,
          }
          new LibCurl('cart_delete', post, (result, msg) => {
            let updCart = LibObject.splice(offCart, index, 1)()
            setOffCart(updCart)
          }, (error) => {
            LibToastProperty.show(error)
          })

        } else {
          let updCart = LibObject.splice(offCart, index, 1)()
          setOffCart(updCart)
        }
      },
      "Batal", () => { })
  }

  function editQtyCurl(item: any, qty: number) {
    LibUtils.debounce(() => {
      let post = {
        qty: qty,
      }
      new LibCurl('cart_edit?product_id=' + item.product_id, post, (result, msg) => {
        loadData()
      }, (error) => {
        LibToastProperty.show(error)
      })
    }, 150)
  }

  function minQty(item: any, index: number) {
    if (parseInt(offCart[index].qty) > 1) {
      if (user) {
        let updCart = LibObject.set(offCart, parseInt(offCart[index].qty) - 1)(index, "qty")
        editQtyCurl(item, updCart[index].qty)
        setOffCart(updCart)
      }
    }
  }

  function addQty(item: any, index: number) {
    if (user) {
      let updCart = LibObject.set(offCart, parseInt(offCart[index].qty) + 1)(index, "qty")
      editQtyCurl(item, updCart[index].qty)
      setOffCart(updCart)
    }
  }

  return (
    <LibKeyboard_avoid style={{ flex: 1, backgroundColor: '#F6F7F8' }}>
      <ComponentHeader title={"Keranjang Belanja"} btnBack onBack={() => VegetablesIndexProperty.setTab(0)} />
      <LibFocus onFocus={() => { loadData() }} />
      <LibList
        key={offCart}
        data={offCart}
        onRefresh={() => loadData()}
        ListEmptyComponent={() => {

          return (
            <View style={{ flex: 1, height: LibStyle.height, paddingBottom: 100 + LibStyle.STATUSBAR_HEIGHT, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <LibPicture source={esp.assets("logo.png")} resizeMode="contain" style={{ height: 300, width: 300 }} />
              <Text allowFontScaling={false} style={{ marginTop: 0, fontFamily: "ArialBold", fontSize: 17, fontWeight: "600", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: LibStyle.colorPrimaryGreen, alignSelf: 'center' }} >Wah, Keranjang Belanja masih Kosong</Text>
              <View style={{ marginTop: 20, marginLeft: 50, marginRight: 50 }}>
                <ComponentButton label="Belanja Sekarang"
                  backgroundColor={LibStyle.colorGrey} borderColor={LibStyle.colorPrimaryGreen} fontColor={LibStyle.colorPrimaryGreen}
                  onPress={() => {
                    VegetablesIndexProperty.setTab(0)
                  }}
                />
              </View>
            </View>
          )
        }}
        renderItem={(item, i) => {
          return (
            <CartItems {...item}
              key={i}
              onPressDelete={() => { deleteItem(item, i) }}
              onPress={() => { }}
              onBlur={() => { }}
              onChangeNotes={(t) => setNotes(item.product_id, t)}
              onPressAdd={() => { addQty(item, i) }}
              onPressMin={() => { minQty(item, i) }}
            />
          )
        }}
      />
      {
        offCart && offCart.length > 0 &&
        <ComponentFooter view={
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10 }}>
            <Text allowFontScaling={false} numberOfLines={2} style={{ flexWrap: "wrap", marginRight: 20, fontFamily: "ArialBold", fontSize: 14, fontWeight: "600", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#333942", alignSelf: 'center' }} >Subtotal : {LibUtils.money(subTotal)}</Text>
            <View style={{ flex: 1 }}>
              <ComponentButton label={"Checkout"} onPress={() => {
                Keyboard.dismiss()
                VegetablesIndexProperty.isLogin(() => {
                  LibNavigation.navigate('checkout/index', { priceTotal: subTotal, shipping_cost: result.config.shipping_cost })
                })
              }} style={{ marginRight: -10 }} />
            </View>
          </View>
        } />
      }
    </LibKeyboard_avoid>
  )
}