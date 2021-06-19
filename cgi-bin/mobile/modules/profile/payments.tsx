// withHooks

import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { ComponentHeader, ComponentTouchable, LibIcon, LibStyle, LibToastProperty, LibUtils, useSafeState } from 'esoftplay';
import moment from 'moment/min/moment-with-locales'
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import HTML from "react-native-render-html";

export interface item {
    name?:string;
    description?:[];
}

export default function m(this: any): any {

    const tutorials = [
        {
            name : "Transfer ATM",
            description : `<ol>
                <li>Pilih <b>Transaksi Lainnya</b> > <b>Transfer</b> > <b>Ke Rec BCA Virtual Account</b></li>
                <li>Masukkan nomor virtual account kamu dan pilih <b>Benar</b></li>
                <li>Periksa informasi yang muncul di layar. Pastikan tagihan dan nama pemesan sesuai</li>
            </ol>`
        },
        {
            name: 'm-BCA',
            description : `<ol>
                <li>Pilih <b>Transaksi Lainnya</b> > <b>Transfer</b> > <b>Ke Rec BCA Virtual Account</b></li>
                <li>Masukkan nomor virtual account kamu dan pilih <b>Benar</b></li>
                <li>Periksa informasi yang muncul di layar. Pastikan tagihan dan nama pemesan sesuai</li>
            </ol>`
        }
    ];
    
    return (
      
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView showsVerticalScrollIndicator={false} >
            <ComponentHeader title="Sukses Order" btnBack />
            <View style={{ backgroundColor: "white", ...LibStyle.elevation(2), borderRadius: 6, marginHorizontal: 10, marginVertical: 10, paddingHorizontal: 17, paddingVertical: 10 }} >
                <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginLeft: 5, fontSize: 12, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Batas Waktu Pembayaran</Text>
                <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginBottom: 10, marginLeft: 5, fontSize: 15, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>{moment().format("dddd, DD MMMM YYYY, H:mm:ss")}</Text>
                <View style={{ borderBottomWidth: 1, marginBottom: 3, borderBottomColor: '#EBECF1' }}></View>
                <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginLeft: 5, fontSize: 12, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Total Tagihan</Text>
                <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginBottom: 10, marginLeft: 5, fontSize: 15, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>18.000</Text>
            </View>

            <View style={{ backgroundColor: "white", ...LibStyle.elevation(2), borderRadius: 6, marginHorizontal: 10, marginVertical: 10, paddingHorizontal: 17, paddingVertical: 10 }} >
                <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginLeft: 5, fontSize: 12, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Metode Pembayaran</Text>
                <View style={{  marginBottom: 3, borderColor: '#EBECF1', marginHorizontal: 10, marginVertical: 10, paddingHorizontal: 17, paddingVertical: 5, alignItems:'center' }}>
                    <Image style={{ width: 100, height: 40, marginRight: 10, marginBottom: 5 }} source={{uri: "https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336137510-758f10ec383cb349ffee7bc0fa516c3f.png?tr=q-75&w=51"}} /> 
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial",  marginBottom: 2 ,fontSize: 12, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Transfer ke virtual BCA</Text>
                    <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginLeft: 5, fontSize: 20, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>258711487893</Text>
                </View>

                <View style={{ backgroundColor: "#046659", borderRadius: 4, marginHorizontal: 80, marginVertical: 10, paddingHorizontal: 17, paddingVertical: 10, alignItems:'center'}}>
                    <ComponentTouchable onPress={() => {
                            LibUtils.copyToClipboard('258711487893')
                            LibToastProperty.show("Berhasil disalin " + '258711487893')
                            }}>
                            <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 13, color: "white" }}>SALIN</Text>
                        </ComponentTouchable>        
                </View>
            </View>

            <View>
                {tutorials.map((prop, key) => {
                    return (
                    <Collapse style={{ backgroundColor: "white", ...LibStyle.elevation(2),  borderRadius: 6, position:"relative", marginHorizontal: 10, marginVertical: 5, paddingHorizontal: 17, paddingVertical: 10 }}>
                        <CollapseHeader>
                            <View style={{ flexDirection: 'row', marginBottom:10}} >
                                <Text allowFontScaling={false} style={{  fontFamily: "Arial", marginLeft: 5, fontSize: 12, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Petunjuk Pembayaran Melalui {prop.name}</Text>
                                <LibIcon style={{ position:"absolute", right:3 }} name="arrow-down-drop-circle" size={20} color={LibStyle.colorPrimaryGreen} />
                            </View>
                        </CollapseHeader>
                        <CollapseBody>
                        <View style={{ marginLeft: 0}}>
                            <HTML tagsStyles={{ ol: { textAlign: 'left', marginBottom:7, marginLeft: 0 } }} html={prop.description} />
                        </View>
                        </CollapseBody>
                    </Collapse>

                    );
                })}
              
            </View>
        </ScrollView>
    </View>
  )
}