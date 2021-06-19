// withHooks

import React, { useEffect } from 'react';
import { CourierIndex, DispatcherIndex, esp, HubIndex, LibNavigation, LocationIndex, useSafeState, VegetablesIndex } from 'esoftplay';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector } from 'react-redux';


export interface VegetablesSwitcherArgs {

}
export interface VegetablesSwitcherProps {
  navigation: any

}
export default function m(props: VegetablesSwitcherProps): any {

  let user = useSelector((state: any) => state.user_class)

  const [group_id, setGroup_id] = useSafeState('0')

  const Allviews: any = {
    4: VegetablesIndex,
    6: HubIndex,
    7: DispatcherIndex,
    8: CourierIndex,
  }
  const Actview = Allviews[group_id]

  useEffect(() => {
    AsyncStorage.getItem('profile_index_active_group_id').then((c) => {
      if (c) setGroup_id(c)
      else setGroup_id(esp.config('group_id'))
    })
  }, [])

  // let group_id: any = c
  // if (!c) {
  //   group_id = esp.config('group_id')
  // }
  // if (user && user.location_range_id == 0) {
  //   LibNavigation.reset("location/index")
  //   return
  // }
  // if (parseInt(group_id) == 6) {
  //   LibNavigation.reset('hub/index')
  // }
  // if (parseInt(group_id) == 7) {
  //   LibNavigation.reset('dispatcher/index')
  //   return
  // }
  // if (parseInt(group_id) == 8) {
  //   LibNavigation.reset('courier/index')
  //   return
  // }
  // LibNavigation.reset('vegetables/index')

  if (user && user?.location_range_id == 0) {
    return <LocationIndex />
  }

  if (group_id == '0')
    return null

  return <Actview />

}