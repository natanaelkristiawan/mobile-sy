// withHooks

import React from 'react';
import { View, Text } from 'react-native';
import { ComponentHeader_log_reg, usePersistState, ComponentButton, esp, LibUtils, LibProgress, LibCurl, LibToastProperty, LibCrypt, LibNavigation, LibDialog, VegetablesState, LibLoading } from 'esoftplay';


export interface UserLogin2Props {

}
export default function m(props: UserLogin2Props): any {

  const [result] = VegetablesState().useState()
  const telp = LibUtils.getArgs(props, 'telp')

  function askOtp(typeVerif: any) {
    const post = {
      phone: telp,
      type_otp: typeVerif,
      // type_otp: 1,
      type: 2
    }

    LibProgress.show("Mohon Tunggu")
    new LibCurl('user_otp', post, (result, msg) => {
      console.log(new LibCrypt().decode(result.code));
      LibProgress.hide()
            LibNavigation.navigate('user/login3', {
        telp: telp,
        otpCode: new LibCrypt().decode(result.code),
        typeVerif: typeVerif
      })
    }, (error) => {
      LibDialog.warningConfirm("Kesalahan", error, "Daftar", () => {
        LibNavigation.navigate("user/register", { telp: telp })
      }, "Batal", () => { })
      LibProgress.hide()
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader_log_reg btnBack />
      <View style={{ backgroundColor: '#fff', marginTop: -5, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
        <View style={{ marginTop: 50, marginLeft: 15, marginRight: 15, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14, fontStyle: "normal", fontWeight: 'bold', letterSpacing: 0 }}>Pilih Metode Verifikasi </Text>
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14, fontStyle: "normal", letterSpacing: 0, marginTop: 4 }}>Pilih salah satu metode dibawah ini Untuk mendapatkan kode verifikasi</Text>
          {
            result && result.config.otp.length > 0 && result.config.otp.map((item: any, i: number) => {
              return (
                <ComponentButton key={i} style={{ marginTop: 50 }} onPress={() => {
                  askOtp(item.id)
                }} label={item.label.toUpperCase()} />
              )
            })
            ||
            <LibLoading />
          }
        </View>
      </View>
    </View>
  )
}