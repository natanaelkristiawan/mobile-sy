// withHooks

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ComponentHeader, LibUtils, LibLoading, LibList, UserLocation_item, LibNavigation, useSafeState, LibCurl, esp } from 'esoftplay';


export interface UserLocation_villageProps {

}
export default function m(props: UserLocation_villageProps): any {

  const _senderKey = LibUtils.getArgs(props, '_senderKey')
  const [locations, setLocations] = useSafeState<any>(undefined)
  const [query, setQuery] = useSafeState<string>('')
  const type = LibUtils.getArgs(props, 'type')
  const par_id = LibUtils.getArgs(props, 'par_id')

  function loadData(): void {
    new LibCurl('location?type=' + type + '&par_id=' + par_id, null,
      (res) => {
        setLocations(res)
      },
      (error) => {
      }
    )
  }

  useEffect(() => {
    loadData()
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
              data={locations}
              renderItem={(item: any, i: number) => (<UserLocation_item {...item} key={i} onPress={(loc) => {
                LibNavigation.sendBackResult(loc, _senderKey)
              }} />)}
            />
          </View>
      }
    </View>)
}