// withHooks

import React from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import { LibScroll, ComponentHeader_log_reg, ComponentButton, LibStyle, LibNavigation, ComponentLabel_input, ComponentInput_circle, ComponentTouchable, LibToastProperty } from 'esoftplay';


export interface UserRegister2Props {

}
export default function m(props: UserRegister2Props): any {

  let inputTelp = React.useRef<ComponentInput_circle>(null)
  let query: string = ''


  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView>
        <ComponentHeader_log_reg btnBack />
        <View style={{ flex: 1, backgroundColor: '#fff', marginTop: -5, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 20, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#4a4a4a", marginLeft: 15, marginTop: 37 }}> Registrasi </Text>
          <View style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}>
            <ComponentLabel_input label="Nomor Telepon" />

            <ComponentInput_circle
              placeholder={"No.Telpon anda"}
              keyboardType="phone-pad"
              returnKeyType="done"
              // mask="### - ### - ### - ### - ###"
              ref={inputTelp}
              onSubmitEditing={() => {
                if (inputTelp.current!.getText() == "") {
                  LibToastProperty.show("Silahkan masukkan No.Telepon anda")
                } else if (inputTelp.current!.getText().length < 10) {
                  LibToastProperty.show("Silahkan masukkan No.Telepon dengan benar")
                } else {
                  LibNavigation.navigate('user/register3', { telp: inputTelp.current!.getText() })
                }
              }}
              onChangeText={(t) => {
                inputTelp.current!.setText(t)
              }}
            />

            <ComponentTouchable onPress={() => { LibNavigation.navigate('user/terms') }}>
              <View style={{ marginTop: 20, marginBottom: 20, flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', alignItems: 'center' }}>
                <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14, fontStyle: "normal", letterSpacing: 0 }}>Dengan Menekan "Selanjutnya" saya telah setuju dengan   </Text>
                <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14, fontStyle: "normal", fontWeight: 'bold', letterSpacing: 0 }}>Syarat dan ketentuan Sayur Rumahan </Text>
              </View>
            </ComponentTouchable>

            <ComponentButton onPress={() => {
              if (inputTelp.current!.getText() == "") {
                LibToastProperty.show("Silahkan masukkan No.Telepon anda")
              } else if (inputTelp.current!.getText().length < 10) {
                LibToastProperty.show("Silahkan masukkan No.Telepon dengan benar")
              } else {
                LibNavigation.navigate('user/register3', { telp: inputTelp.current!.getText() })
              }
            }} label="Selanjutnya" />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}