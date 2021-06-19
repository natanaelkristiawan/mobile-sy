// withHooks

import React, { useEffect } from 'react';
import { View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { ComponentHeader, LibStyle, LibTextstyle, LibIcon, LibWebview, LibUtils, UseCurl, useSafeState, LibLoading, ComponentEmpty, LibNavigation, LibPicture, LibCurl, LibProgress, LibToastProperty, VoucherDetailProperty, VoucherMineProperty, LibIconStyle, esp, usePersistState, CheckoutIndexPersist } from 'esoftplay';

export interface VoucherDetailProps {

}

const width = LibStyle.width - 30
const height = width * 0.3

export function claim(id: string, onDone: () => void, onFailed?: () => void) {
  const user = LibUtils.getReduxState('user_class')
  if (LibUtils.checkUndefined(user, 'id')) {
    const url_claim = 'voucher_claim'
    LibProgress.show("Mohon tunggu..")
    new LibCurl(url_claim, { voucher_id: id },
      (res, msg) => {
        LibProgress.hide()
        onDone()
      },
      (msg) => {
        LibProgress.hide()
        LibToastProperty.show(msg)
        onFailed && onFailed()
      })
  } else
    LibNavigation.replace('user/login')
}


function Item({ icon, text, value }: { icon: LibIconStyle, text: string, value: string }): any {
  return (<View style={{ paddingVertical: 5, flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }} >
    <View style={{ flexDirection: 'row', alignItems: 'center' }} >
      <LibIcon name={icon} color={LibStyle.colorPrimary} />
      <LibTextstyle textStyle="caption1" text={text} style={{ color: "#333", marginLeft: 10 }} />
    </View>
    <LibTextstyle textStyle="caption1" text={value} style={{ fontWeight: "bold", color: "#333" }} />
  </View>)
}


export default function m(props: VoucherDetailProps): any {

  const { url, title, forClaim, forUsed, resultKey } = LibUtils.getArgsAll(props)
  const [data, setData] = useSafeState<any>()
  const [curl, loading, error] = UseCurl(true)
  useEffect(loadData, [])

  function loadData() { curl(url, null, (x) => { setData(x); esp.log(x, "xx"); }) }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }} >
      <ComponentHeader btnBack notif title={"Detail Promo"} />
      {
        loading || !data ? <LibLoading /> :
          error != "" ? <ComponentEmpty text={error} label={"Kembali"} onPress={() => LibNavigation.back()} />
            :
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl onRefresh={loadData} refreshing={false} />} contentContainerStyle={{ padding: 15 }} >
                <LibPicture source={{ uri: data.image }} style={{ height, width }} />
                <LibTextstyle
                  textStyle="headline"
                  style={{ color: "#333", marginVertical: 10 }}
                  text={data.title || title} />
                <Item icon="clock" text={'Periode Promo'} value={LibUtils.getDateRange(data.start_date, data.expired_date, "- ", { month: " MMM ", date: "DD", year: "YYYY" })} />
                <Item icon="cart" text={'Minimal Pembelian'} value={LibUtils.money(data.order_minimum)} />
                {
                  LibUtils.checkUndefined(data, 'type.id') && data.type.id == 1 &&
                  <>
                    {
                      (data.amount > 0 || data.amount != '') &&
                      <>
                        <Item icon="cash" text={data?.type?.title} value={data.amount.includes('%') ? data.amount : LibUtils.money(data.amount)} />
                        {
                          (parseInt(data.amount_max) > 0) &&
                          <Item icon="cash-multiple" text={"Maksimal Nilai " + data?.type?.title} value={LibUtils.money(data.amount_max)} />
                        }
                      </>
                    }
                  </>
                }
                <View style={{ backgroundColor: "#f4f4f4", height: 1, marginTop: 5, marginBottom: 10 }} />
                {
                  data.description.trim() != '' &&
                  <>
                    <LibTextstyle
                      textStyle="footnote"
                      style={{ color: "#333", fontWeight: "bold" }}
                      text="Detail Voucher" />
                    <LibWebview style={{ marginHorizontal: -20, marginTop: 10 }} onFinishLoad={() => { }} source={{ html: data.description }} />
                  </>
                }
                {
                  data.term.trim() != '' &&
                  <>
                    <LibTextstyle
                      textStyle="footnote"
                      style={{ color: "#333", fontWeight: "bold" }}
                      text="Syarat dan Ketentuan" />
                    <LibWebview style={{ marginHorizontal: -20, marginTop: 10 }} onFinishLoad={() => { }} source={{ html: data.term }} />
                  </>
                }
              </ScrollView>
              {/* {
                forClaim &&
                <TouchableOpacity activeOpacity={1}
                  disabled={data.is_claim == 1}
                  onPress={() => {
                    VoucherDetailProperty.claim(data.id, () => {
                      LibToastProperty.show("Voucher berhasil di claim")
                      loadData()
                    })
                  }} style={{ paddingHorizontal: 15, paddingVertical: 8, margin: 17, alignItems: 'center', borderRadius: 4, backgroundColor: data.is_claim ? LibStyle.colorGrey : LibStyle.colorPrimary }} >
                  <LibTextstyle textStyle="caption1" text={data.is_claim == 0 ? "KLAIM" : "SUDAH DIKLAIM"} style={{ fontWeight: "bold", color: "white" }} />
                </TouchableOpacity>
              } */}
              {
                forUsed &&
                <TouchableOpacity activeOpacity={1}
                  onPress={() => {
                    LibNavigation.sendBackResult(data, resultKey)
                    LibNavigation.back()
                  }} style={{ paddingHorizontal: 15, paddingVertical: 8, margin: 8, alignItems: 'center', borderRadius: 4, backgroundColor: data.isUsed == 1 ? LibStyle.colorGrey : LibStyle.colorPrimary }} >
                  <LibTextstyle textStyle="caption1" text={"GUNAKAN"} style={{ fontWeight: "bold", color: "white" }} />
                </TouchableOpacity>
              }
            </>
      }
    </View >
  )
}
