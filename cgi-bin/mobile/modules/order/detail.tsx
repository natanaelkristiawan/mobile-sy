// withHooks

import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, Linking } from 'react-native';
import { ComponentHeader, LibIcon, LibUtils, LibStyle, ComponentTouchable, LibNavigation, ComponentFooter, ComponentButton, esp, LibCurl, useSafeState, LibLoading, LibCollaps, ComponentSlidingup, LibImage, ComponentCircle, LibPicture, ComponentLabel_input, ComponentInput_circle, usePersistState, LibToastProperty, LibProgress, VegetablesIndexProperty, OrderIndexProperty, LibDialog, ProfileIndexProperty } from 'esoftplay';
import moment from 'moment/min/moment-with-locales'
import { useSelector } from 'react-redux';

export interface OrderDetailProps {

}
export default function m(props: OrderDetailProps): any {

  const user = LibUtils.getReduxState('user_class')
  const from = LibUtils.getArgs(props, "from")
  const url = LibUtils.getArgs(props, "url")
  const byPassPayment = LibUtils.getArgs(props, "byPassPayment", false)
  const [banks, setBanks] = usePersistState<any>('banks')
  const [data, setData] = useSafeState<any>("")
  const [midtrans, setMidtrans] = useSafeState<any>("")
  const [image, setImage] = useSafeState<string>('')
  let dialogUploadImage = React.useRef<ComponentSlidingup>(null)
  const tabIndex = useSelector((state: any) => state.vegetables_index.tabIndex)
  const [activeGroupId] = ProfileIndexProperty.groupIdState().useState()

  //for confirm payment
  const [_bank, set_bank] = useSafeState<any>("")
  let bankName = useRef<ComponentInput_circle>(null)
  let inputBankName = useRef<ComponentInput_circle>(null)
  let inputBankNumber = useRef<ComponentInput_circle>(null)

  let imageUrl = {
    bca: 'https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336137510-758f10ec383cb349ffee7bc0fa516c3f.png?tr=q-75&w=51',
    mandiri: 'https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336144166-e6e7ce40ff72a97e6e0eeeabda7595d7.png?tr=q-75&w=51',
    bni: 'https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336148727-34b7516141fad67cf3b28a682ab0cc93.png?tr=q-75&w=51',
    bri: 'https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336152817-f0ef4ea005ad461b4b2cd0a8fdec6628.png?tr=q-75&w=51',
  };

  useEffect(() => {
    loadData()
    new LibCurl('bank', null,
      (res) => {
        setBanks(res.bank)
      },
      () => {

      }
    )


    
  }, [])

  function loadData() {

    new LibCurl(url, null, (result, msg) => {
      setData(result)

      esp.log(result, "result woy");
      new LibCurl('midtrans/detail-payment', {id:result.id}, (callback, msg) => {
        setMidtrans(callback)
        esp.log(callback, "result detail payment");
        
      },(error) => {
      }, 1)




      esp.log(result, "ini result lo");
      }, (error) => {
    }, 1)


  }


  function confirmPayment() {

    if (_bank == "") {
      LibToastProperty.show("Silahkan Pilih Nama Bank terlebih dahulu")
      return
    }
    if (inputBankName.current!.getText() == "") {
      LibToastProperty.show("Silahkan Masukkan Nama anda terlebih dahulu")
      return
    }
    if (inputBankNumber.current!.getText() == "") {
      LibToastProperty.show("Silahkan Masukkan No.Rekening anda terlebih dahulu")
      return
    }
    if (image == "") {
      LibToastProperty.show("Silahkan Upload Bukti Pembayaran terlebih dahulu")
      return
    }

    let post = {
      user_id: user.id,
      member_id: user.member_id,
      order_id: data.id,
      payment_id: data.payment_id,
      payment_title: data.payment_title,
      bank_origin: _bank.name,
      bank_origin_id: _bank.id,
      bank_origin_account: inputBankName.current!.getText(),
      bank_destination: data.payment_title,
      bank_destination_id: data.payment_id,
      bank_destination_account: data.payment.bank_account,
      bank_destination_number: data.payment.bank_number,
      amount: parseInt(data.total_pay) + parseInt(data.total_shipping),
      image: image,
      title: '',
      notes: ''
    }

    LibProgress.show("Mohon Tunggu")
    new LibCurl('payment_request', post, (result, msg) => {
      LibProgress.hide()
      if (from == "order") {
        LibNavigation.back()
      } else {
        LibNavigation.reset()
        VegetablesIndexProperty.setTab(0)
      }
      // VegetablesIndexProperty.setTab(2)
      // OrderIndexProperty.setTab(0)
    }, (error) => {
      LibProgress.hide()
    })
  }

  function confirmOrder() {
    let post = {
      order_id: data.id
    }
    LibProgress.show("Mohon Tunggu")
    new LibCurl('order_done', post, (result, msg) => {
      LibProgress.hide()
      LibNavigation.backToRoot()
      LibNavigation.navigate("order/detail", { url: result.url, from: 'order' })
    }, (error) => {
      LibProgress.hide()
      LibDialog.warning("Oops.!", error)
    }, 1)
  }

  if (midtrans == "") {
    return <LibLoading />
  } else {
    if(byPassPayment) {


      if(midtrans.data.bank != 'gopay')
      {      
        LibNavigation.navigate('order/detail_payment', {
          data: data,
          midtrans: midtrans.data,
          useMidtrans : midtrans.useMidtrans,
          firstAccess: true
        })

      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {
        from == "order" ?
          <ComponentHeader title="Detail Pembayaran" btnBack />
          :
          <ComponentHeader title="Detail Pembayaran" btnGoHome />
      }
      <ScrollView showsVerticalScrollIndicator={false} >

        {
          (data.status.id == "1" || data.status.id == "2" || data.status.id == "3" || data.status.id == "4" || data.status.id == "7") &&
          <View style={{ marginTop: 30, marginBottom: 20, marginHorizontal: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 5, backgroundColor: '#e6e6e6' }}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: data.status.id == 1 || data.status.id == 7 || data.status.id == 2 || data.status.id == 3 || data.status.id == 4 ? LibStyle.colorPrimary : "white", alignItems: 'center', justifyContent: 'center' }}>
              {/* <Text style={{ fontFamily: "Arial", fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: "white" }}>{1}</Text> */}
              <LibIcon name="timer" color="white" size={20} />
            </View>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: data.status.id == 7 || data.status.id == 2 || data.status.id == 3 || data.status.id == 4 ? LibStyle.colorPrimary : "white", alignItems: 'center', justifyContent: 'center', borderColor: LibStyle.colorPrimary, borderWidth: data.status.id == 7 || data.status.id == 2 || data.status.id == 3 || data.status.id == 4 ? 0 : 2 }}>
              {/* <Text style={{ fontFamily: "Arial", fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: data.status.id == 7 || data.status.id == 2 || data.status.id == 3 || data.status.id == 4 ? "white" : LibStyle.colorPrimary }}>{2}</Text> */}
              <LibIcon name="receipt" color={data.status.id == 7 || data.status.id == 2 || data.status.id == 3 || data.status.id == 4 ? "white" : LibStyle.colorPrimary} size={20} />
            </View>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: data.status.id == 2 || data.status.id == 3 || data.status.id == 4 ? LibStyle.colorPrimary : "white", alignItems: 'center', justifyContent: 'center', borderColor: LibStyle.colorPrimary, borderWidth: data.status.id == 2 || data.status.id == 3 || data.status.id == 4 ? 0 : 2 }}>
              {/* <Text style={{ fontFamily: "Arial", fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: data.status.id == 2 || data.status.id == 3 || data.status.id == 4 ? "white" : LibStyle.colorPrimary }}>{3}</Text> */}
              <LibIcon name="package-variant-closed" color={data.status.id == 2 || data.status.id == 3 || data.status.id == 4 ? "white" : LibStyle.colorPrimary} size={20} />
            </View>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: data.status.id == 3 || data.status.id == 4 ? LibStyle.colorPrimary : "white", alignItems: 'center', justifyContent: 'center', borderColor: LibStyle.colorPrimary, borderWidth: data.status.id == 3 || data.status.id == 4 ? 0 : 2 }}>
              {/* <Text style={{ fontFamily: "Arial", fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: data.status.id == 3 || data.status.id == 4 ? "white" : LibStyle.colorPrimary }}>{4}</Text> */}
              <LibIcon name="truck-fast" color={data.status.id == 3 || data.status.id == 4 ? "white" : LibStyle.colorPrimary} size={20} />
            </View>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: data.status.id == 4 ? LibStyle.colorPrimary : "white", alignItems: 'center', justifyContent: 'center', borderColor: LibStyle.colorPrimary, borderWidth: data.status.id == 4 ? 0 : 2 }}>
              {/* <Text style={{ fontFamily: "Arial", fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: data.status.id == 4 ? "white" : LibStyle.colorPrimary }}>{5}</Text> */}
              <LibIcon name="truck-check" color={data.status.id == 4 ? "white" : LibStyle.colorPrimary} size={20} />
            </View>
          </View>
        }


        {
          data.status.id == "1" || data.status.id == "2" || data.status.id == "3" || data.status.id == "4" || data.status.id == "7" ?
            <View style={{ flex: 1, marginBottom: 0, flexDirection: 'row', margin: 15, backgroundColor: data.status.id == "1" ? "#f5a623" : data.status.id == "2" ? "#00BED5" : data.status.id == "3" ? "#00BE4A" : data.status.id == "7" ? "#00BED5" : data.status.id == "4" ? "#00BED5" : "#000", padding: 10, alignItems: 'center', borderRadius: 5 }}>
              <LibIcon name="basket" color="#fff" />
              <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginRight: 15, marginLeft: 15, fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#fff", flexWrap: 'wrap' }}> {data.status.id == "1" ? "Segera Selesaikan Pembayaran anda Sebelum stok Sayur Rumahan habis" : data.status.id == "2" ? data.status.title : data.status.id == "3" ? data.status.title : data.status.id == "4" ? data.status.title : data.status.id == "7" ? data.status.title : ""}
              </Text>
            </View>
            :
            <View />
        }

        {
          data.status.id == "5" || data.status.id == "0" &&
          <View style={{ flex: 1, marginBottom: 0, flexDirection: 'row', margin: 15, backgroundColor: '#FE0027', padding: 10, alignItems: 'center', borderRadius: 5 }}>
            <LibIcon name="check-box-outline" color="#fff" />
            <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginRight: 15, marginLeft: 15, fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#fff", flexWrap: 'wrap' }}>{data.status.title}</Text>
          </View>
        }

        {/* sudah bayar tapi di rijek */}
        {
          data.status.id == "1" && data.status_payment.is_payed == 1 &&
          <View style={{ margin: 15, backgroundColor: '#f5dbd9', padding: 10, borderRadius: 5 }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginTop: 10, marginLeft: 5, fontSize: 13, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Pesanan Anda {data.status_payment.title}</Text>
            <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginBottom: 10, marginLeft: 5, fontSize: 15, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap', color: "#a32100" }}>{data.status_payment.notes}</Text>
          </View>
        }

        {
          data.status.id == "4" && data.receive_name !== null &&
          <View style={{ margin: 15, backgroundColor: '#f5dbd9', padding: 10, borderRadius: 5 }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginTop: 10, marginLeft: 5, fontSize: 13, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Diterima Oleh {data.receive_name}</Text>
            <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginBottom: 10, marginLeft: 5, fontSize: 15, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap', color: "#a32100" }}>{moment(data.receive_date).format("dddd, DD MMMM YYYY, H:mm:ss")}</Text>
          </View>
        }

        {/* belum bayar */}
        {
          data.status.id == "1" &&
          <View style={{ margin: 15, backgroundColor: '#EBECF1', padding: 10, borderRadius: 5 }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginTop: 10, marginLeft: 5, fontSize: 13, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Batas Waktu Pembayaran</Text>
            <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginBottom: 10, marginLeft: 5, fontSize: 15, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>{moment(data.exp_date).format("dddd, DD MMMM YYYY, H:mm:ss")}</Text>
          </View>
        }

        {/* sudah dikirim */}
        {
          data.status.id == "3" &&
          <View style={{ margin: 15, backgroundColor: '#EBECF1', padding: 10, borderRadius: 5 }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginTop: 10, marginLeft: 5, fontSize: 13, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Tanggal Pengiriman</Text>
            <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginBottom: 10, marginLeft: 5, fontSize: 15, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>{moment(data.updated).format("dddd, DD MMMM YYYY, H:mm:ss")}</Text>
          </View>
        }

        <View style={{ borderBottomWidth: 1, paddingBottom: 15, margin: 15, borderBottomColor: '#EBECF1' }}>
          <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", marginBottom: 7, fontSize: 15, fontStyle: "normal", lineHeight: 21, letterSpacing: 0 }}>Jumlah Tagihan</Text>
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 20, fontWeight: "bold", fontStyle: "normal", color: LibStyle.colorPrimary }}>{LibUtils.money(data.grand_total)}</Text>
        </View>
        <View style={[{ marginTop: 0, margin: 15, backgroundColor: '#fff', padding: 10, paddingBottom: 15, paddingTop: 15, borderRadius: 5 }, LibStyle.elevation(3)]}>
          {
            data.member && data.member != null &&
            <>
              <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", marginBottom: 7, fontSize: 15, fontStyle: "normal", lineHeight: 21, letterSpacing: 0 }}>Penerima</Text>
              <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", fontSize: 20, fontWeight: "bold", fontStyle: "normal" }}>{LibUtils.ucwords(decodeURI(data.member.name))}</Text>
              <View style={{ padding: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'skyblue', marginTop: 5, borderRadius: 5, alignSelf: 'flex-start' }}>
                <LibIcon name="circle" size={10} color="#fff" />
                <Text allowFontScaling={false} style={{ color: '#fff', marginLeft: 7, fontFamily: "Arial", fontSize: 10, fontStyle: "normal", fontWeight: "bold", lineHeight: 21, letterSpacing: 0 }}>{"Alamat Pengiriman"}</Text>
              </View>
              {
                data.member.address !== "" &&
                <View>
                  {
                    data.member.type &&
                    <Text allowFontScaling={false} numberOfLines={2} style={{ marginTop: 5, fontFamily: "Arial", fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0 }}>{data.member.type.label + " | " + data.member.address + " | " + data.member.phone}</Text>
                  }
                  < Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0 }}>{data.member.village_name + " - " + data.member.location_detail.subdistrict.title + " - " + data.member.location_detail.city.title + ", " + data.member.location_detail.state.title + ", " + data.member.zipcode}</Text>
                </View>
              }
            </>
          }
        </View>

        {/* view metode pembayaran */}
        { midtrans.useMidtrans == true &&
          <View style={[{ marginTop: 0, margin: 15, backgroundColor: '#fff', padding: 10, paddingBottom: 15, paddingTop: 15, borderRadius: 5 }, LibStyle.elevation(3)]}>
            <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", marginBottom: 7, fontSize: 15, fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>Metode Pembayaran</Text>

            {/* nanti di sini ada kondisi */}

            { midtrans.data.bank == 'gopay' ?
              <>
                  
                 <View style={{  marginBottom: 3, borderColor: '#EBECF1', marginHorizontal: 10, marginVertical: 10, paddingHorizontal: 17, paddingVertical: 5, alignItems:'center' }}>
                  <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", marginBottom: 1, fontSize: 15, fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>Gopay</Text>
                  <Image style={{ width: 300, height: 300 }} source={{ uri: midtrans.data.qrcode }} />
                  <ComponentButton onPress={() => {  Linking.openURL(midtrans.data.actionLink); }} label="Bayar Sekarang" />
                </View>
              </>
            : 
              <>
              <View style={{ alignContent: 'center', alignItems: 'center', marginBottom: 10, flexDirection: 'row', marginTop: 10, borderBottomColor: '#F6F6F6', borderBottomWidth: 2, paddingBottom: 10 }}>
                <Image style={{ width: 100, height: 40, marginRight: 10 }} source={{ uri: imageUrl[data.payment_title.toLowerCase()] }} />
              </View>
                <Text allowFontScaling={false} numberOfLines={2} style={{ marginRight: 10, fontFamily: "Arial", fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0 }}>Virtual Account</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderBottomColor: '#F6F6F6', borderBottomWidth: 2, paddingBottom: 10 }}>
    
                  <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 18, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: LibStyle.colorRed }}>{midtrans.data.va_number }</Text>
                  <ComponentTouchable onPress={() => {
                    LibUtils.copyToClipboard(midtrans.data.va_number)
                    LibToastProperty.show("Berhasil disalin " + midtrans.data.va_number)
                  }}>
                    <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 13, color: LibStyle.colorPrimary }}>SALIN</Text>
                  </ComponentTouchable>
                </View>
    
                <ComponentTouchable onPress={() => {
                  LibNavigation.navigate('order/detail_payment', {
                    data: data,
                    midtrans: midtrans.data,
                    useMidtrans : midtrans.useMidtrans,
                    firstAccess: false
                  })
                }}>
                  <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", fontSize: 11, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: LibStyle.colorPrimary, marginTop: 8 }}>Petunjuk Pembayaran</Text>
                </ComponentTouchable>
              </>
            
            }



          </View>
        }

        { midtrans.useMidtrans == false && 

          <View style={[{ marginTop: 0, margin: 15, backgroundColor: '#fff', padding: 10, paddingBottom: 15, paddingTop: 15, borderRadius: 5 }, LibStyle.elevation(3)]}>
            <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", marginBottom: 7, fontSize: 15, fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>Metode Pembayaran</Text>
            <View style={{ alignContent: 'center', alignItems: 'center', marginBottom: 10, flexDirection: 'row', marginTop: 10, borderBottomColor: '#F6F6F6', borderBottomWidth: 2, paddingBottom: 10 }}>
              <Image style={{ width: 100, height: 40, marginRight: 10 }} source={{ uri: imageUrl[data.payment_title.toLowerCase()] }} />
              <View>
                <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", marginBottom: 5, fontSize: 15, fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>{data.payment_title}</Text>
                <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 15, fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap', color: LibStyle.colorPrimaryGreen }}>a.n {data.payment.bank_account}</Text>
              </View>
            </View>
            {/* nanti di sini ada kondisi */}

            <Text allowFontScaling={false} numberOfLines={2} style={{ marginRight: 10, fontFamily: "Arial", fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0 }}>Transfer Manual</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, borderBottomColor: '#F6F6F6', borderBottomWidth: 2, paddingBottom: 10 }}>

              <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 18, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: LibStyle.colorRed }}>{data.payment.bank_number}</Text>
              <ComponentTouchable onPress={() => {
                LibUtils.copyToClipboard(data.payment.bank_number)
                LibToastProperty.show("Berhasil disalin " + data.payment.bank_number)
              }}>
                <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 13, color: LibStyle.colorPrimary }}>SALIN</Text>
              </ComponentTouchable>
            </View>
            <ComponentTouchable onPress={() => {
              LibNavigation.navigate('order/detail_payment', {
                data: data,
                midtrans: midtrans,
                useMidtrans : midtrans.useMidtrans
              })
            }}>
              <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", fontSize: 11, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: LibStyle.colorPrimary, marginTop: 8 }}>Petunjuk Pembayaran</Text>
            </ComponentTouchable>

          
          </View>
        }


        <ComponentTouchable style={[{ marginTop: 0, flexDirection: 'row', margin: 15, backgroundColor: '#fff', padding: 10, paddingBottom: 15, paddingTop: 15, alignItems: 'center', borderRadius: 5, justifyContent: 'space-between' }, LibStyle.elevation(3)]}
          onPress={() => {
            LibNavigation.navigate('checkout/detail_bill', {
              data: { ...data, shipping_cost: data.total_shipping },
              from: 'order/detail',
            })
          }}>
          <Text allowFontScaling={false} numberOfLines={2} style={{ marginRight: 10, fontFamily: "Arial", marginLeft: 10, fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659" }}>Detail Tagihan</Text>
          <LibIcon name="chevron-right" />
        </ComponentTouchable>

        {
          data.status.id == "1" && midtrans.useMidtrans == false &&
          <View style={[{ marginTop: 0, margin: 15, borderRadius: 5, backgroundColor: '#fff', padding: 15 }, LibStyle.elevation(3)]}>

            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 15, fontWeight: 'bold', lineHeight: 21, letterSpacing: 0 }}>Konfirmasi Pembayaran</Text>

            <ComponentLabel_input label="Nama Bank" mandatory />
            <ComponentTouchable onPress={() => {
              LibNavigation.navigateForResult('checkout/banks').then((bank) => {
                bankName.current!.setText(bank.name)
                set_bank(bank);
              })
            }}>
              <View pointerEvents="none" >
                <ComponentInput_circle
                  ref={bankName}
                  style={{ borderColor: '#c4c4c4', height: 35, marginTop: 8 }}
                  onPress={() => {
                    LibNavigation.navigateForResult('checkout/banks').then((bank) => {
                      bankName.current!.setText(bank.name)
                      set_bank(bank);
                    })
                  }}
                  editable={false}
                  placeholder={'Nama Bank'}
                />
              </View>
            </ComponentTouchable>
            <ComponentLabel_input label="Nama Lengkap di Rekening Bank" mandatory />
            <ComponentInput_circle
              ref={inputBankName}
              style={{ borderColor: '#c4c4c4', height: 35, marginTop: 8 }}
              onSubmitEditing={() => inputBankNumber.current!.focus()}
              placeholder={'Masukkan Nama Lengkap'}
            />
            <ComponentLabel_input label="No Rekening" mandatory />
            <ComponentInput_circle
              ref={inputBankNumber}
              style={{ borderColor: '#c4c4c4', height: 35, marginTop: 8 }}
              keyboardType="numeric"
              placeholder={'Masukkan No.Rekening'}
            />

            <ComponentLabel_input label="Silahkan Upload Bukti Pembayaranmu" mandatory />
            {
              image !== "" ?
                <ComponentTouchable onPress={() => { dialogUploadImage.current!.show() }} style={{ alignContent: 'center', alignItems: 'center', marginTop: 15, alignSelf: 'center', height: 130, width: 130, borderWidth: 3, borderRadius: 5, borderStyle: 'dotted' }}>
                  <LibPicture style={{ height: 115, width: 115, resizeMode: 'cover', alignSelf: 'center', marginTop: 5 }} source={{ uri: image }} />
                </ComponentTouchable>
                :
                <ComponentTouchable onPress={() => { dialogUploadImage.current!.show() }} style={{ padding: 15, marginTop: 15, alignSelf: 'center', height: 130, width: 130, borderWidth: 3, borderRadius: 5, borderStyle: 'dotted' }}>
                  <LibIcon name="cloud-upload" size={50} style={{ alignSelf: 'center' }} />
                  <Text allowFontScaling={false} style={{ textAlign: 'center', fontSize: 13, flexWrap: 'wrap', fontWeight: 'bold' }} numberOfLines={2}>Sentuh untuk Upload</Text>
                </ComponentTouchable>
            }
          </View>
        }

      </ScrollView>
      {
        data.status.id == "1" && midtrans.useMidtrans == false &&
        <ComponentFooter view={
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
              <ComponentButton label={"Kirim"} onPress={() => {
                confirmPayment()
              }} />
            </View>
          </View>
        } />

      }
      {
        activeGroupId && activeGroupId == 4 && data.status_send == "3" && /* esp.isDebug() && */
        <ComponentFooter view={
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
              <ComponentButton label={"Konfirmasi Pesanan Diterima"} onPress={() => {
                LibDialog.warningConfirm("Konfimasi", 'Pesanan yang sudah diterima tidak dapat dibatalkan, Lanjutkan?', 'YA',
                  () => {
                    confirmOrder()
                  }, "BATAL", () => { }
                )
              }} />
            </View>
          </View>
        } />
      }

      <ComponentSlidingup ref={dialogUploadImage}>
        <View style={{ backgroundColor: 'white', borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingBottom: 35, paddingHorizontal: 19, }}>
          <Text allowFontScaling={false} style={{ marginTop: 26, marginBottom: 23, fontFamily: "Arial", fontSize: 16, fontWeight: "bold", fontStyle: "normal", lineHeight: 22, letterSpacing: 0, textAlign: "center", color: "#34495e" }}>Change Picture</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 27 }}>
            <ComponentCircle image={'icons/ic_camera.png'} color="#f39c12" title={'Kamera'} onPress={() =>
              LibImage.fromCamera().then((url) => {
                dialogUploadImage.current!.hide()
                setImage(url)
              })} />
            <ComponentCircle image={'icons/ic_galery.png'} color="#3498db" title={'Galeri'} onPress={() =>
              LibImage.fromGallery().then((url) => {
                dialogUploadImage.current!.hide()
                setImage(url)
              })} />
          </View>
        </View>
      </ComponentSlidingup>
    </View >
  )
}