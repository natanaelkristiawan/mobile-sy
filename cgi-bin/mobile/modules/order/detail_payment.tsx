// withHooks

import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { ComponentHeader, ComponentTouchable, esp, LibIcon, LibStyle, LibToastProperty, LibUtils, useSafeState } from 'esoftplay';
import moment from 'moment/min/moment-with-locales'
import {Collapse,CollapseHeader, CollapseBody} from 'accordion-collapse-react-native';
import HTML from "react-native-render-html";

export interface detailInterface {
  data?:any,
  midtrans?:any,
  useMidtrans?:boolean,
  firstAccess?:boolean
}

export default function m(props: detailInterface): any {

  const data = LibUtils.getArgs(props, "data")
  const midtrans = LibUtils.getArgs(props, "midtrans")
  const useMidtrans = LibUtils.getArgs(props, 'useMidtrans')
  const firstAccess = LibUtils.getArgs(props, 'firstAccess', false)
  function generateTutorial(description)
  {
    let tutorials:any = [];
    for (const property in description) {
      tutorials.push({
        name: property,
        description: convertDescription(description[property])
      })
    }
    return tutorials

  }

  let imageUrl = {
    bca: 'https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336137510-758f10ec383cb349ffee7bc0fa516c3f.png?tr=q-75&w=51',
    mandiri: 'https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336144166-e6e7ce40ff72a97e6e0eeeabda7595d7.png?tr=q-75&w=51',
    bni: 'https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336148727-34b7516141fad67cf3b28a682ab0cc93.png?tr=q-75&w=51',
    bri: 'https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336152817-f0ef4ea005ad461b4b2cd0a8fdec6628.png?tr=q-75&w=51',
    permata: 'https://ik.imagekit.io/tvlk/image/imageResource/2019/05/20/1558336166816-6749d37525bdb6599b47e8f134a094f6.png?tr=q-75&w=51'
  };

  function convertDescription(description) {

    let list = '<ol>'

    description.forEach(element => {
      list += `<li>${element}</li>`;
    });

    list += '</ol>';

    return list;
  }
  
  return (
      
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView showsVerticalScrollIndicator={false} >
            { firstAccess ?
              <ComponentHeader title="Petunjuk Pembayaran" btnGoHome />
              :
              <ComponentHeader title="Petunjuk Pembayaran" btnBack />
            }
            
            <View style={{ backgroundColor: "white", ...LibStyle.elevation(2), borderRadius: 6, marginHorizontal: 10, marginVertical: 10, paddingHorizontal: 17, paddingVertical: 10 }} >
                <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginLeft: 5, fontSize: 12, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Batas Waktu Pembayaran</Text>
                <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginBottom: 10, marginLeft: 5, fontSize: 15, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>{moment(data.exp_date).format("dddd, DD MMMM YYYY, H:mm:ss")}</Text>
                <View style={{ borderBottomWidth: 1, marginBottom: 3, borderBottomColor: '#EBECF1' }}></View>
                <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginLeft: 5, fontSize: 12, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Total Tagihan</Text>
                <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginBottom: 10, marginLeft: 5, fontSize: 15, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>{LibUtils.money(data.grand_total)}</Text>
            </View>

            <View style={{ backgroundColor: "white", ...LibStyle.elevation(2), borderRadius: 6, marginHorizontal: 10, marginVertical: 10, paddingHorizontal: 17, paddingVertical: 10 }} >
                <Text allowFontScaling={false} style={{ fontFamily: "Arial", marginLeft: 5, fontSize: 12, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Metode Pembayaran</Text>
                <View style={{  marginBottom: 3, borderColor: '#EBECF1', marginHorizontal: 10, marginVertical: 10, paddingHorizontal: 17, paddingVertical: 5, alignItems:'center' }}>
                    <Image style={{ width: 100, height: 40, marginRight: 10, marginBottom: 5 }} source={{uri: imageUrl[data.payment_title.toLowerCase()]}} /> 
                    {useMidtrans  ? 
                    
                    
                    
                    <>
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial",  marginBottom: 2 ,fontSize: 12, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>
                      Transfer ke virtual {midtrans.bank}
                    </Text>
                    <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginLeft: 5, fontSize: 20, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>{ midtrans.va_number }</Text>
                    </>




                    : 
                    <>
                    <Text allowFontScaling={false} style={{ fontFamily: "Arial",  marginBottom: 2 ,fontSize: 12, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>
                      Transfer manual ke {data.payment_title}
                    </Text>
                    <Text allowFontScaling={false} numberOfLines={2} style={{ fontFamily: "Arial", marginLeft: 5, fontSize: 20, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, flexWrap: 'wrap' }}>{ data.payment.bank_number }</Text>
                    </>
                    }
                    </View>
                {useMidtrans  ? 
                <View style={{ backgroundColor: "#046659", borderRadius: 4, marginHorizontal: 80, marginVertical: 10, paddingHorizontal: 17, paddingVertical: 10, alignItems:'center'}}>
                  <ComponentTouchable onPress={() => {
                    LibUtils.copyToClipboard( midtrans.va_number )
                    LibToastProperty.show("Berhasil disalin " +  midtrans.va_number )
                    }}>
                    <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 13, color: "white" }}>SALIN</Text>
                  </ComponentTouchable>        
                </View>
                : 
                <View style={{ backgroundColor: "#046659", borderRadius: 4, marginHorizontal: 80, marginVertical: 10, paddingHorizontal: 17, paddingVertical: 10, alignItems:'center'}}>
                  <ComponentTouchable onPress={() => {
                    LibUtils.copyToClipboard(data.payment.bank_number)
                    LibToastProperty.show("Berhasil disalin " +  data.payment.bank_number )
                    }}>
                    <Text allowFontScaling={false} style={{ fontFamily: "ArialBold", fontSize: 13, color: "white" }}>SALIN</Text>
                  </ComponentTouchable>        
                </View>
                }
            </View>

            <View>
                {generateTutorial(data.payment.description).map((prop, key) => {
                    return (
                    <Collapse style={{ backgroundColor: "white", ...LibStyle.elevation(2),  borderRadius: 6, position:"relative", marginHorizontal: 10, marginVertical: 5, paddingHorizontal: 17, paddingVertical: 10 }}>
                        <CollapseHeader>
                            <View style={{ flexDirection: 'row', marginBottom:10}} >
                                <Text allowFontScaling={false} style={{  fontFamily: "Arial", marginLeft: 5, fontSize: 12, fontWeight: "bold", fontStyle: "normal", lineHeight: 21, letterSpacing: 0, color: "#046659", flexWrap: 'wrap' }}>Petunjuk Pembayaran Melalui {prop.name.toUpperCase()}</Text>
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