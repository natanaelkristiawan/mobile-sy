// withHooks

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { ComponentHeader, LibIcon, ComponentTouchable, LibStyle, LibUtils, ComponentFooter, ComponentButton, LibCollaps, useSafeState, LibNavigation, LibCurl, esp, LibPicture, LibLoading, LibProgress, usePersistState, LibToastProperty, VegetablesIndexProperty, LibDialog, CheckoutIndexPersist, ComponentSlidingup } from 'esoftplay';
import {AccordionList} from "accordion-collapse-react-native";
import HTML from 'react-native-render-html';

export interface CheckoutPaymentArgs {
  cart: any
  grand_total: number,
  shipping_cost: number,
  address: string,
  discount: number
}
export interface CheckoutPaymentProps {

}
export default function m(props: CheckoutPaymentProps): any {
  const [checkoutVoucher] = usePersistState<CheckoutIndexPersist>('checkout_index_voucher')
  let [dataPayment, setDataPayment] = useSafeState<any>([])
  let [idPayment, setIdPayment] = useSafeState<any>(0)
  let [payment, setPayment] = useSafeState<any>("")
  const [, , , delOffCart] = usePersistState<any>('offlineCart', [])
  const { address, cart, shipping_cost, grand_total, discount } = LibUtils.getArgsAll(props)
  const user = LibUtils.getReduxState('user_class')

  useEffect(() => {
    esp.log(cart);
    loadData()
  }, [])

  function loadData() {
    new LibCurl('payment', null,
      (res) => {
        setDataPayment(res)
      },
      (error) => {
        LibToastProperty.show(error)
      }, 1
    )
  }


  function useVoucherCheckout() {
    if (!payment) {
      LibToastProperty.show("Silahkan Pilih Metode Pembayaran")
      return
    }

    LibProgress.show("Mohon Tunggu")
    if (checkoutVoucher.id != '') {
      // kondisi jika ada voucher digunakan
      new LibCurl('voucher_use', { voucher_id: checkoutVoucher.id },
        (res) => {
          //lakukan order_produk
          orderProduct()
        }, (msg) => {
          //lakukan order_produk dengan notif voucher gagal
          LibToastProperty.show(msg + ' \nTransaksi Ini tidak mendapatkan potongan harga')
          orderProduct()
        }, 1)
    } else {
      // order tanpa voucher
      orderProduct()
    }
  }

  function orderProduct() {
    let post = {
      user_id: user.id,
      member_id: user.member_id,
      location_id: address.id,
      address: address.address,
      payment_id: idPayment,
      payment_title: payment.title,
      currency: "",
      notes: "",
      os_phone: Platform.OS
    }

    new LibCurl('midtrans/order', post, (result, msg) => {
      delOffCart()
      LibNavigation.backToRoot()
      LibNavigation.navigate('order/detail', { from: 'checkout/payment', url: result.url , byPassPayment: true })
      LibProgress.hide()
    }, (error) => {
      LibDialog.warning("Oopss..!", error)
      LibProgress.hide()
    }, 1)
  }
  function generateTutorial(description)
  {
    let tutorials:any = [];
    for (const property in description) {
      tutorials.push({
        name: property,
        description: convertDescription(description[property])
      })
    }
    return tutorials
  }


  function renderToHTML(data)
  {
    let response = '<div>';

    data.forEach(element => {
      response += `<div style="text-transform:uppercase;font-size:10;">${element.name}</div>`
      response += element.description
    });

    response += '</div>';

    return response
  }

  function convertDescription(description) {

    let list = '<ul style="margin:0;padding:0;">'

    description.forEach(element => {
      list += `<li style="font-size:10;">${element}</li>`;
    });

    list += '</ul>';

    return list;
  }

  function _head(item2)
  {
    return (

        <View style={[{ alignContent: 'center', alignItems: 'center', marginVertical: 5, marginLeft: 15, marginRight: 15, padding: 7, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: (item2.id == idPayment ? '#f6f6f6' : '#FFF') }, LibStyle.elevation(2)]}>
          <View style={{ alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <LibIcon name="arrow-down-circle" size={20} color={LibStyle.colorPrimaryGreen} style={{marginRight: 5}}/>
            <LibPicture source={{ uri: item2.image }} style={{ width: 35, height: 35 }} />
            <Text allowFontScaling={false} style={{ marginLeft: 15, fontFamily: "Arial", fontSize: 14, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, textAlign: "right", color: "#4a4a4a" }}>{item2.title}</Text>
          </View>
          {
            item2.id != idPayment &&
            <ComponentTouchable onPress={() => {
              setPayment(item2)
              setIdPayment(item2.id)
            }} >
              
              <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 13, color: "green", marginRight:20 }}>Pilih</Text>
            </ComponentTouchable>
          }
          
          {
            item2.id == idPayment &&
            <LibIcon name="checkbox-marked-circle" size={20} color={LibStyle.colorPrimaryGreen} style={{marginRight: 15}}/>
          }

        </View>

  
    )
  }

  function _body(item2)
  {

    const description = generateTutorial(item2.description)
    return (
      <View style={[{ marginVertical: 5, marginLeft: 15, marginRight: 15, padding: 7, backgroundColor: "white", ...LibStyle.elevation(2) }, LibStyle.elevation(2)]} >
        <HTML html={renderToHTML(description)} />
      </View>
    )
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader title="Pembayaran" btnBack />
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View style={{ flexDirection: 'row', marginTop: 15, margin: 15, backgroundColor: '#B3F2E9', padding: 10, alignItems: 'center', borderRadius: 5 }}>
            <LibIcon name="alert-decagram" color="#046659" />
            <Text allowFontScaling={false} numberOfLines={2} style={{ flex: 1, flexWrap: 'wrap', fontFamily: "Arial", marginLeft: 10, fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659" }}>Silahkan periksa kembali pesanan Anda dan Pilih metode pembayaran</Text>
          </View>

          <ComponentTouchable
            style={[{ flexDirection: 'row', marginTop: 0, margin: 15, backgroundColor: '#fff', padding: 10, paddingBottom: 15, paddingTop: 15, alignItems: 'center', borderRadius: 5, justifyContent: 'space-between' }, LibStyle.elevation(3)]}
            onPress={() => {
              LibNavigation.navigate('checkout/detail_bill', {
                data: {
                  ...cart,
                  grand_total: grand_total,
                  discount: discount
                }
              })
            }} >
            <Text allowFontScaling={false} style={{ fontSize: 18, color: LibStyle.colorPrimaryGreen, fontWeight: 'bold' }}>{LibUtils.money(grand_total)}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text allowFontScaling={false} numberOfLines={2} style={{ marginRight: 10, fontFamily: "Arial", marginLeft: 10, fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659" }}>Detail Tagihan</Text>
              <LibIcon name="chevron-right" />
            </View>
          </ComponentTouchable>

          <View style={{ marginRight: 15, padding: 15, backgroundColor: '#fff', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 15, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#606a7b" }} >Pilih Metode Pembayaran</Text>
          </View>

          {
            dataPayment.length == 0 &&
            <View style={{ height: LibStyle.height * 0.5, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <LibLoading />
            </View>
          }
          {
            dataPayment && dataPayment.length > 0 && dataPayment.map((item: any, i: number) => {
              return (
                <View key={i} >
                  <Text allowFontScaling={false} numberOfLines={2} ellipsizeMode={"tail"} style={{ marginLeft: 20, margin: 15, fontFamily: "Arial", fontSize: 14, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#4a4a4a" }}>{item.title}</Text>
                  {
                    item.type == 4 &&
                    <ComponentTouchable onPress={() => {
                      setPayment(item)
                      setIdPayment(item.id)
                    }} >
                      <View style={[{ alignContent: 'center', alignItems: 'center', marginVertical: 5, marginLeft: 15, marginRight: 15, padding: 7, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: /* user.saldo < (totalBill + charge) ? '#f6f6f6' : item.id == idPayment ? '#f6f6f6' : */ '#FFF' }, LibStyle.elevation(2)]}>
                        <View style={{ alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                          <LibPicture source={{ uri: item.image }} style={{ width: 35, height: 35 }} />
                          <Text allowFontScaling={false} style={{ marginLeft: 15, fontFamily: "Arial", fontSize: 14, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, textAlign: "right", color: "#4a4a4a" }}>{item.title}</Text>
                        </View>

                        <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, textAlign: "right", color: "#4a4a4a" }}>{LibUtils.money("0")}</Text>
                        {
                          item.id == idPayment &&
                          <LibIcon name="checkbox-marked-circle" size={20} color={LibStyle.colorPrimaryGreen} />
                        }
                        {/* <Image style={{ width: 13, height: 13, alignSelf: 'center' }} source={esp.assets('icons/ic_chevron_right.png')} /> */}
                      </View>
                    </ComponentTouchable>
                    ||
                    item.list && <AccordionList
                      list={item.list}
                      header={_head}
                      body={_body}
                      keyExtractor={item => `${item.id}`}
                    /> 
                    // item.list.map((item2: any, i2: number) => {

                    //   return(
                        

                    //   )


                      // return (
                        



                      //   <TouchableOpacity activeOpacity={1} key={i2} onPress={() => {
                      //     setPayment(item2)
                      //     setIdPayment(item2.id)
                      //   }} >
                      //     <View style={[{ alignContent: 'center', alignItems: 'center', marginVertical: 5, marginLeft: 15, marginRight: 15, padding: 7, justifyContent: 'space-between', flexDirection: 'row', backgroundColor: (item2.id == idPayment ? '#f6f6f6' : '#FFF') }, LibStyle.elevation(2)]}>
                      //       <View style={{ alignContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                      //         <LibPicture source={{ uri: item2.image }} style={{ width: 35, height: 35 }} />
                      //         <Text allowFontScaling={false} style={{ marginLeft: 15, fontFamily: "Arial", fontSize: 14, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, textAlign: "right", color: "#4a4a4a" }}>{item2.title}</Text>
                      //       </View>
                      //       {
                      //         item2.id == idPayment &&
                      //         <LibIcon name="checkbox-marked-circle" size={20} color={LibStyle.colorPrimaryGreen} />
                      //       }
                      //       {/* <Image style={{ width: 13, height: 13, alignSelf: 'center' }} source={esp.assets('icons/ic_chevron_right.png')} /> */}
                      //     </View>
                      //   </TouchableOpacity>
                      // )
                  }
                  
                </View>
              )
            })
          }

        </View>
      </ScrollView>

      <ComponentFooter view={
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
            <ComponentButton label={"Bayar"} onPress={() => {
              // orderProduct()
              useVoucherCheckout()
            }} />
          </View>
        </View>
      } />
    </View>
  )
}