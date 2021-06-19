// withHooks

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ComponentHeader, LibList, LibLoading, UserLocation_item, LibNavigation, LibUtils, useSafeState, esp, usePersistState } from 'esoftplay';



export interface UserLocationProps {

}

export default function m(props: UserLocationProps): any {

  //  module cache -> location tidak dibutuhkan lagi
  const _senderKey = LibUtils.getArgs(props, '_senderKey')
  const [query, setQuery] = useSafeState<string>('')
  const type = LibUtils.getArgs(props, 'type')
  const par_id = LibUtils.getArgs(props, 'par_id')
  const [locations] = usePersistState<any>('locations')

  let _location = locations && locations.filter((loc: any) => loc.type == type && loc.par_id == par_id)
  _location = _location && _location.sort((itemA: any, itemB: any) => {
    if (itemA.title > itemB.title) {
      return 1
    }
    if (itemB.title > itemA.title) {
      return -1
    }
    return 0
  })
  if (query)
    _location = _location && _location.filter((loc: any) => (loc.title).toLowerCase().includes(query.toLowerCase()))

  useEffect(() => {
    return () => LibNavigation.cancelBackResult(_senderKey)
  }, [])


  return (
    <View style={{ flex: 1 }} >
      <ComponentHeader
        onChangeText={(q) => { LibUtils.debounce(() => { setQuery(q) }, 500) }}
        searchPlaceholder={'Cari Kota'} />
      {
        !locations ?
          <LibLoading />
          :
          <View style={{ flex: 1 }} >
            <LibList
              key={query}
              data={_location}
              renderItem={(item: any, i: number) => (<UserLocation_item key={i} {...item} onPress={(loc) => {
                LibNavigation.sendBackResult(loc)
              }} />)}
            />
          </View>
      }
    </View>
  )
}