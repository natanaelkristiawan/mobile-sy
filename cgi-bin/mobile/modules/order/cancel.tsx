// withHooks

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { OrderItem, LibNavigation, ComponentEmpty, VegetablesIndexProperty, LibUtils, useSafeState, LibCurl, esp, LibLoading, LibList } from 'esoftplay';


export interface OrderCancelProps {

}
export default function m(props: OrderCancelProps): any {

  const user = LibUtils.getReduxState('user_class')
  const [result, setResult] = useSafeState<any>('')
  const [error, setError] = useSafeState<any>('')

  useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    if (user) {
      let post = {
        user_id: user.id,
        member_id: user.member_id
      }

      new LibCurl('order_list', post, (result, msg) => {
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

  const filterData = result && result.filter((item: any) => item.status.id == "5" || item.status.id == "0")

  return (
    <View style={{ flex: 1, backgroundColor: '#EBECF1' }}>

      <LibList
        data={filterData.length > 0 && filterData}
        ListEmptyComponent={
          <ComponentEmpty onPress={() => {
            LibNavigation.reset()
            VegetablesIndexProperty.setTab(0)
          }} text={"Belum ada Transaksi"} label="Belanja Sekarang" />
        }
        onRefresh={() => { loadData() }}
        renderItem={(item: any, i: number) => {
          return (
            <View key={i} style={{ marginBottom: 5 }}>
              <OrderItem
                {...item}
                status={item.status.title}
                color={"#FE0027"}
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