// withHooks

import React, { useEffect } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { ComponentHeader, useSafeState, usePersistState, UseCurl, esp, LibLoading, ComponentEmpty, LibTextstyle, LibScroll, LibIcon, LibStyle, LibUtils, LibNavigation } from 'esoftplay';


export interface UserContactProps {

}


export interface UserContactDataHelp {
  title: string,
  link: string,
}

export interface UserContactData {
  id: string,
  title: string,
  description: string,
  phone: string,
  phone_wa: string,
  email: string,
  help_list: UserContactDataHelp[],
}

export default function m(props: UserContactProps): any {
  const [data, setData] = usePersistState<UserContactData>('user_contact')
  const [curl, loading, error] = UseCurl(true)

  function loadData() {
    curl("contact", null,
      (res) => {
        setData(res)
      }
    )
  }

  useEffect(loadData, [])

  return (
    <View style={{ flex: 1 }} >
      {
        loading || !data ? <LibLoading /> :
          error != '' ? <ComponentEmpty text={error} onPress={loadData} label={'Coba Lagi'} />
            :
            <>
              <ComponentHeader btnBack title={data.title} />
              <LibScroll style={{ backgroundColor: "#f9f9f9" }} >
                <View style={{ margin: 20 }} >
                  <LibTextstyle textStyle="callout" text={data.description} />
                </View>
                <View style={{ marginHorizontal: 20, flexDirection: 'row' }} >
                  <TouchableOpacity activeOpacity={1}
                    onPress={() => { LibUtils.waTo(data.phone_wa.replace(/^0/g, "62")) }}
                    style={{ backgroundColor: 'white', ...LibStyle.elevation(2), borderRadius: 10, padding: 10, marginRight: 10, flex: 1, alignItems: 'center', justifyContent: "center" }} >
                    <LibIcon name="comment-multiple" />
                    <LibTextstyle textStyle="footnote" text="Chat dengan kami" style={{ textAlign: 'center', marginTop: 10 }} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1}
                    onPress={() => LibUtils.mailTo(data.email, esp.appjson()?.expo?.name + " v" + esp.appjson()?.expo?.version)}
                    style={{ backgroundColor: 'white', ...LibStyle.elevation(2), borderRadius: 10, padding: 10, marginRight: 10, flex: 1, alignItems: 'center', justifyContent: "center" }} >
                    <LibIcon name="email" />
                    <LibTextstyle textStyle="footnote" text="Email kami" style={{ textAlign: 'center', marginTop: 10 }} />
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={1}
                    onPress={() => { LibUtils.telTo(data.phone) }}
                    style={{ backgroundColor: 'white', ...LibStyle.elevation(2), borderRadius: 10, padding: 10, flex: 1, alignItems: 'center', justifyContent: "center" }} >
                    <LibIcon name="phone" />
                    <LibTextstyle textStyle="footnote" text="Hubungi Kami" style={{ textAlign: 'center', marginTop: 10 }} />
                  </TouchableOpacity>
                </View>
                {
                  LibUtils.checkUndefined(data, 'help_list') && data.help_list.map((x, i) => (
                    <TouchableOpacity activeOpacity={1}
                      key={i}
                      onPress={() => LibNavigation.navigate("content/detail", { url: x.link })}
                      style={{ backgroundColor: 'white', ...LibStyle.elevation(2), borderRadius: 10, padding: 10, flex: 1, flexDirection: 'row', alignItems: "center", marginHorizontal: 20, marginTop: 10, marginBottom: 2 }} >
                      <LibTextstyle textStyle="footnote" text={x.title} style={{ textAlign: 'left', flex: 1 }} />
                      <LibIcon name="chevron-right" />
                    </TouchableOpacity>
                  ))
                }
              </LibScroll>
            </>
      }

    </View>
  )
}