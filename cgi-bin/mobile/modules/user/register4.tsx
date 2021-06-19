// withHooks

import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ComponentHeader_log_reg, ComponentLabel_input, ComponentInput_circle, ComponentButton, useSafeState, LibStyle, LibUtils, esp, LibDialog, LibNavigation, LibProgress, LibCurl, LibCrypt, LibToastProperty } from 'esoftplay';
import CountDown from 'react-native-countdown-component';


export interface UserRegister4Props {

}
export default function m(props: UserRegister4Props): any {

  let inputCode = React.useRef<ComponentInput_circle>(null)

  const [active, setActive] = useSafeState<boolean>(false)
  const [otpCode, setOtpCode] = useSafeState<any>("")
  const [countdown, setCountdown] = useSafeState<number>(60)
  const telp = LibUtils.getArgs(props, 'telp')
  const typeVerif = LibUtils.getArgs(props, 'typeVerif')
  let _otpCode = LibUtils.getArgs(props, 'otpCode')

  useEffect(() => {
    setOtpCode(_otpCode)
  }, [])

  function doVerificationAndLogin() {
    if (otpCode === inputCode.current!.getText()) {
      LibNavigation.navigate('user/register5', { telp: telp })

    } else {
      LibDialog.warning("Kesalahan", "Kode yang anda masukkan Salah, Silahkan Ulangi lagi")
    }
  }

  function askOtp() {
    const post = {
      phone: telp,
      type_otp: typeVerif,
      // type_otp: 1,
      type: 1
    }

    LibProgress.show("Mohon Tunggu")
    new LibCurl('user_otp', post, (result, msg) => {
      LibProgress.hide()
      setOtpCode(new LibCrypt().decode(result.code))
    }, (error) => {
      LibToastProperty.show(error)
      LibProgress.hide()
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <ComponentHeader_log_reg btnBack />

        <View style={{ backgroundColor: '#fff', marginTop: -5, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 20, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#4a4a4a", marginLeft: 15, marginTop: 37 }}> Registrasi </Text>
          <View style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}>
            <View style={{ marginBottom: 10, flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', alignItems: 'center' }}>
              <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14, fontStyle: "normal", letterSpacing: 0 }}>Kami telah mengirimkan Kode Verifikasi ke Nomer </Text>
              <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14, fontStyle: "normal", fontWeight: 'bold', marginTop: 4, letterSpacing: 0 }}>{telp} </Text>
            </View>

            { //khusus untuk debug. jangan diubah
              esp.isDebug() &&
              <>
                <Text allowFontScaling={false} style={{ textAlign: 'center', marginTop: 10, fontFamily: "Arial", fontSize: 14, fontStyle: "normal", letterSpacing: 0 }}>Silahkan Gunakan Kode Berikut.</Text>
                <TouchableOpacity activeOpacity={1} onPress={() => { }} style={{ backgroundColor: '#F1F1F1', padding: 10, marginTop: 10, borderRadius: 5 }} >
                  <Text allowFontScaling={false} style={{ textAlign: 'center', fontFamily: "Arial", fontSize: 18, fontStyle: "normal", fontWeight: "bold", letterSpacing: 5 }}>{_otpCode}</Text>
                </TouchableOpacity>
              </>
            }

            <ComponentLabel_input label="Masukkan Kode" />
            <ComponentInput_circle
              placeholder={"Kode Verifikasi"}
              keyboardType="phone-pad"
              returnKeyType="done"
              // mask="### - ### - ### - ### - ###"
              onSubmitEditing={() => {
                doVerificationAndLogin()
              }}
              ref={inputCode}
              onChangeText={(t) => {
                inputCode.current!.setText(t)
              }}
            />
            <ComponentButton style={{ marginTop: 30 }} onPress={() => {
              doVerificationAndLogin()
            }} label="Verifikasi" />

            <Text allowFontScaling={false} style={{ textAlign: 'center', marginTop: 30, fontFamily: "Arial", fontSize: 14, fontStyle: "normal", letterSpacing: 0 }}>Belum dapat Kode ?? </Text>

            <View>
              <CountDown
                until={countdown}
                onFinish={() => setActive(true)}
                digitStyle={{ backgroundColor: '#F1F1F1' }}
                digitTxtStyle={{ color: '#1CC625' }}
                timeToShow={['M', 'S']}
                timeLabels={{ m: null, s: null }}
                style={{ marginTop: 10 }}
                size={20}
              />
              <ComponentButton
                style={{ margin: 20, marginBottom: 0, width: LibStyle.width * 0.5, alignSelf: 'center' }}
                onPress={() => {
                  active &&
                    askOtp()
                  setCountdown(countdown * 2)
                  setActive(false)
                }}
                backgroundColor="#fff"
                borderColor={active ? LibStyle.colorPrimaryGreen : '#F1F1F1'}
                fontColor={active ? LibStyle.colorPrimaryGreen : '#F1F1F1'}
                label="Kirim lagi" />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}