// withHooks

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ComponentHeader, UseCurl, usePersistState, UserData, LibLoading, LibIcon, LibTextstyle, LibList, VoucherItem, useSafeState, esp, LibInfinite, LibCurl, LibObject, useGlobalState, useGlobalReturn, LibStyle, LibUtils } from 'esoftplay';


export interface VoucherListProps {

}

const data = useGlobalState()

export function dataState(): useGlobalReturn<any> {
  return data
}

export default function m(props: VoucherListProps): any {

  const { title, url } = LibUtils.getArgsAll(props)
  const _url = url || "voucher"
  const [data, setData] = dataState().useState()

  return (
    <View style={{ flex: 1, backgroundColor: "#EAEBF0" }} >
      <ComponentHeader btnBack notif title={title || "Semua Voucher"} />
      <LibInfinite
        url={_url}
        onDataChange={setData}
        injectData={data}
        keyExtractor={(x: any, i: number) => i.toString()}
        errorView={(err: string) => (
          <View style={{ flex: 1, justifyContent: 'center', marginTop: LibStyle.height * 0.3, alignItems: 'center', paddingHorizontal: 20 }} >
            <LibIcon name='emoticon-sad-outline' size={40} color="#888" />
            <LibTextstyle textStyle="callout" text={"Oops"} style={{ fontWeight: "bold", color: "#333", marginTop: 10, marginBottom: 5 }} />
            <LibTextstyle textStyle="footnote"
              style={{ textAlign: 'center', color: "#888" }}
              text={err} />
          </View>
        )
        }
        renderItem={(item, index) => <VoucherItem key={index} {...item} forClaim onClaimed={() => { setData(LibObject.set(data)(index, 'is_claim')) }} />}
      />
    </View>
  )
}