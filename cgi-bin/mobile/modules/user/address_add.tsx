// withHooks

import React, { useEffect } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { ComponentHeader, LibScroll, ComponentLabel_input, ComponentInput_circle, ComponentButton, ComponentInput_touchable, LibNavigation, esp, useSafeState, LibToastProperty, LibCurl, LibProgress, UseForm, LibUtils, LibDialog, VegetablesState, LibKeyboard_avoid } from 'esoftplay';

export interface UserAddress_addProps {
  from: string
  onPress?: () => void
}

export function handleBackButton() {
  LibDialog.confirm('Peringatan', 'Inputan Akan Hilang Jika Kembali Ke Halaman Sebelumnya', 'OK', () => LibNavigation.back(), 'Batal', () => { })
  return true;
}

export default function m(props: UserAddress_addProps): any {

  const user = LibUtils.getReduxState('user_class')
  let inputName = React.useRef<ComponentInput_circle>(null)
  let inputPostCode = React.useRef<ComponentInput_circle>(null)
  let inputAddress = React.useRef<ComponentInput_circle>(null)
  let inputTelp = React.useRef<ComponentInput_circle>(null)

  const [label, setLabel] = useSafeState<any>('')
  const [province, setProvince] = useSafeState<any>('')
  const [city, setCity] = useSafeState<any>('')
  const [districts, setDistricts] = useSafeState<any>('')
  const [village, setVillage] = useSafeState<any>('')
  const [form, setForm, reForm, delForm] = UseForm<any>('address')
  const [result] = VegetablesState().useState()

  let edit = LibUtils.getArgs(props, "edit")

  useEffect(() => {
    if (edit) {
      setLabel(edit?.type)
      setProvince(edit?.location_detail?.state)
      setCity(edit?.location_detail?.city)
      setDistricts(edit?.location_detail?.district)
      setVillage(edit?.location_detail?.village)
      setForm('type')(edit?.type?.id)
      setForm('name')(edit?.name)
      setForm('phone')(edit?.phone)
      setForm('location_id')(edit?.location_detail?.state?.location_id)
      setForm("city")(edit?.location_detail?.city?.location_id)
      setForm("district")(edit?.location_detail?.district?.location_id)
      setForm("village_id")(edit?.location_detail?.village?.id)
      setForm('zipcode')(edit?.zipcode)
      setForm('address')(edit?.address)
    }
    // BackHandler.addEventListener('hardwareBackPress', handleBackButton)
    // return function clean() {
    //   BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
    // }
  }, [])

  function locationProvince(type: number): void {
    LibNavigation.navigateForResult('user/location', { type: type, par_id: "0" }).then((location) => {
      setProvince(location)
      setCity('')
      setDistricts('')
      setVillage('')
      setForm('location_id')(location.location_id)
      setForm("city")('')
      setForm("district")('')
      setForm("village_id")('')

    })
  }

  function locationCity(type: number): void {
    if (!province) {
      LibToastProperty.show("Silahkan Pilih Provinsi dahulu", 2000)
      return
    } else {
      LibNavigation.navigateForResult('user/location', { type: type, par_id: province.id }).then((location) => {
        setCity(location)
        setDistricts('')
        setVillage('')
        setForm("city")(location.location_id)
        setForm("district")('')
        setForm("village_id")('')
      })
    }
  }

  function locationDistrict(type: number): void {
    if (!province) {
      LibToastProperty.show("Silahkan Pilih Provinsi dahulu", 2000)
      return
    } else if (!city) {
      LibToastProperty.show("Silahkan Pilih Kota/Kabupaten dahulu", 2000)
      return
    } else {
      LibNavigation.navigateForResult('user/location', { type: type, par_id: city.id }).then((location) => {
        setDistricts(location)
        setVillage('')
        setForm("district")(location.location_id)
        setForm("village_id")('')
      })
    }
  }

  function locationVillage(type: number): void {
    if (!province) {
      LibToastProperty.show("Silahkan Pilih Provinsi dahulu", 2000)
      return
    } else if (!city) {
      LibToastProperty.show("Silahkan Pilih Kota/Kabupaten dahulu", 2000)
      return
    } else if (!districts) {
      LibToastProperty.show("Silahkan Pilih Kecamatan dahulu", 2000)
      return
    } else {
      // village harus location_id, kalo bingung di debug saja
      LibNavigation.navigateForResult('user/location_village', { type: type, par_id: districts.location_id }).then((location) => {
        setVillage(location)
        setForm("village_id")(location.id)
      })
    }
  }

  function checkInputs(): boolean {
    if (!label) {
      LibToastProperty.show("Silahkan Pilih Label Alamat dahulu", 2000)
      return false
    }
    if (inputName.current!.getText() == '') {
      LibToastProperty.show("Silahkan Masukkan Nama Penerima dahulu", 2000)
      return false
    }
    if (!province) {
      LibToastProperty.show("Silahkan Pilih Provinsi dahulu", 2000)
      return false
    }
    if (!city) {
      LibToastProperty.show("Silahkan Pilih Kota/Kabupaten dahulu", 2000)
      return false
    }
    if (!districts) {
      LibToastProperty.show("Silahkan Pilih Kecamatan dahulu", 2000)
      return false
    }
    if (!village) {
      LibToastProperty.show("Silahkan Pilih Desa dahulu", 2000)
      return false
    }
    if (inputPostCode.current!.getText() == '') {
      LibToastProperty.show("Silahkan Masukkan Kode Pos dahulu", 2000)
      return false
    }
    if (inputAddress.current!.getText() == '') {
      LibToastProperty.show("Silahkan Masukkan Alamat Lengkap anda dahulu", 2000)
      return false
    }
    return true
  }

  function addressAdd(): void {
    if (checkInputs()) {
      LibProgress.show("Mohon Tunggu")
      reForm((f) => {
        new LibCurl('location_member_add', f, (result, msg) => {
          LibProgress.hide()
          delForm()
          LibNavigation.back()
        }, (error) => {
          LibProgress.hide()
          LibToastProperty.show(error)
        })
      })
    }
  }

  function addressEdit() {
    if (checkInputs()) {
      LibProgress.show("Mohon Tunggu")
      new LibCurl('location_member_edit?member_location_id=' + edit.id + '&user_id=' + user.id + '&member_id=' + user.member_id, form, (result, msg) => {
        LibProgress.hide()
        LibNavigation.back()
      }, (error) => {
        LibProgress.hide()
        LibDialog.warning("Kesalahan", error)
      })
    }
  }

  return (
    <LibKeyboard_avoid style={{ flex: 1, backgroundColor: "#fff" }} >
      {/* <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height" > */}
      <ComponentHeader title="Alamat Baru" btnBack />
      <LibScroll>
        <View style={{ marginLeft: 15, marginRight: 15 }}>
          <Text allowFontScaling={false} style={{ marginTop: 15, marginBottom: -10, fontFamily: "Arial", fontSize: 16, fontStyle: "normal", fontWeight: 'bold', letterSpacing: 0 }}>Label Alamat </Text>
          <ComponentLabel_input label="Label Alamat" />
          <ComponentInput_touchable
            onPress={() => {
              LibNavigation.navigateForResult('user/address_label', { data: result && result.config.type }).then((item) => {
                setLabel(item)
                setForm('type')(item.id)
              })
            }}
            placeholder="Rumah, Kantor, dll"
            text={label && label.label || ''}
            iconShow
          />
          <ComponentLabel_input label="Nama Penerima" />
          <ComponentInput_circle
            ref={inputName}
            onChangeText={() => {
              setForm('name')(inputName.current!.getText())
            }}
            placeholder="Atur Nama Penerima"
            defaultValue={edit && edit.name}
          />
          <ComponentLabel_input label="No.Telepon" />
          <ComponentInput_circle
            ref={inputTelp}
            placeholder="No.Telpon anda"
            keyboardType="phone-pad"
            returnKeyType="done"
            mask="###############"
            onChangeText={(t) => {
              inputTelp.current!.setText(t)
              setForm('phone')(inputTelp.current!.getText())
            }}
            defaultValue={edit && edit.phone}
          />
          <Text allowFontScaling={false} style={{ marginTop: 15, marginBottom: -10, fontFamily: "Arial", fontSize: 16, fontStyle: "normal", fontWeight: 'bold', letterSpacing: 0 }}>Provinsi </Text>
          <ComponentLabel_input label="Provinsi" />
          <ComponentInput_touchable
            onPress={() => {
              locationProvince(1)
            }}
            placeholder={"Atur Provinsi"}
            text={province?.title}
            iconShow
          />
          <ComponentLabel_input label="Kota/Kabupaten" />
          <ComponentInput_touchable
            onPress={() => {
              locationCity(2)
            }}
            placeholder="Atur Kota/Kabupaten"
            text={city?.title}
            iconShow
          />
          <ComponentLabel_input label="Kecamatan" />
          <ComponentInput_touchable
            onPress={() => {
              locationDistrict(3)
            }}
            placeholder="Atur Kecamatan"
            text={districts?.title}
            iconShow
          />
          <ComponentLabel_input label="Kelurahan" />
          <ComponentInput_touchable
            onPress={() => {
              locationVillage(4)
            }}
            placeholder="Atur Kelurahan"
            text={village?.title}
            iconShow
          />
          <ComponentLabel_input label="Kode Pos" />
          <ComponentInput_circle
            ref={inputPostCode}
            placeholder="Atur Kode Pos"
            keyboardType={"phone-pad"}
            onChangeText={() => {
              setForm('zipcode')(inputPostCode.current!.getText())
            }}
            defaultValue={edit && edit?.zipcode}
            onSubmitEditing={() => inputAddress.current!.focus()}
          />
          <ComponentLabel_input label="Alamat Lengkap" />
          <Text allowFontScaling={false} style={{ color: '#e5e5e5', marginTop: 4, fontFamily: "Arial", fontSize: 10, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0 }}>Nama gedung, jalan dan lainnya...</Text>
          <ComponentInput_circle
            ref={inputAddress}
            placeholder="Atur Alamat Lengkap"
            multiline
            style={{ height: 100, paddingTop: 12 }}
            inputStyle={{ height: 100, textAlignVertical: 'top' }}
            onChangeText={() => {
              setForm('address')(inputAddress.current!.getText())
            }}
            defaultValue={edit && edit?.address}
          />
        </View>
        <View />
      </LibScroll>
      <View style={{ margin: 15 }}>
        <ComponentButton label="SIMPAN" onPress={() => {
          if (edit) {
            addressEdit()
          } else {
            addressAdd()
          }
        }} />
      </View>
      {/* </KeyboardAvoidingView>
      </View> */}
    </LibKeyboard_avoid>
  )
}