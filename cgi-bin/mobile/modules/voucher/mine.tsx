// withHooks

import React, { useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import { ComponentHeader, LibIcon, LibTextstyle, LibList, VoucherItem, usePersistState, UserData, UseCurl, esp, LibInfinite, LibObject, useSafeState, LibStyle, LibUtils, LibNavigation, LibCurl, OrderMenu_item, ComponentEmpty } from 'esoftplay';


export interface VoucherMineProps {

}

function renderTabs(tabs: string[], indexActive: number, onChangeIndex: (index: number) => void): any {
  indexActive = indexActive || 0
  return (
    <View style={{ flexDirection: "row" }} >
      {
        tabs.map((t, i) => {
          const isActive = indexActive == i
          return (
            <TouchableOpacity activeOpacity={1}
              onPress={() => onChangeIndex(i)}
              key={i}
              style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 10, borderBottomWidth: 2, borderBottomColor: isActive ? LibStyle.colorPrimary : "transparent" }} >
              <LibTextstyle textStyle="body" text={t} style={{ color: isActive ? LibStyle.colorPrimary : "#888" }} />
            </TouchableOpacity>
          )
        })
      }
    </View>
  )
}

// export function use(claim_id: number, onDone?: (res: any, msg: string) => void, onFailed?: (msg: string) => void) {
//   new LibCurl('voucher_used', { voucher_claim_id: claim_id }, onDone, onFailed)
// }
// export function cancel(claim_id: number, onDone?: (res: any, msg: string) => void, onFailed?: (msg: string) => void) {
//   new LibCurl('voucher_cancel', { voucher_claim_id: claim_id }, onDone, onFailed)
// }

export function use(id: number, onDone?: (res: any, msg: string) => void, onFailed?: (msg: string) => void) {
  new LibCurl('voucher_use', { voucher_id: id }, onDone, onFailed, 1)
}
export function cancel(claim_id: number, onDone?: (res: any, msg: string) => void, onFailed?: (msg: string) => void) {
  new LibCurl('voucher_cancel', { voucher_claim_id: claim_id }, onDone, onFailed, 1)
}

export default function m(props: VoucherMineProps): any {

  const resultKey = LibNavigation.getResultKey(props)
  const { url, title } = LibUtils.getArgsAll(props)
  const [data, setData] = usePersistState('voucher_mines', [])
  UserData.register("voucher_mines")
  const [tabIdx, setTabIdx] = useSafeState(0)
  const tabs = ["Aktif", "Digunakan", "Hangus"]
  const _url = url || "voucher_list"
  const get = {
    is_used: tabIdx == 1 ? 1 : 0,
    is_expired: tabIdx == 2 ? 1 : 0
  }

  const [query, setQuery] = useSafeState('')

  useEffect(() => {
    return () => LibNavigation.cancelBackResult(resultKey)
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "#EAEBF0" }} >
      {/* <ComponentHeader btnBack notif title={title || "Voucher Saya"} /> */}
      <ComponentHeader btnBack notif searchPlaceholder="Temukan Voucher" onChangeText={(q) => { setQuery(q) }} />
      {/* tab */}
      {/* {resultKey == 1 &&
        <View style={[{ flexDirection: 'row', height: 50, justifyContent: 'space-evenly', paddingHorizontal: 8, backgroundColor: 'white', alignItems: 'center' }, LibStyle.elevation(4)]} >
          <OrderMenu_item onPress={() => setTabIdx(0)} text={"Aktif"} active={tabIdx == 0} />
          <OrderMenu_item onPress={() => setTabIdx(1)} text={"Digunakan"} active={tabIdx == 1} />
          <OrderMenu_item onPress={() => setTabIdx(2)} text={"Hangus"} active={tabIdx == 2} />
        </View>
      } */}
      <LibInfinite
        key={query}
        // url={_url + LibUtils.objectToUrlParam(get)}
        url={_url + "?keyword=" + query}
        isDebug={1}
        keyExtractor={(x, i) => i.toString()}
        errorView={(error: string) => {
          if (error != '')
            return (
              <ComponentEmpty label={"Voucher Saya"} onPress={() => { }} text={error} />
            )
        }
        }
        renderItem={(item: any, index: number) => <VoucherItem key={index} forUsed={resultKey > 1} resultKey={resultKey} mine {...item} onClaimed={() => { setData(LibObject.set(data, 1)(index, 'is_claim')) }} />}
      />
    </View>
  )
}