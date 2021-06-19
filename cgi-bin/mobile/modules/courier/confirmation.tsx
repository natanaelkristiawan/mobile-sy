// withHooks

import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import { ComponentHeader, LibTextstyle, LibScroll, ComponentTouchable, LibStyle, LibDialog, LibIcon, LibImage, LibSlidingup, useSafeState, LibUtils, LibPicture, LibToastProperty, UseCurl, esp, LibCurl, LibInput, LibKeyboard_avoid, LibLoading, LibNavigation, ComponentCircle, HubDetailArgs, LibProgress } from 'esoftplay';


export interface CourierConfirmationProps {

}
export default function m(props: CourierConfirmationProps): any {
  const { url } = LibUtils.getArgsAll(props)

  const imgWidth = (LibStyle.width - 54) / 3
  const imgHeight = imgWidth
  const slidingUpload = useRef<LibSlidingup>(null)
  const [data, setData] = useSafeState<any>()
  const [images, setImages] = useSafeState<any>([])
  const notesInput = useRef<LibInput>(null)
  const receiver = useRef<LibInput>(null)

  function deleteImage(url: string): void {
    let _image = images.filter((item: any) => item != url)
    setImages(_image)
  }

  useEffect(() => {
    loadData()
  }, [])

  function loadData() {
    new LibCurl(url, null,
      (res) => {
        setData(res)
      }, (msg) => {
        LibDialog.warning('Oops.!', msg)
      }, 1
    )
  }


  function finishOrder() {

    if (receiver.current!.getText() == "") {
      LibToastProperty.show("Silahkan Masukkan Nama Penerima")
      receiver.current!.focus()
      return
    }

    // if (notesInput.current!.getText() == "") {
    //   LibToastProperty.show("Silahkan Tambahkan catatan")
    //   notesInput.current!.focus()
    //   return
    // }

    if (images.length == 0) {
      LibToastProperty.show("Silahkan Upload Foto Sebagai Bukti")
      return
    }

    let post = {
      order_id: data.order_id,
      images: images,
      receive_name: receiver.current!.getText(),
      notes: notesInput.current!.getText() || ''
    }

    LibDialog.confirm("Konfirmasi", "Apakah Anda Yakin Ingin Menyelesaikan Transaksi Ini?",
      "Ya",
      () => {
        LibProgress.show("Mohon Tuggu")
        new LibCurl("order_finish", post, (res, msg) => {
          LibProgress.hide()
          LibNavigation.backToRoot()
          LibNavigation.navigate<HubDetailArgs>("hub/detail", { url: res.url })
        }, (err) => {
          LibProgress.hide()
          LibDialog.warning("Oops.!", err)
        }, 1)
      },
      "Batal", () => { })
  }

  if (!data) {
    return <LibLoading />
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <ComponentHeader title="Konfirmasi Pesanan" btnBack />
      <LibScroll style={{ flex: 1 }} >
        <LibTextstyle textStyle='footnote' text="Pemesan" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
          <LibTextstyle textStyle="callout" text="Nama" />
          <LibTextstyle textStyle="callout" text={data.buyer_name} style={{ color: "#888" }} />
        </View>
        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
          <LibTextstyle textStyle="callout" text="No Handphone" />
          <LibTextstyle textStyle="callout" text={data.member.profile.phone} style={{ color: "#888" }} />
        </View>

        <LibTextstyle textStyle='footnote' text="Detail Produk" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
        {
          LibUtils.checkUndefined(data, "item.0") && data.item.map((item: any, i: number) => {
            return (
              <View key={i} style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                <LibTextstyle textStyle="callout" text={item.qty + "X"} />
                {
                  item.image == null || item.image == "" ?
                    <View style={{ height: 30, width: 30, backgroundColor: "#f4f4f4", marginLeft: 10 }} />
                    :
                    <LibPicture source={{ uri: item.image }} style={{ width: 30, height: 30, marginLeft: 10 }} resizeMode="contain" />
                }
                <View style={{ flex: 1, marginLeft: 10 }} >
                  <LibTextstyle textStyle="callout" text={item.product_name} />
                  <LibTextstyle textStyle="caption2" text={item.notes} style={{ color: "#888" }} />
                </View>
                <LibTextstyle textStyle="callout" text={LibUtils.money(item.price)} style={{ color: "#888" }} />
              </View>
            )
          })
        }

        <LibTextstyle textStyle='footnote' text="Detail Transaksi" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
          <LibTextstyle textStyle="callout" text="Biaya Pengiriman" />
          {
            data &&
            <LibTextstyle textStyle="callout" text={LibUtils.money(data.total_shipping)} style={{ fontWeight: "bold" }} />
          }
        </View>
        <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
          <LibTextstyle textStyle="callout" text="Grand Total" />
          {
            data &&
            <LibTextstyle textStyle="callout" text={LibUtils.money(data.grand_total)} style={{ fontWeight: "bold" }} />
          }
        </View>

        <View style={{ flexDirection: "row", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} >
          <LibTextstyle textStyle='footnote' text="Nama Penerima" style={{ fontWeight: "bold", color: "#888" }} />
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#d0021b" }}> *</Text>
        </View>
        <View style={{ paddingHorizontal: 17, paddingVertical: 15, backgroundColor: "white" }} >
          <LibInput
            ref={receiver}
            base
            placeholder="Nama Penerima"
            onChangeText={() => { }}
            style={{ borderWidth: 1, padding: 5, borderColor: "#888", paddingLeft: 15, borderRadius: 5 }}
          />
        </View>

        <LibTextstyle textStyle='footnote' text="Tambahkan Catatan" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
        <View style={{ paddingHorizontal: 17, paddingVertical: 15, backgroundColor: "white" }} >
          <LibInput
            ref={notesInput}
            base
            placeholder="Tambahkan Catatan"
            onChangeText={() => { }}
            multiline
            style={{ borderWidth: 1, padding: 5, borderColor: "#888", paddingLeft: 15, borderRadius: 5 }}
          />
        </View>

        <View style={{ flexDirection: "row", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} >
          <LibTextstyle textStyle='footnote' text="Upload Bukti Pengiriman" style={{ fontWeight: "bold", color: "#888" }} />
          <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 12, fontWeight: "bold", fontStyle: "normal", letterSpacing: 0, color: "#d0021b" }}> *</Text>
        </View>
        <View style={{ paddingLeft: 17, paddingVertical: 15, flexDirection: "row", marginTop: 2, flexWrap: "wrap", flex: 1, backgroundColor: "white" }} >
          <ComponentTouchable onPress={() => {
            LibImage.fromCamera().then((url) => {
              setImages([...images, url])
            })
          }} style={{ marginBottom: 10, marginRight: 10, width: imgWidth, height: imgHeight, backgroundColor: "white", alignItems: "center", justifyContent: "center", borderWidth: 1, borderRadius: 5, borderStyle: "dashed" }} >
            <LibIcon name="plus" size={40} />
          </ComponentTouchable>
          {
            LibUtils.checkUndefined(images, "0") && images.map((item: any, idx: number) => (
              <ComponentTouchable key={idx} onPress={() => {
                LibDialog.warningConfirm("Konfirmasi", "Yakin menghapus gambar ini?", "Ya", () => {
                  deleteImage(item)
                }, "Batal", () => { })
              }} style={{ marginBottom: 10, marginRight: 10, width: imgWidth, height: imgHeight, backgroundColor: "white", borderRadius: 5, alignItems: "center", justifyContent: "center", ...LibStyle.elevation(1) }} >
                <LibPicture source={{ uri: item }} style={{ width: imgWidth, height: imgHeight, borderRadius: 5 }} resizeMode="cover" />
                <View style={{ position: "absolute", top: 5, right: 5 }} >
                  <LibIcon name="trash-can" color={LibStyle.colorRed} />
                </View>
              </ComponentTouchable>
            ))
          }
        </View>
      </LibScroll>

      <ComponentTouchable
        style={{ backgroundColor: LibStyle.colorPrimary, alignItems: "center" }}
        onPress={() => {
          finishOrder()
        }}>
        <LibTextstyle textStyle="callout" text="Selesaikan Pesanan" style={{ padding: 12, color: "white" }} />
      </ComponentTouchable>

      <LibSlidingup ref={slidingUpload} >
        <View style={{ flexDirection: "row", backgroundColor: "white", alignItems: "center", justifyContent: "space-evenly", borderTopRightRadius: 20, borderTopLeftRadius: 20, paddingVertical: 35 }} >
          <ComponentCircle image={'icons/ic_camera.png'} color="#f39c12" title={'Kamera'} onPress={() => {
            LibImage.fromCamera().then((url) => {
              setImages([...images, url])
              slidingUpload.current!.hide()
            })
          }} />
          <ComponentCircle image={'icons/ic_galery.png'} color="#3498db" title={'Galeri'} onPress={() => {
            LibImage.fromGallery().then((url) => {
              setImages([...images, url])
              slidingUpload.current!.hide()
            })
          }} />
        </View>
      </LibSlidingup>
    </View>
  )
}