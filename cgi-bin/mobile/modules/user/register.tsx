// withHooks

import React from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { LibStyle, LibNavigation, ComponentButton, LibScroll, ComponentHeader_log_reg } from 'esoftplay';


export interface UserRegisterProps {

}
export default function m(props: UserRegisterProps): any {

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <LibScroll>
          <ComponentHeader_log_reg btnBack />

          <View style={{ flex: 1, backgroundColor: '#fff', marginTop: -5, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
            <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 20, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#4a4a4a", marginLeft: 15, marginTop: 37 }}> Registrasi </Text>
            <View style={{ flex: 1, marginTop: 50, marginLeft: 15, marginRight: 15 }}>
              <ComponentButton label="Daftar Sekarang"
                onPress={() => {
                  LibNavigation.navigate('user/register2')
                }} />
              <ComponentButton label="Masuk Dengan Akun" backgroundColor={LibStyle.colorPrimary}
                onPress={() => {
                  LibNavigation.back()
                }}
                style={{ marginTop: 50 }} />
            </View>
          </View>

        </LibScroll>
      </KeyboardAvoidingView>

    </View>
  )
}