// withHooks

import React from 'react';
import { View, Text, KeyboardAvoidingView, ScrollView } from 'react-native';
import { LibUtils, esp, ComponentHeader_log_reg, ComponentLabel_input, ComponentInput_circle, ComponentButton, usePersistState, LibProgress, LibCurl, UserClass, LibNavigation, VegetablesIndexProperty, LibToastProperty, LibScroll, LibSociallogin } from 'esoftplay';


export interface UserRegister5Props {

}
export default function m(props: UserRegister5Props): any {

  const telp = LibUtils.getArgs(props, 'telp')

  let inputName = React.useRef<ComponentInput_circle>(null)
  let inputEmail = React.useRef<ComponentInput_circle>(null)
  let inputRefferal = React.useRef<ComponentInput_circle>(null)
  const [offCart] = usePersistState<any>('offlineCart', [])

  function doRegister() {
    // add product_cart for autologin
    let post = {
      name: inputName.current!.getText(),
      email: inputEmail.current!.getText(),
      referral: "",
      phone: telp,
      product_cart: JSON.stringify(offCart)
    }

    // if (esp.isDebug()) {
    post.referral = inputRefferal?.current!.getText()
    // }

    LibProgress.show("Mohon Tunggu")
    new LibCurl('user_register', post, (result, msg) => {
      // autologin
      new LibCurl('user_login', post,
        (res) => {
          LibProgress.hide()
          LibSociallogin.setUser(JSON.stringify({
            name: res.name,
            email: res.email,
            website: '',
            image: res.image
          }))
          UserClass.create(res).then(() => {
            LibNavigation.reset()
            VegetablesIndexProperty.setTab(0)
          })
        },
        (err) => {
          LibProgress.hide()
          LibToastProperty.show(err)
        })

    }, (error) => {
      LibProgress.hide()
      LibToastProperty.show(error)
    })
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ComponentHeader_log_reg btnBack />
      <KeyboardAvoidingView behavior="height">
        <ScrollView showsVerticalScrollIndicator={false} >
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 20, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#4a4a4a", marginLeft: 15, marginTop: 37 }}> Registrasi </Text>
          <View style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14, fontStyle: "normal", fontWeight: 'bold', letterSpacing: 0 }}>Lengkapi Profile </Text>
            <Text allowFontScaling={false} style={{ marginBottom: 10, fontFamily: "Arial", fontSize: 14, fontStyle: "normal", fontWeight: 'normal', marginTop: 10, letterSpacing: 0 }}>Silahkan Lengkapi Profile anda </Text>

            <ComponentLabel_input label="Nama" />
            <ComponentInput_circle
              placeholder="Nama anda"
              ref={inputName}
              onChangeText={(t) => {
                inputName.current!.setText(t)
              }}
            />
            <ComponentLabel_input label="Email" />
            <ComponentInput_circle
              placeholder="Email anda"
              keyboardType="email-address"
              autoCapitalize={"none"}
              ref={inputEmail}
              onChangeText={(t) => {
                inputEmail.current!.setText(t)
              }}
            />
            {
              // esp.isDebug() &&
              <>
                <ComponentLabel_input label="Kode Refferal (opsional)" />
                <ComponentInput_circle
                  placeholder="Refferal Anda"
                  autoCapitalize={"characters"}
                  ref={inputRefferal}
                  onChangeText={(t) => {
                    inputRefferal.current!.setText(t)
                  }}
                />
              </>
            }
            <ComponentButton label="Selanjutnya" onPress={() => {
              doRegister()
            }} style={{ marginTop: 25 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  )
}