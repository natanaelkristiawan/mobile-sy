// withHooks

import React, { useEffect } from 'react';
import { Linking, Platform, View } from 'react-native';
import {
  VegetablesMenu_item,
  esp,
  VegetablesHome,
  CartIndex,
  ProfileIndex,
  LibStyle,
  ComponentBadge,
  LibUtils,
  LibNavigation,
  VegetablesIndexProperty,
  usePersistState,
  LibFocus,
  OrderIndex,
  UserNotification,
  LibCurl,
  UserData, UserClass, ProfileIndexProperty, LibSociallogin, LibTextstyle, ComponentButton, LibProgress
} from 'esoftplay';
import { useSelector } from 'react-redux';
import Constants from 'expo-constants'
import AsyncStorage from '@react-native-community/async-storage';

export interface VegetablesIndexProps {
  navigation: any
}
const initState = {
  tabIndex: 0
}

export function reducer(state: any, action: any): any {
  if (state == undefined) state = initState
  const actions: any = {
    "vegetables_index_settab": {
      ...state,
      tabIndex: action.payload
    }
  }
  const _action = actions[action.type]
  return _action ? _action : state
}


export function setTab(index: number): void {
  esp.dispatch({
    type: 'vegetables_index_settab',
    payload: index
  })
}

export function isLogin(isLogin: () => void): void {
  let user = LibUtils.getReduxState('user_class')
  if (user && user.id) {
    isLogin()
  } else {
    LibNavigation.navigate('user/login')
  }
}

export function updateUser() {
  new LibCurl("user_profile", null, (res, msg) => {
    LibSociallogin.setUser(JSON.stringify({
      name: res.name,
      email: res.email,
      website: '',
      image: res.image
    }))
    UserClass.create(res).then(() => {
      doLogoutToFixFCMMismatch()
    })
  }, (msg) => {
    doLogoutToFixFCMMismatch()
  }, 1)
}

export function doLogoutToFixFCMMismatch() {
  AsyncStorage.getItem('vegetables_index_logout_validate').then((x) => {
    esp.log("nilai x ", x);
    if (!x || x <= '1') {
      esp.log("masuk if !x");
      LibNavigation.reset()
      LibProgress.show()
      ProfileIndexProperty.groupIdState().set(4)
      UserClass.delete().then(() => {
        AsyncStorage.removeItem('push_idx')
        UserNotification.drop()
        AsyncStorage.setItem('vegetables_index_logout_validate', '2')
        LibProgress.hide()
      })
    }
  })
}

export default function m(props: VegetablesIndexProps): any {

  const [offCart, setOffCart, reOffCart, delOffCart] = usePersistState<any>('offlineCart')
  const tabIndex = useSelector((state: any) => state.vegetables_index.tabIndex)
  const ActiveView = [VegetablesHome, CartIndex, OrderIndex, ProfileIndex][tabIndex]
  const user = LibUtils.getReduxState('user_class')

  useEffect(() => {
    VegetablesIndexProperty.updateUser()
    loadCart()
  }, [])

  useEffect(() => {
    UserNotification.user_notification_loadData()
    reOffCart();
  }, [tabIndex])

  function loadCart() {
    if (user) {
      new LibCurl('cart_list', null, (result, msg) => {
        setOffCart(result.list)
      }, (error) => {
      })
    }
  }

  const versionCode = Constants?.platform?.android?.versionCode

  if (Platform.OS == 'android' && versionCode && String(versionCode) < '5') {
    UserClass.delete()
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <LibTextstyle textStyle='body' text="Versi terbaru Sayur Rumahan tersedia" style={{ textAlign: 'center', marginBottom: 40 }} />
        <ComponentButton label='Update Sekarang' onPress={() => { Linking.openURL('https://play.google.com/store/apps/details?id=com.sayurrumahan.mobile') }} />
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <LibFocus onFocus={() => { reOffCart(); }} />
      <View style={{ flex: 1 }}>
        <ActiveView />
        <View style={[{ flexDirection: 'row', height: 50, justifyContent: 'space-evenly', paddingHorizontal: 8, backgroundColor: 'white', alignItems: 'center' }, LibStyle.elevation(4)]} >
          <VegetablesMenu_item onPress={() => { setTab(0) }}
            text={"Beranda"} icon={'home'} active={tabIndex == 0} />
          <View>
            <VegetablesMenu_item onPress={() => { setTab(1) }} text={"Cart"} icon={'cart'} active={tabIndex == 1} />
            <ComponentBadge counter={offCart && offCart.length > 0 ? offCart.length : 0} />
          </View>
          <VegetablesMenu_item
            onPress={() => VegetablesIndexProperty.isLogin(() => setTab(2))}
            text={"Order"}
            icon={'order'}
            active={tabIndex == 2} />
          <VegetablesMenu_item onPress={() => {
            // new UserData().deleteAll()
            VegetablesIndexProperty.isLogin(() => {
              setTab(3)
            })
          }} text={"Profile"} icon={'profile'} active={tabIndex == 3} />
        </View>
      </View>
    </View>
  )
}