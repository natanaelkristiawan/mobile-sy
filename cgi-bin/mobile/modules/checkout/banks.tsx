// withHooks

import React from 'react';
import { View, Text } from 'react-native';
import { useSafeState, ComponentHeader, LibLoading, usePersistState, LibList, ComponentTouchable, LibNavigation, LibStyle, LibPicture, esp } from 'esoftplay';


export interface CheckoutBanksProps {

}
export default function m(props: CheckoutBanksProps): any {
  // data banks from order/detail
  const [banks] = usePersistState<any>('banks')
  const [query, setQuery] = useSafeState<string>('')

  let _bank = banks && banks.length > 0 && banks.filter((value: any) => (value.name).toLowerCase().includes((query).toLowerCase()))

  return (
    <View style={{ flex: 1 }}>
      <ComponentHeader
        onChangeText={(q) => { setQuery(q) }}
        searchPlaceholder={'Coba BCA'} />
      {
        !banks ?
          <LibLoading />
          :
          <LibList
            key={query}
            data={_bank}
            renderItem={(item, i) => (
              <ComponentTouchable key={i} onPress={() => {
                LibNavigation.sendBackResult(item)
              }}>
                <View style={{ padding: 10, width: LibStyle.width, borderBottomColor: '#cdcdcd', borderBottomWidth: 1 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <LibPicture style={{ height: 30, width: 30, resizeMode: 'contain' }} source={{ uri: item.image }} />
                    <Text allowFontScaling={false} style={{ marginLeft: 15, marginTop: 6, fontFamily: "Arial", fontSize: 14, fontStyle: "normal", letterSpacing: 0, color: "rgba(0, 0, 0, 0.9)" }}>{item.name}</Text>
                  </View>
                </View>
              </ComponentTouchable>
            )}
          />
      }
    </View>
  )
}