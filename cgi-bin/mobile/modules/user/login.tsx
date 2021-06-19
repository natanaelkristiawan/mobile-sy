// withHooks

import React from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { ComponentButton, LibNavigation, ComponentTouchable, ComponentInput_circle, LibScroll, ComponentLabel_input, LibToastProperty, ComponentHeader_log_reg, esp } from 'esoftplay';


export interface UserLoginProps {

}
export default function m(props: UserLoginProps): any {

  let inputTelp = React.useRef<ComponentInput_circle>(null)

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <LibScroll>
          <ComponentHeader_log_reg />
          <View style={{ flex: 1, backgroundColor: '#fff', marginTop: -5, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 20, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#4a4a4a", marginLeft: 32, marginTop: 37 }}> Login </Text>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 16, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, color: "#9b9b9b", marginLeft: 32, marginTop: 6 }}> Masuk ke akun anda </Text>
            <View style={{ marginLeft: 32, marginRight: 32, marginTop: 10 }}>
              <ComponentLabel_input label="No.Telepon" />
              <ComponentInput_circle
                ref={inputTelp}
                placeholder="No.Telpon anda"
                keyboardType="phone-pad"
                returnKeyType="done"
                mask="###############"
                onChangeText={(t) => {
                  inputTelp.current!.setText(t)
                }}
                onSubmitEditing={() => { }}
              />
            </View>

            <View style={{ marginLeft: 32, marginRight: 32, marginTop: 40 }}>
              <ComponentButton label="LOGIN" onPress={() => {
                if (inputTelp.current!.getText() == "") {
                  LibToastProperty.show("Silahkan masukkan No.Telepon anda")
                } else if (inputTelp.current!.getText().length < 10) {
                  LibToastProperty.show("Silahkan masukkan No.Telepon anda dengan Benar")
                } else {
                  LibNavigation.navigate('user/login2', { telp: inputTelp.current!.getText() })
                }
              }} />
            </View>
          </View>

          <View style={{ marginLeft: 32, marginRight: 32, marginTop: 23, flexDirection: 'row', justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14, fontWeight: "normal", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: "#9b9b9b" }}>Belum Punya akun ? </Text>
            <ComponentTouchable onPress={() => { LibNavigation.navigate('user/register') }}>
              <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, textAlign: "center", color: "#f3ab46" }}> Daftar disini</Text>
            </ComponentTouchable>
          </View>

        </LibScroll>
      </KeyboardAvoidingView>
    </View>
  )
}