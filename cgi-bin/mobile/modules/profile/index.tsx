// withHooks

import React, { useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ComponentHeader, LibScroll, LibDialog, UserClass, LibNavigation, VegetablesIndexProperty, LibUtils, esp, ProfileItem, ComponentTouchable, usePersistState, UserNotification, LibFocus, useSafeState, LibTextstyle, VegetablesState, UserData, LibPicture, LibStyle, LibIcon, useGlobalState, useGlobalReturn, ProfileIndexProperty, LibCurl, LibProgress, LibSociallogin, UseCurl } from 'esoftplay';
import { useSelector } from 'react-redux';


export interface ProfileIndexProps {

}

const initState = esp.config("group_id")
const group_id = useGlobalState(initState, { persistKey: "profile_index_active_group_id" })

export function groupIdState(): useGlobalReturn<any> {
  return group_id
}

export default function m(props: ProfileIndexProps): any {
  const [result, setResult] = VegetablesState().useState()
  const [, , , delOffCart] = usePersistState<any>('offlineCart')
  const itemWidth = (LibStyle.width - 50) / 3
  const itemHeight = itemWidth
  const [curl, loading, err] = UseCurl()
  const [voucherRef, setVoucherRef] = useSafeState()

  const [activeGroupId, setActiveGroupId] = ProfileIndexProperty.groupIdState().useState()
  UserData.register('profile_index_active_group_id')


  useEffect(() => {
    VegetablesIndexProperty.updateUser()
    new LibCurl("voucher_list_referral", null, setVoucherRef)
  }, [])


  let user = useSelector((state: any) => state.user_class)
  UserData.register('offlineCart')
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader title={"Profile"} />
      <LibFocus onFocus={() => { UserClass.load() }} onBlur={() => { }} />
      <LibScroll onRefresh={() => VegetablesIndexProperty.updateUser()} >
        <>
          <View style={{ margin: 15 }}>
            <ComponentTouchable onPress={() => { }}>
              {
                user &&
                <ProfileItem title={user && user.name} subtitle={user && user.email} noIconRight />
              }
            </ComponentTouchable>
          </View>
          <View style={{ marginHorizontal: 15 }}>
            <View style={{}}>
              <ComponentTouchable onPress={() => { LibNavigation.navigate("profile/edit") }}>
                <ProfileItem title={"Profil anda"} subtitle={"Atur profil anda"} />
              </ComponentTouchable>
            </View>
          </View>

          <TouchableOpacity activeOpacity={1} style={{ marginHorizontal: 15, marginTop: 15 }} onPress={() => LibNavigation.navigate("user/contact")} >
            <ProfileItem title="Bantuan" />
          </TouchableOpacity>

          {/* <TouchableOpacity activeOpacity={1} style={{ marginHorizontal: 15, marginTop: 15 }} onPress={() => LibNavigation.navigate("profile/payments")} >
            <ProfileItem title="Contoh Payment" />
          </TouchableOpacity> */}
          {
            // esp.isDebug() &&
            <>
              <TouchableOpacity activeOpacity={1} style={{ marginHorizontal: 15, marginTop: 15 }} onPress={() => LibNavigation.navigate("voucher/mine")} >
                <ProfileItem title="Voucher Saya" />
              </TouchableOpacity>
              {
                voucherRef &&
                <TouchableOpacity activeOpacity={1} style={{ marginHorizontal: 15, marginTop: 15 }} onPress={() => LibNavigation.navigate("user/referral")} >
                  <ProfileItem title="Referral Saya" />
                </TouchableOpacity>
              }
            </>
          }
          <View style={{ margin: 15 }}>
            <ComponentTouchable onPress={() => {
              LibDialog.warningConfirm('Peringatan', 'Apakah anda yakin ingin Keluar ?', 'Keluar', () => {
                LibNavigation.reset('vegetables/index')
                LibProgress.show()
                setActiveGroupId(4)
                UserClass.delete().then(() => {
                  delOffCart()
                  UserNotification.drop()
                  LibProgress.hide()
                })
              }, 'Batal', () => { })
            }}>
              <ProfileItem title={"Sign Out"} subtitle={""} />
            </ComponentTouchable>
          </View>

          {
            /* esp.isDebug() && */ user && user.access.length > 1 && activeGroupId != 4 &&
            <View style={{ marginLeft: 15, flexDirection: "row", marginBottom: 10, flexWrap: "wrap" }} >
              {
                user && user.access.map((item: any, i: number) => (
                  <TouchableOpacity disabled={item.id == activeGroupId} key={i} activeOpacity={1} onPress={() => {
                    LibDialog.confirm('Confirmation', 'Yakin beralih ke akun ' + LibUtils.ucwords(item.title) + "?",
                      'Ya', () => {
                        setActiveGroupId(item.id)
                        UserNotification.drop()
                        LibProgress.show("Mohon Tunggu")
                        setTimeout(() => {
                          UserClass.create(user)
                          LibNavigation.reset(item.module)
                          LibProgress.hide()
                        }, 100);
                      },
                      'Batal', () => { })
                  }} >
                    <View style={{ marginBottom: 10, marginRight: 10, alignItems: "center", justifyContent: "center", backgroundColor: "#F4F4F4", width: itemWidth, height: itemHeight, borderRadius: 5, ...LibStyle.elevation(3) }} >
                      <LibPicture source={esp.assets('icon.png')} style={{ width: 50, height: 50 }} />
                      <LibTextstyle text={LibUtils.ucwords(item.title)} textStyle="callout" style={{ marginTop: 5 }} />
                      {
                        item.id == activeGroupId &&
                        <View style={{ position: "absolute", top: 5, right: 5 }} >
                          <LibIcon name="check-circle-outline" color={LibStyle.colorPrimary} />
                        </View>
                      }
                    </View>
                  </TouchableOpacity>
                ))
              }
            </View>
          }
        </>
        <View />
      </LibScroll>
    </View>
  )
}