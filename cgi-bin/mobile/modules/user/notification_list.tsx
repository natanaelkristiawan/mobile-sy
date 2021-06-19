// withHooks

import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ComponentHeader, LibTextstyle, LibList, UserNotification, LibNotification, LibCrypt, esp, LibCurl, LibStyle } from 'esoftplay';
import * as Notifications from 'expo-notifications'
import moment from 'moment/min/moment-with-locales'
import { useSelector } from 'react-redux';

export interface UserNotification_listProps {
  navigation: any
}
export default function m(props: UserNotification_listProps): any {

  const data = useSelector((state: any) => state.user_notification.data)

  useEffect(() => {
    UserNotification.user_notification_loadData();

    return () => {
      const crypt = new LibCrypt();
      const salt = esp.config("salt");
      const config = esp.config();
      var uri = config.protocol + "://" + config.domain + config.uri + "user/push-read"
      let unreaded = data.filter((item: any) => item.status != 2)
      Notifications.setBadgeCountAsync(0)
      for (const item of unreaded) {
        UserNotification.user_notification_setRead(item.id)
        new LibCurl(uri, {
          notif_id: item.id,
          secretkey: crypt.encode(salt + "|" + moment().format("YYYY-MM-DD hh:mm:ss"))
        }, () => {
          UserNotification.user_notification_loadData();
        }, () => {

        })
      }
    }
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ComponentHeader title={'Notifikasi'} btnBack />
      <LibList
        data={[...data].reverse()}
        onRefresh={() => UserNotification.user_notification_loadData()}
        ListEmptyComponent={
          <View style={{ height: LibStyle.height - 60, flex: 1, justifyContent: 'center', alignItems: 'center' }}  >
            <LibTextstyle text={'Belum ada Notifikasi'} textStyle={"title2"} />
          </View>
        }
        renderItem={(item: any, i: number) => (
          <TouchableOpacity activeOpacity={1} key={i} onPress={() => {
            LibNotification.openNotif(item)
          }} >
            <View style={[{ padding: 16, flexDirection: "row", backgroundColor: "white", marginBottom: 3, marginHorizontal: 0, width: LibStyle.width }, LibStyle.elevation(1.5)]} >
              <View style={{}} >
                <Text allowFontScaling={false} style={{ fontSize: 12, fontWeight: item.status == 2 ? "normal" : "bold", fontStyle: "normal", letterSpacing: 0, color: item.status == 2 ? '#909090' : LibStyle.colorPrimary, fontFamily: item.status == 2 ? "Arial" : "ArialBold", marginBottom: 8 }} >{item.title}</Text>
                <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 10, fontWeight: "normal", fontStyle: "normal", lineHeight: 15, letterSpacing: 0, color: "#909090" }} ellipsizeMode="tail" numberOfLines={2} >{item.message}</Text>
                <Text allowFontScaling={false} style={{ fontSize: 9, marginTop: 5, fontFamily: "Arial", fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, color: "#acacac" }} >{moment(item.updated).fromNow()}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}