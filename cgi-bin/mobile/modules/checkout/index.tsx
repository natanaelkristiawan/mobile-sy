// withHooks

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ComponentHeader, LibScroll, CartItems, LibIcon, LibStyle, ComponentTouchable, LibNavigation, useSafeState, LibCurl, LibUtils, LibFocus, usePersistState, ComponentButton, LibToastProperty, LibTextstyle, esp, VoucherMineProperty, VoucherDetail, CheckoutIndexProperty, UserData, CheckoutPaymentArgs } from 'esoftplay';

export interface CheckoutIndexProps {

}

export function countDiscount(grand_total: number, total_price: number, voucher: any, setDiscount: (disc: number) => void, setTotal: (total: number) => void): any {
  let total = 0
  let discount = 0
  if (total_price >= parseInt(voucher.order_minimum)) {
    if (voucher.amount.includes('%')) {
      let percentage = voucher.amount.replace('%', '')
      discount = (parseInt(percentage) / 100) * total_price
      if (discount > parseInt(voucher.amount_max)) {
        total = grand_total - parseInt(voucher.amount_max)
        setDiscount(parseInt(voucher.amount_max))
      } else {
        total = grand_total - discount
        setDiscount(discount)
      }
    } else {
      total = grand_total - parseInt(voucher.amount)
      setDiscount(parseInt(voucher.amount))
    }
  } else {
    total = grand_total
  }
  setTotal(total)
}

export interface CheckoutIndexPersist {
  id: string,
  amount: string,
  amount_max: string,
  order_minimum: string,
  title: string
}

export default function m(props: CheckoutIndexProps): any {
  const init = { id: '', amount: '', amount_max: '', order_minimum: '', title: '' }
  const [checkoutVoucher, setCheckoutVoucher] = usePersistState<CheckoutIndexPersist>('checkout_index_voucher', init)
  UserData.register('checkout_index_voucher')
  const [res, setRes] = useSafeState<any>([])
  const [address, setAddress] = useSafeState<any>()
  const [cart, setCart] = useSafeState<any>()
  const [total, setTotal] = useSafeState(0)
  const [discount, setDiscount] = useSafeState(0)

  function validateVoucher(result: any) {
    new LibCurl('voucher_validate?voucher_id=' + checkoutVoucher.id, { total_order: result.total_price },
      (res) => {
        //voucher valid
        esp.log("valid", res);
        CheckoutIndexProperty.countDiscount(result.grand_total, result.total_price, checkoutVoucher, setDiscount, setTotal)
      }, (msg) => {
        //voucher invalid
        esp.log("invalid", msg);
        setCheckoutVoucher(init)
      }, 1
    )
  }

  function reloadCart() {
    new LibCurl('cart_list', null, (res, msg) => {
      if (checkoutVoucher.id != '') {
        if (res.total_price < parseInt(checkoutVoucher.order_minimum)) {
          setCheckoutVoucher(init)
        } else {
          validateVoucher(res)
        }
      } else {
        CheckoutIndexProperty.countDiscount(res.grand_total, res.total_price, checkoutVoucher, setDiscount, setTotal)
      }
      esp.log(res);
      setCart(res)
    }, (msg) => {
      LibToastProperty.show(msg)
    })
  }

  useEffect(() => {
    loadData()
    reloadCart()
  }, [total, checkoutVoucher, discount])

  function loadData() {
    new LibCurl('location_member', null, (res, msg) => {
      setRes(res)
      var a = res.filter((item: any) => item?.is_primary == "1")
      setAddress(a[0])
    }, (error) => {
      // LibToastProperty.show(error)
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F8' }}>
      <ComponentHeader title="Checkout" btnBack />
      <LibFocus
        onFocus={() => { loadData(); reloadCart(); }} />
      <LibScroll style={{ flex: 1 }}>
        {
          res && res.filter((item: any) => item.is_primary == "1").map((item: any, i: number) => {
            return (
              <ComponentTouchable key={i} style={{ marginTop: 20 }} onPress={() => { LibNavigation.navigate('user/address_list', { data: res }) }}>
                <View style={[{ flex: 1, flexDirection: 'row', padding: 10, backgroundColor: '#fff', marginBottom: 0 }, LibStyle.elevation(8)]}>
                  <View >
                    <LibIcon name="map-marker" size={25} />
                  </View>
                  <View style={{ marginLeft: 5, flex: 1 }}>
                    <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", marginTop: 4, fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#606a7b" }} >{item?.name}</Text>
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginTop: 4, fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#606a7b" }} numberOfLines={3} ellipsizeMode={"tail"} >{item?.address + " | " + item?.phone}</Text>
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#606a7b" }} numberOfLines={3} ellipsizeMode={"tail"} >{(item?.village_name || item?.location_detail?.village?.title) + " - " + item?.location_detail?.district?.title + " - " + item?.location_detail?.city?.title + ", " + item?.location_detail?.state?.title + ", " + item?.zipcode}</Text>
                  </View>
                  <View style={{ marginRight: 5, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <LibIcon name="chevron-right" size={30} />
                  </View>
                </View>
              </ComponentTouchable>
            )
          })
        }
        {
          res &&
          <View style={{ margin: 15 }}>
            <ComponentButton onPress={() => { LibNavigation.navigate('user/address_list', { data: res }) }} label="Pilih Alamat" />
          </View>
        }
        {
          cart && cart.list.length > 0 && cart.list.map((item: any, i: number) => {
            return (
              <CartItems
                key={i}
                {...item}
                freeze
                onPressDelete={() => { }}
                onPress={() => { }}
                onPressAdd={() => { }}
                onPressMin={() => { }}
                checkout />
            )
          })
        }

        {/* <ComponentTouchable onPress={() => { }} style={[{ marginBottom: 10, padding: 15, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }, LibStyle.elevation(3)]}>
          <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#606a7b" }} >Metode Pembayaran</Text>
          <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <LibIcon name="chevron-right" size={20} />
          </View>
        </ComponentTouchable> */}

        <View style={{ padding: 15, backgroundColor: '#fff', paddingTop: 7 }}>
          <View style={{ height: 30, justifyContent: 'center', alignContent: 'center' }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 16, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#333942" }} >Ringkasan</Text>
          </View>
          <View style={{ marginTop: 10, flexDirection: 'row', height: 30, justifyContent: 'space-between', alignContent: 'center' }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", color: "#333942" }}>Total Harga Produk</Text>
            <Text allowFontScaling={false}>{LibUtils.money(cart && cart.total_price)}</Text>
          </View>
          <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between', alignContent: 'center' }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", color: "#333942" }}>Ongkos Kirim</Text>
            <Text allowFontScaling={false}>{LibUtils.money(cart && cart.shipping_cost)}</Text>
          </View>
          {/* {
            cart && cart.discount > 0 &&
            <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between', alignContent: 'center' }}>
              <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", color: "#333942" }}>Potongan Harga</Text>
              <Text style={{ color: LibStyle.colorRed }} allowFontScaling={false}>-{LibUtils.money(cart && cart.discount)}</Text>
            </View>
          } */}
          {
            (discount != 0) &&
            <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between', alignContent: 'center' }}>
              <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", color: "#333942" }}>Potensi Potongan Harga</Text>
              <Text style={{ color: LibStyle.colorRed }} allowFontScaling={false}>-{LibUtils.money(discount)}</Text>
            </View>
          }
          <View style={{ flexDirection: 'row', height: 30, justifyContent: 'space-between', alignContent: 'center' }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", color: "#333942" }}>Total Pembayaran</Text>
            {/* <Text allowFontScaling={false}>{LibUtils.money(cart && cart.grand_total)}</Text> */}
            <Text allowFontScaling={false}>{LibUtils.money(total)}</Text>
          </View>
        </View>

      </LibScroll>
      {
        // esp.isDebug() &&
        <TouchableOpacity activeOpacity={1}
          onPress={() => {
            LibNavigation.navigateForResult('voucher/mine', undefined, 4).then((x) => {
              if (Number(cart.total_price) >= Number(x.order_minimum)) {
                setCheckoutVoucher({ ...x })
              } else {
                LibToastProperty.show('Minimal pembelian produk adalah ' + LibUtils.money(x.order_minimum) + ' untuk dapat menggunakan voucher ini')
                setCheckoutVoucher(checkoutVoucher)
              }
            })
            // }
          }}
          style={{ backgroundColor: "white", ...LibStyle.elevation(2), borderRadius: 6, marginHorizontal: 10, marginVertical: 10, paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", alignItems: 'center' }} >
          <LibIcon.EntypoIcons name='ticket' />
          <View style={{ flex: 1, marginLeft: 10 }} >
            <LibTextstyle textStyle="caption2" text="Voucher Digunakan" />
            {/* <LibTextstyle textStyle="callout" text={LibUtils.checkUndefined(cart, 'voucher_detail.id') && cart.voucher_detail.title || "Belum ada Voucher"} style={{}} /> */}
            <LibTextstyle textStyle="callout" text={checkoutVoucher?.title || "Belum ada Voucher digunakan"} style={{}} />
          </View>
          {
            checkoutVoucher.id == '' ?
              <LibIcon.SimpleLineIcons name="arrow-right" size={18} />
              :
              <TouchableOpacity hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }} onPress={() => { setCheckoutVoucher(init); setDiscount(0) }} >
                <LibIcon.SimpleLineIcons name="close" size={20} />
              </TouchableOpacity>
          }
        </TouchableOpacity>
      }
      <View style={{ padding: 10, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View>
          <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 14, fontStyle: "normal", letterSpacing: 0, color: "#333942" }} >Total Pembayaran</Text>
          <Text allowFontScaling={false} style={{ fontSize: 18, color: LibStyle.colorPrimaryGreen, fontWeight: 'bold' }}>{LibUtils.money(total)}</Text>
        </View>
        <View style={{ width: LibStyle.width * 0.5 }}>
          <ComponentButton label="Pembayaran" fontColor={total == 0 ? '#909090' : 'white'} backgroundColor={total == 0 ? LibStyle.colorGrey : LibStyle.colorPrimaryGreen} onPress={() => {
            if (total != 0) {
              if (address) {
                LibNavigation.push<CheckoutPaymentArgs>('checkout/payment', { cart: cart, grand_total: total, discount: discount, shipping_cost: cart && cart.shipping_cost, address: address })
              } else {
                LibToastProperty.show("Silahkan Pilih Alamat anda")
              }
            }
          }} />
        </View>
      </View>
    </View>
  )
}