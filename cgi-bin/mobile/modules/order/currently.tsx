// withHooks

import React, { useEffect } from 'react';
import { View, AppState } from 'react-native';
import { LibNavigation, OrderItem, LibUtils, LibCurl, useSafeState, LibLoading, ComponentEmpty, VegetablesIndexProperty, LibFocus, LibList, esp } from 'esoftplay';

export interface OrderCurrentlyProps {

}
export default function m(props: OrderCurrentlyProps): any {

  const user = LibUtils.getReduxState('user_class')
  const [result, setResult] = useSafeState<any>('')
  const [error, setError] = useSafeState<any>('')


  useEffect(() => {
    loadData()
    AppState.addEventListener('change', loadData)
    return () => AppState.removeEventListener('change', loadData)
  }, [])

  function loadData() {
    if (user) {
      let post = {
        user_id: user.id,
        member_id: user.member_id
      }

      new LibCurl('order_list', post, (result, msg) => {
        esp.log("hasil", result);
        setResult(result)
      }, (error) => {
        setError(error)
        // LibToastProperty.show(error)
      })
    }
  }

  if (result == '' && error == '') {
    return <LibLoading />
  }


  const filterData = result && result.filter((item: any) => item.status.id == "1" || item.status.id == "2" || item.status.id == "3" || item.status.id == "7")
  return (
    <View style={{ flex: 1, backgroundColor: '#EBECF1' }}>
      <LibFocus onFocus={() => loadData()} onBlur={() => loadData()} />

      <LibList
        data={filterData.length > 0 && filterData}
        onRefresh={() => { loadData() }}
        // style={{ marginBottom: 10 }}
        ListEmptyComponent={
          <ComponentEmpty onPress={() => {
            LibNavigation.reset()
            VegetablesIndexProperty.setTab(0)
          }}
            text={"Belum ada Transaksi"} label="Belanja Sekarang" />
        }
        renderItem={(item: any, i: number) => {
          return (
            <View style={{ marginBottom: 5 }} key={i} >
              <OrderItem
                {...item}
                status={item.status.title}
                status_id={item.status.id}
                color={item.status.id == "1" ? "#f5a623" : item.status.id == "2" ? "#00BED5" : item.status.id == "3" ? "#00BE4A" : item.status.id == "7" ? "#5300FF" : "#000"}
                onPress={() => {
                  LibNavigation.navigate('order/detail', {
                    url: item.url_detail,
                    from: 'order'
                  })
                }}
              />
            </View>
          )
        }}
      />
    </View>
  )
}