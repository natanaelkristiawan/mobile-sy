// withHooks

import React, { useEffect } from 'react';
import { View } from 'react-native';
import { LibScroll, OrderItem, LibNavigation, LibUtils, useSafeState, LibCurl, esp, LibLoading, ComponentEmpty, VegetablesIndexProperty, LibList, LibFocus, LibStyle } from 'esoftplay';


export interface OrderDoneProps {

}
export default function m(props: OrderDoneProps): any {

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

  const filterData = result && result.filter((item: any) => item.status.id == "4")

  return (
    <View style={{ flex: 1, backgroundColor: '#EBECF1' }}>

      <LibList
        data={filterData.length > 0 && filterData}
        onRefresh={() => { loadData() }}
        ListEmptyComponent={
          <ComponentEmpty onPress={() => {
            LibNavigation.reset()
            VegetablesIndexProperty.setTab(0)
          }} text={"Belum ada Transaksi"} label="Belanja Sekarang" />
        }
        renderItem={(item: any, i: number) => {
          return (
            <View style={{ marginBottom: 5 }} key={i} >
              <OrderItem
                {...item}
                status={LibUtils.ucwords(item.status.title)}
                color={"#1fb89b"}
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