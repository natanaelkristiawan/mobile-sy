// withHooks

import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ComponentHeader, LibTextstyle, LibScroll, LibIcon, LibStyle, LibUtils, LibCurl, esp, useSafeState, UseCurl, LibLoading, LibPicture, ComponentTouchable, LibNavigation, ProfileIndexProperty, usePersistState, HubListProperty, LibDialog } from 'esoftplay';


export interface HubDetailArgs {
  url: string,
}

export interface HubDetailProps {

}
export default function m(props: HubDetailProps): any {

  const { url } = LibUtils.getArgsAll(props)
  const [curl, loading, error] = UseCurl()
  const [data, setData] = useSafeState<any>()
  const [activeGroupId] = ProfileIndexProperty.groupIdState().useState()
  const imgWidth = (LibStyle.width - 54) / 3
  const imgHeight = imgWidth

  useEffect(() => {
    loadDetail()
  }, [])

  function loadDetail(): void {
    curl(url, null, (res) => {
      esp.log(res);
      setData(res)
    }, 1)
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#f9f9f9" }}>
      <ComponentHeader title="Detail Pesanan" btnBack />
      {
        loading ? <LibLoading /> :
          error ?
            <View style={{ flex: 1, marginTop: LibStyle.height * 0.3, justifyContent: 'center', alignItems: 'center' }} >
              <LibTextstyle text={error} textStyle="body" style={{ textAlign: 'center' }} />
            </View>
            :
            <>
              <LibScroll>
                <View style={{ paddingHorizontal: 17, paddingVertical: 10, backgroundColor: "white" }} >
                  <LibTextstyle textStyle={"footnote"} text="Status Pesanan" style={{ color: "#888", fontWeight: "bold" }} />
                  {
                    LibUtils.checkUndefined(data, "status") &&
                    <LibTextstyle textStyle="largeTitle" text={data.status_send.title} style={{ fontWeight: "bold" }} />
                  }
                </View>
                <LibTextstyle textStyle='footnote' text="Pemesan" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
                <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                  <LibTextstyle textStyle="callout" text="Nama" />
                  <LibTextstyle textStyle="callout" text={data && data.buyer_name} style={{ color: "#888" }} />
                </View>
                <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                  <LibTextstyle textStyle="callout" text="No Handphone" />
                  {
                    LibUtils.checkUndefined(data, "member.profile") &&
                    <LibTextstyle textStyle="callout" text={data.member.profile.phone} style={{ color: "#888" }} />
                  }
                </View>
                {
                  LibUtils.checkUndefined(data, "member.profile") &&
                  <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "flex-end", marginTop: 2, backgroundColor: "white" }} >
                    <TouchableOpacity onPress={() => LibUtils.telTo(data.member.profile.phone)} activeOpacity={1} style={{ marginLeft: 17, justifyContent: "center", height: 50, width: 50, backgroundColor: "white", alignItems: 'center', borderRadius: 25, flexDirection: "row", ...LibStyle.elevation(2) }} >
                      <LibIcon name="phone" color={LibStyle.colorPrimary} />
                      {/* <LibTextstyle textStyle="callout" text="Panggil" style={{ color: LibStyle.colorPrimary, marginLeft: 10 }} /> */}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => LibUtils.waTo(data.member.profile.phone)} activeOpacity={1} style={{ marginLeft: 17, justifyContent: "center", height: 50, width: 50, backgroundColor: "white", alignItems: 'center', borderRadius: 25, flexDirection: "row", ...LibStyle.elevation(2) }} >
                      <LibIcon name="whatsapp" color={LibStyle.colorPrimary} />
                      {/* <LibTextstyle textStyle="callout" text="WhatsApp" style={{ color: LibStyle.colorPrimary, marginLeft: 10 }} /> */}
                    </TouchableOpacity>
                  </View>
                }

                {
                  LibUtils.checkUndefined(data, "receiver.name") &&
                  <>
                    <LibTextstyle textStyle='footnote' text="Penerima" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
                    <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                      <LibTextstyle textStyle="callout" text="Nama Penerima" />
                      <LibTextstyle textStyle="callout" text={data?.receiver?.name} style={{ color: "#888" }} />
                    </View>
                    <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                      <LibTextstyle textStyle="callout" text="No Handphone" />
                      <LibTextstyle textStyle="callout" text={data?.receiver?.phone} style={{ color: "#888" }} />
                    </View>
                    <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "flex-end", marginTop: 2, backgroundColor: "white" }} >
                      <TouchableOpacity onPress={() => { LibUtils.telTo(data?.receiver?.phone) }} activeOpacity={1} style={{ marginLeft: 17, justifyContent: "center", height: 50, width: 50, backgroundColor: "white", alignItems: 'center', borderRadius: 25, flexDirection: "row", ...LibStyle.elevation(2) }} >
                        <LibIcon name="phone" color={LibStyle.colorPrimary} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => { LibUtils.waTo(data?.receiver?.phone) }} activeOpacity={1} style={{ marginLeft: 17, justifyContent: "center", height: 50, width: 50, backgroundColor: "white", alignItems: 'center', borderRadius: 25, flexDirection: "row", ...LibStyle.elevation(2) }} >
                        <LibIcon name="whatsapp" color={LibStyle.colorPrimary} />
                      </TouchableOpacity>
                    </View>
                  </>
                }

                {
                  LibUtils.checkUndefined(data, "courier_name") &&
                  <>
                    <LibTextstyle textStyle='footnote' text="Kurir Yang Bertugas" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
                    <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                      <LibTextstyle textStyle="callout" text="Nama Kurir" />
                      <LibTextstyle textStyle="callout" text={data?.courier_name} style={{ color: "#888" }} />
                    </View>
                    <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                      <LibTextstyle textStyle="callout" text="No Handphone" />
                      <LibTextstyle textStyle="callout" text={data?.courier_phone} style={{ color: "#888" }} />
                    </View>
                    {
                      data.courier_phone &&
                      <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "flex-end", marginTop: 2, backgroundColor: "white" }} >
                        <TouchableOpacity onPress={() => { LibUtils.telTo(data?.courier_phone) }} activeOpacity={1} style={{ marginLeft: 17, justifyContent: "center", height: 50, width: 50, backgroundColor: "white", alignItems: 'center', borderRadius: 25, flexDirection: "row", ...LibStyle.elevation(2) }} >
                          <LibIcon name="phone" color={LibStyle.colorPrimary} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { LibUtils.waTo(data?.courier_phone) }} activeOpacity={1} style={{ marginLeft: 17, justifyContent: "center", height: 50, width: 50, backgroundColor: "white", alignItems: 'center', borderRadius: 25, flexDirection: "row", ...LibStyle.elevation(2) }} >
                          <LibIcon name="whatsapp" color={LibStyle.colorPrimary} />
                        </TouchableOpacity>
                      </View>
                    }
                  </>
                }


                <LibTextstyle textStyle='footnote' text="Alamat Pengiriman" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
                <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                  <LibTextstyle textStyle="callout" text="Alamat" />
                  <LibTextstyle textStyle="callout" text={data && data.address} style={{ color: "#888" }} />
                </View>
                <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                  <LibTextstyle textStyle="callout" text="Kelurahan" />
                  {
                    LibUtils.checkUndefined(data, "member.profile") &&
                    <LibTextstyle textStyle="callout" text={data.member.profile.village_name} style={{ color: "#888" }} />
                  }
                </View>
                <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                  <LibTextstyle textStyle="callout" text="Kecamatan" />
                  {
                    LibUtils.checkUndefined(data, "member.location_detail") && data.member.location_detail && data.member.location_detail.subdistrict &&
                    <LibTextstyle textStyle="callout" text={data.member.location_detail.subdistrict.title} style={{ color: "#888" }} />
                  }
                </View>
                <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                  <LibTextstyle textStyle="callout" text="Kota/Kabupaten" />
                  {
                    LibUtils.checkUndefined(data, "member.location_detail") && data.member.location_detail && data.member.location_detail.city &&
                    <LibTextstyle textStyle="callout" text={data.member.location_detail.city.title} style={{ color: "#888" }} />
                  }
                </View>
                <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                  <LibTextstyle textStyle="callout" text="Provinsi" />
                  {
                    LibUtils.checkUndefined(data, "member.location_detail") && data.member.location_detail && data.member.location_detail.state &&
                    <LibTextstyle textStyle="callout" text={data.member.location_detail.state.title} style={{ color: "#888" }} />
                  }
                </View>
                <View style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                  <LibTextstyle textStyle="callout" text="Kode POS" />
                  {
                    LibUtils.checkUndefined(data, "member.profile") &&
                    <LibTextstyle textStyle="callout" text={data.member.profile.zipcode} style={{ color: "#888" }} />
                  }
                </View>
                <LibTextstyle textStyle='footnote' text="Detail Produk" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />

                {
                  LibUtils.checkUndefined(data, "item.0") && Array.isArray(data.item) && data.item.length > 0 && data.item.map((item: any, i: number) => {
                    return (
                      <View key={i} style={{ paddingHorizontal: 17, paddingVertical: 10, flexDirection: "row", justifyContent: "space-between", marginTop: 2, backgroundColor: "white" }} >
                        <LibTextstyle textStyle="callout" text={item.qty + "x"} />
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
                  <LibTextstyle textStyle="callout" text="Harga Total" />
                  {
                    data &&
                    <LibTextstyle textStyle="callout" text={LibUtils.money(data.total_price)} style={{ fontWeight: "bold" }} />
                  }
                </View>
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

                {
                  LibUtils.checkUndefined(data, "receive_name") && data.receive_name != "" &&
                  <>
                    <LibTextstyle textStyle='footnote' text="Nama Penerima" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
                    <View style={{ paddingHorizontal: 17, paddingVertical: 15, backgroundColor: "white" }} >
                      <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14 }} >{data.receive_name || ''}</Text>
                    </View>
                  </>
                }

                {
                  LibUtils.checkUndefined(data, "notes") && data.notes != "" &&
                  <>
                    <LibTextstyle textStyle='footnote' text="Catatan" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
                    <View style={{ paddingHorizontal: 17, paddingVertical: 15, backgroundColor: "white" }} >
                      <Text allowFontScaling={false} style={{ fontFamily: "Arial", fontSize: 14 }} >{data.notes || ''}</Text>
                    </View>
                  </>
                }

                {
                  LibUtils.checkUndefined(data, "images.0") &&
                  <>
                    <LibTextstyle textStyle='footnote' text="Bukti Pengiriman" style={{ fontWeight: "bold", color: "#888", paddingHorizontal: 17, paddingVertical: 5, paddingTop: 20 }} />
                    <View style={{ paddingLeft: 17, paddingVertical: 15, flexDirection: "row", marginTop: 2, flexWrap: "wrap", flex: 1, backgroundColor: "white" }} >
                      {
                        data.images.map((item: any, idx: number) => (
                          <ComponentTouchable key={idx} onPress={() => {
                            LibNavigation.navigate('content/gallery', { image: item.image, index: idx })
                          }} style={{ marginBottom: 10, marginRight: 10, width: imgWidth, height: imgHeight, backgroundColor: "white", borderRadius: 5, alignItems: "center", justifyContent: "center", ...LibStyle.elevation(1) }} >
                            <LibPicture source={{ uri: item.image }} style={{ width: imgWidth, height: imgHeight, borderRadius: 5 }} resizeMode="cover" />
                          </ComponentTouchable>
                        ))
                      }
                    </View>
                  </>
                }

              </LibScroll >

              {//dispatcher
                data && activeGroupId && data.status == 3 && data.courier_id == 0 && activeGroupId == 7 && data.status_send.id == 1 &&
                <ComponentTouchable
                  style={{ backgroundColor: LibStyle.colorPrimary, alignItems: "center" }}
                  onPress={() => {
                    LibNavigation.navigate("hub/courier_list", { from: "detail", order_id: data.order_id })
                  }}>
                  <LibTextstyle textStyle="callout" text="PILIH KURIR" style={{ padding: 12, color: "white" }} />
                </ComponentTouchable>
              }

              {//dispatcher CONFIRMATION
                data && activeGroupId && data.status == 3 && data.courier_id == 0 && activeGroupId == 7 && data.status_send.id != 1 &&
                <ComponentTouchable
                  style={{ backgroundColor: LibStyle.colorPrimary, alignItems: "center" }}
                  onPress={() => {
                    LibDialog.confirm("Konfirmasi", "Konfirmasi barang telah sampai di HUB?", "Ya",
                      () => {
                        HubListProperty.confirmArrivedHUB(data.order_id, (res: any) => { loadDetail() })
                      }, "Batal", () => { })
                  }}>
                  <LibTextstyle textStyle="callout" text="KONFIRMASI BARANG INI" style={{ padding: 12, color: "white" }} />
                </ComponentTouchable>
              }

              {//courier
                data && activeGroupId && data.status == 3 && data.status_send.id == 2 && activeGroupId == 8 &&
                <ComponentTouchable
                  style={{ backgroundColor: LibStyle.colorPrimary, alignItems: "center" }}
                  onPress={() => {
                    LibNavigation.navigate("courier/confirmation", { url: url })
                  }}>
                  <LibTextstyle textStyle="callout" text="Selesaikan Pesanan" style={{ padding: 12, color: "white" }} />
                </ComponentTouchable>
              }
            </>
      }
    </View >
  )
}
