// withHooks

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ComponentHeader, esp, LibStyle, OrderCurrently, OrderDone, OrderCancel, OrderMenu_item, LibCurl, usePersistState, LibUtils, useSafeState, LibLoading, LibToastProperty, ComponentEmpty, LibNavigation, VegetablesIndexProperty } from 'esoftplay';
import { useSelector } from 'react-redux';


export interface OrderIndexProps {
}

const initState = {
  tabIndex: 0
}

export function reducer(state: any, action: any): any {
  if (state == undefined) state = initState
  const actions: any = {
    "order_index_settab": {
      ...state,
      tabIndex: action.payload
    }
  }
  const _action = actions[action.type]
  return _action ? _action : state
}


export function setTab(index: number): void {
  esp.dispatch({
    type: 'order_index_settab',
    payload: index
  })
}

export default function m(props: OrderIndexProps): any {

  function getTabView(): any {
    if (tabIndex == 0) {
      return <OrderCurrently />
    }
    if (tabIndex == 1) {
      return <OrderDone />
    }
    if (tabIndex == 2) {
      return <OrderCancel />
    }
  }

  const tabIndex = useSelector((state: any) => state.order_index.tabIndex)

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ComponentHeader title="Order History" />
        <View style={[{ flexDirection: 'row', height: 50, justifyContent: 'space-evenly', paddingHorizontal: 8, backgroundColor: 'white', alignItems: 'center' }, LibStyle.elevation(4)]} >
          <OrderMenu_item onPress={() => setTab(0)} text={"Saat ini"} active={tabIndex == 0} />
          <OrderMenu_item onPress={() => setTab(1)} text={"Selesai"} active={tabIndex == 1} />
          <OrderMenu_item onPress={() => setTab(2)} text={"Dibatalkan"} active={tabIndex == 2} />
        </View>
        {
          getTabView()
        }
      </View>
    </View>
  )
}