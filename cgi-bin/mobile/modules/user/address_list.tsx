// withHooks

import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { ComponentHeader, LibStyle, LibIcon, ComponentTouchable, LibNavigation, useSafeState, LibCurl, LibUtils, esp, LibDialog, LibLoading, LibProgress, LibList, LibPicture, ComponentButton, LibFocus, LibToastProperty, LibObject } from 'esoftplay';


export interface UserAddress_listProps {

}
export default function m(props: UserAddress_listProps): any {

  const user = LibUtils.getReduxState('user_class')
  const [result, setResult] = useSafeState<any>('')
  const [loading, setLoading] = useSafeState<boolean>(true)

  useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    new LibCurl('location_member?user_id=' + user.id + '&member_id=' + user.member_id, null, (result, msg) => {
      setResult(result)
      setLoading(false)
    }, (error) => {
      setLoading(false)
      // LibToastProperty.show(error)
    })
  }

  function setPrimaryAddress(member_location_id: any) {
    const post = {
      is_primary: 1
    }

    LibProgress.show("Mohon Tunggu")
    new LibCurl('location_member_edit?member_location_id=' + member_location_id + '&user_id=' + user.id + '&member_id=' + user.member_id, post, (result, msg) => {
      LibProgress.hide()
      LibNavigation.back()
    }, (error) => {
      LibProgress.hide()
      LibDialog.warning("Kesalahan", error)
    })
    // LibDialog.confirm("Peringatan", "Apakah anda ingin menjadikan alamat ini sebagai alamat utama ?",
    //   "Ya", () => {
    //   },
    //   "Batal", () => {

    //   })
  }

  function deleteAddress(location_id: string, index: number) {
    LibDialog.warningConfirm("Peringatan", "Apakah anda yakin menghapus Alamat ini ?",
      "Ya", () => {
        LibProgress.show("Mohon Tunggu")
        new LibCurl('location_member_delete?user_id=' + user.id + '&member_id=' + user.member_id + '&member_location_id=' + location_id, null, (res, msg) => {
          LibProgress.hide()
          let delAddress = LibObject.splice(result, index, 1)()
          setResult(delAddress)
        }, (error) => {
          LibProgress.hide()
          LibToastProperty.show(error)
        })
      },
      "Batal", () => { })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F6F7F8' }}>
      <ComponentHeader title="Daftar Alamat" btnBack notif rightView onPressRight={() => { LibNavigation.navigate('user/address_add') }} />
      <LibFocus onFocus={() => loadData()} />
      {
        loading ?
          <LibLoading />
          :
          <LibList
            data={result}
            onRefresh={() => { }}
            renderItem={(item: any, i: number) => {
              return (
                <ComponentTouchable key={i} onPress={() => { setPrimaryAddress(item.id) }} style={[{ marginTop: 10, backgroundColor: '#fff', paddingBottom: 10 }, LibStyle.elevation(2)]}>
                  <View style={{ flexDirection: 'row', padding: 10, marginBottom: 5 }}>
                    <View style={{ flex: 1, marginLeft: 5 }}>
                      <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", marginTop: 4, fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#606a7b" }} >{item?.name}</Text>
                      <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginTop: 4, fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#606a7b" }} numberOfLines={3} ellipsizeMode={"tail"} >{item?.address + " | " + item?.phone}</Text>
                      <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 13, fontWeight: "500", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#606a7b" }} numberOfLines={3} ellipsizeMode={"tail"} >{(item?.village_name || item?.location_detail?.village?.title) + " - " + item?.location_detail?.district?.title + " - " + item?.location_detail?.city?.title + ", " + item?.location_detail?.state?.title + ", " + item?.zipcode}</Text>
                    </View>
                    {
                      item.is_primary == "1" ?
                        <View style={{ marginLeft: 5, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                          <LibIcon name="check-circle-outline" size={23} color={LibStyle.colorPrimary} />
                        </View>
                        :
                        <ComponentTouchable onPress={() => {
                          setPrimaryAddress(item.id)
                        }} style={{ marginLeft: 5, justifyContent: 'flex-end', alignContent: 'center', alignItems: 'center' }}>
                          <LibIcon name="checkbox-blank-circle-outline" size={23} />
                        </ComponentTouchable>
                    }
                  </View>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10, marginRight: 10, width: LibStyle.width * 0.5 }}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                      <ComponentButton style={{ height: 35 }} label="Edit" backgroundColor="#fff" borderColor={LibStyle.colorPrimaryGreen} fontColor={LibStyle.colorPrimaryGreen} onPress={() => {
                        LibNavigation.navigate('user/address_add', { edit: item })
                        // LibToastProperty.show("Coming Soon")
                      }} />
                    </View>
                    {
                      result && result.length > 1 &&
                      <View style={{ flex: 1, }}>
                        <ComponentButton style={{ height: 35 }} label="Hapus" backgroundColor="#fff" borderColor={LibStyle.colorRed} fontColor={LibStyle.colorRed} onPress={() => {
                          deleteAddress(item.id, i)
                        }} />
                      </View>
                    }
                  </View>
                </ComponentTouchable>
              )
            }}
            ListEmptyComponent={() => {
              return (
                <View style={{ flex: 1, height: LibStyle.height, paddingBottom: 100 + LibStyle.STATUSBAR_HEIGHT, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                  <LibPicture source={esp.assets("logo.png")} resizeMode="contain" style={{ height: 250, width: 250 }} />
                  <Text allowFontScaling={false} style={{ marginTop: 0, fontFamily: "ArialBold", fontSize: 17, fontWeight: "600", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: LibStyle.colorPrimaryGreen, alignSelf: 'center' }} >Anda belum menambahkan Alamat</Text>
                  <View style={{ marginTop: 20, marginLeft: 50, marginRight: 50 }}>
                    <ComponentButton label="Tambahkan Sekarang"
                      backgroundColor={LibStyle.colorGrey} borderColor={LibStyle.colorPrimaryGreen} fontColor={LibStyle.colorPrimaryGreen}
                      onPress={() => {
                        LibNavigation.navigate('user/address_add')
                      }}
                    />
                  </View>
                </View>
              )
            }}
          />
      }

    </View>
  )
}