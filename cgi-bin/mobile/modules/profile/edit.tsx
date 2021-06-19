// withHooks

import React, { useEffect } from 'react';
import { View, Text, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import { ComponentHeader, ComponentTouchable, LibStyle, ComponentButton, ComponentSlidingup, LibImage, LibNavigation, LibCurl, UserClass, LibProgress, LibUtils, ComponentCircle, ComponentAvatar, ComponentLabel_input, LibDialog, esp, LibToastProperty, LibIcon, useSafeState, ComponentInput_circle, LibPicture } from 'esoftplay';

export interface ProfileEditProps {
  onFilterChange?: (location: any) => void,
  location?: any,
  navigation: any
}

export default function m(props: ProfileEditProps): any {
  const [image, setImage] = useSafeState<string>('')
  const user = LibUtils.getReduxState('user_class')

  let inputName = React.useRef<ComponentInput_circle>(null)
  let inputPhone = React.useRef<ComponentInput_circle>(null)
  let dialogEditImage = React.useRef<ComponentSlidingup>(null)

  useEffect(() => {
    setImage(user && user.image)
  }, [])

  function doEdit(): void {

    let post = {
      name: encodeURIComponent(inputName.current!.getText()),
      phone: encodeURIComponent(inputPhone.current!.getText()),
      image: image,
    }

    if (inputPhone.current!.getText() == '') {
      LibToastProperty.show('Silahkan masukkan No.Telepon anda')
      inputPhone.current!.focus()
      return
    }
    if (inputName.current!.getText() == '') {
      LibToastProperty.show('Silahkan masukkan Nama anda')
      inputName.current!.focus()
      return
    }

    LibProgress.show('Mohon tunggu')
    new LibCurl('user_edit', post,
      (res, msg) => {
        UserClass.create(res).then(() => {
          LibProgress.hide();
          LibToastProperty.show(msg)
          LibNavigation.back()
                  })
      }, (error) => {
        LibProgress.hide();
        LibDialog.warning('Kesalahan', error);
      })
  }

  function editImage(urlImage: string) {
    // edit image with execute api user_edit
    let post = {
      name: encodeURIComponent(user && user.name),
      phone: encodeURIComponent(user && user.phone),
      image: urlImage,
    }

    new LibCurl('user_edit', post,
      (res, msg) => {
        UserClass.create(res).then(() => {
          LibToastProperty.show(msg)
        })
      }, (error) => {

      })

  }

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <ComponentHeader title="Ubah Profile" btnBack />
      <KeyboardAvoidingView behavior="padding">
        <ScrollView showsVerticalScrollIndicator={false} >
          <View style={[{ paddingTop: 0, padding: 15, margin: 15, backgroundColor: '#fff', borderRadius: 5, paddingBottom: 30 }, LibStyle.elevation(2)]}>
            <ComponentTouchable onPress={() => { dialogEditImage.current!.show() }} >
              {
                image == '' ?
                  <View style={{ alignSelf: 'center', }}>
                    <Image source={esp.assets('icons/ic_no_image.png')} style={{ marginTop: 28, height: 90, width: 90, resizeMode: 'center' }} />
                    <View style={{ width: 25, height: 25, borderRadius: 14.5, backgroundColor: LibStyle.colorPrimaryGreen, position: 'absolute', right: 0, bottom: 0, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                      <LibIcon size={15} name="plus" color="#fff" />
                    </View>
                  </View>
                  :
                  <View style={{ alignSelf: 'center', marginTop: 28, }}>
                    <Image source={{ uri: image }} style={{ height: 100, width: 100, borderRadius: 50, resizeMode: 'cover' }} />
                    <View style={{ width: 25, height: 25, borderRadius: 14.5, backgroundColor: LibStyle.colorRed, position: 'absolute', right: 0, bottom: 0, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                      <LibIcon size={15} name="pencil" color="#fff" />
                    </View>
                  </View>
              }
            </ComponentTouchable>
            <ComponentLabel_input label="Email Anda" mandatory={false} />
            <ComponentInput_circle
              // ref={inputEmail}
              editable={false}
              inactive={false}
              style={{ borderColor: '#c4c4c4', height: 35, marginTop: 8, backgroundColor: '#f6f6f6' }}
              defaultValue={user && user.email}
              placeholder={'Masukkan Email Anda'}
            />
            <ComponentLabel_input label="Nama Anda" mandatory={false} />
            <ComponentInput_circle
              ref={inputName}
              style={{ borderColor: '#c4c4c4', height: 35, marginTop: 8 }}
              defaultValue={user && user.name}
              onSubmitEditing={() => inputPhone.current!.focus()}
              placeholder={'Masukkan Nama Anda'}
            />
            <ComponentLabel_input label="Nomer HP Anda" mandatory={false} />
            <ComponentInput_circle
              ref={inputPhone}
              editable={false}
              inactive={false}
              style={{ borderColor: '#c4c4c4', height: 35, marginTop: 8, backgroundColor: '#f6f6f6' }}
              defaultValue={user.params.Phone}
              onSubmitEditing={() => doEdit()}
              mask="#### #### #### ####"
              keyboardType="numeric"
            />
            <ComponentButton label="Simpan" style={{ marginTop: 20 }} onPress={() => {
              image == '' ?
                LibToastProperty.show("Silahkan Masukkan Foto terlebih dahulu")
                :
                doEdit()
            }}
            />
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
      <ComponentSlidingup ref={dialogEditImage}>
        <View style={{ backgroundColor: 'white', borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingBottom: 35, paddingHorizontal: 19, }}>
          <Text allowFontScaling={false} style={{ marginTop: 26, marginBottom: 23, fontFamily: "Arial", fontSize: 16, fontWeight: "bold", fontStyle: "normal", lineHeight: 22, letterSpacing: 0, textAlign: "center", color: "#34495e" }}>Change Picture</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 27 }}>
            <ComponentCircle image={'icons/ic_camera.png'} color="#f39c12" title={'Kamera'} onPress={() =>
              LibImage.fromCamera().then((url) => {
                dialogEditImage.current!.hide()
                setImage(url)
                editImage(url)
              })} />
            <ComponentCircle image={'icons/ic_galery.png'} color="#3498db" title={'Galeri'} onPress={() =>
              LibImage.fromGallery().then((url) => {
                dialogEditImage.current!.hide()
                setImage(url)
                editImage(url)
              })} />
          </View>
        </View>
      </ComponentSlidingup>
    </View>
  )
}