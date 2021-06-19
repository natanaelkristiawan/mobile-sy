// withHooks

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ComponentHeader, LibUtils, LibTextstyle, ComponentButton, LibToastProperty, useSafeState, UseCurl, LibList, VoucherItem, LibLoading, ComponentEmpty } from 'esoftplay';


export interface UserReferralProps {

}
export default function m(props: UserReferralProps): any {
  const user = LibUtils.getReduxState("user_class")
  const [data, setData] = useSafeState<any[]>([])
  const [curl, loading, err] = UseCurl(true)

  const loadData = () => curl('voucher_list_referral', null, setData)
  useEffect(loadData, [])

  return (
    <View style={{ flex: 1, backgroundColor: "#EAEBF0" }} >
      <ComponentHeader btnBack notif title={"Referral Saya"} />
      {
        <LibList
          onRefresh={loadData}
          ListEmptyComponent={
            <>
              {
                loading ? <LibLoading /> :
                  err != '' ? <ComponentEmpty text={err} onPress={loadData} label={'Coba Lagi'} />
                    : null
              }
            </>
          }
          ListHeaderComponent={
            <>
              <View style={{ paddingVertical: 30, marginHorizontal: 17, alignItems: 'center', marginVertical: 10, backgroundColor: "#f9f9f9", borderWidth: 1, borderColor: "#888", borderRadius: 20, borderStyle: 'dashed' }} >
                <LibTextstyle textStyle="largeTitle" text={user.referral} style={{ fontWeight: "bold" }} />
              </View>
              <View style={{ marginHorizontal: 17, flexDirection: "row", justifyContent: "space-between" }} >
                <ComponentButton style={{ width: 140 }} label="Salin" onPress={() => { LibUtils.copyToClipboard(user.referral).then(() => LibToastProperty.show("Referral berhasil disalin")) }} />
                <ComponentButton style={{ width: 140 }} label="Share" onPress={() => { LibUtils.share(user.referral_share) }} />
              </View>
              {data.length > 0 && <LibTextstyle textStyle={'caption1'} text={"Dapatkan voucher berikut ini untuk setiap member baru yang registrasi dengan Referral Anda"} style={{ margin: 17, textAlign: 'center' }} />}
            </>
          }
          data={data}
          renderItem={(item, idx) => <VoucherItem {...item} key={idx} />}
        />
      }
    </View>
  )
}