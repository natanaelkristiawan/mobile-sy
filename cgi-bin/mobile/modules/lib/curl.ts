//
//dipindahkan ke project untuk meminimalisir cache browser/webview
import react from "react";
import momentTimeZone from "moment-timezone"
import moment from "moment/min/moment-with-locales"
import { esp, LibCrypt, LibProgress, _global, LibWorker, LibUtils, LibCurl } from 'esoftplay';
import AsyncStorage from '@react-native-community/async-storage';
import { reportApiError } from "esoftplay/error";

export default class ecurl {
  isDebug = esp.config("isDebug");
  post: any;
  header: any;
  url: any = esp.config('url')
  apiKey: any = 0
  uri: any = '';
  fetchConf: any = ''
  maxTimeout = 120000 // 2 menit
  // timeout: any

  constructor(uri?: string, post?: any, onDone?: (res: any, msg: string) => void, onFailed?: (msg: string, timeout: boolean) => void, debug?: number) {
    this.header = {}
    this.setUri = this.setUri.bind(this);
    this.setUrl = this.setUrl.bind(this);
    this.onFetched = this.onFetched.bind(this)
    this.setHeader = this.setHeader.bind(this);
    this.signatureBuild = this.signatureBuild.bind(this)
    this.encodeGetValue = this.encodeGetValue.bind(this)
    this.urlEncode = this.urlEncode.bind(this)
    const str: any = _global.store.getState()
    if (uri && str.lib_net_status.isOnline) {
      this.init(uri, post, onDone, onFailed, debug);
    } else if (!str.lib_net_status.isOnline && onFailed) {
      onFailed("Failed to access", false);
    }
  }

  setUrl(url: string): void {
    this.url = url
  }

  setUri(uri: string): void {
    this.uri = uri
  }

  setApiKey(apiKey: string): void {
    this.apiKey = apiKey
  }

  setMaxTimeout(milisecond: number): void {
    this.maxTimeout = milisecond
  }

  async setHeader(): Promise<void> {
    const config = esp.config();
    const crypt = new LibCrypt()
    if ((/:\/\/data.*?\/(.*)/g).test(this.url)) {
      this.header['masterkey'] = crypt.encode(this.url)
    }
    let group_id = await AsyncStorage.getItem("profile_index_active_group_id")
    const dt = LibUtils.getReduxState("user_class")
    let token = this.getTimeByTimeZone(config.timezone) + ''
    if (!group_id) {
      group_id = esp.config("group_id")
    }
    if (dt) {
      token += "|" + dt.id || 0
      token += "|" + dt.member_id || 0
      token += "|" + group_id || 0
    } else {
      token += "|" + 0
      token += "|" + 0
      token += "|" + 0
    }
    //send telegram
    // let post = {
    //   text: this.url + '' + this.uri
    //     + '\ntimestamp|user_id|member_id|group_id\n'
    //     + token + '\n' + crypt.encode(token),
    //   chat_id: 355199743,
    //   disable_web_page_preview: true
    // }
    // fetch('https://api.telegram.org/bot923808407:AAEFBlllQNKCEn8E66fwEzCj5vs9qGwVGT4/sendMessage', {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(post)
    // })
    this.header['token'] = crypt.encode(token)
  }

  onDone(result: any, msg?: string): void {

  }

  onFailed(msg: string, timeout: boolean): void {

  }

  secure(token_uri?: string): (apiKey?: string) => (uri: string, post?: any, onDone?: (res: any, msg: string) => void, onFailed?: (msg: string, timeout: boolean) => void, debug?: number) => void {
    return (apiKey?: string): (uri: string, post?: any, onDone?: (res: any, msg: string) => void, onFailed?: (msg: string, timeout: boolean) => void, debug?: number) => void => {
      return async (uri: string, post?: any, onDone?: (res: any, msg: string) => void, onFailed?: (msg: string, timeout: boolean) => void, debug?: number) => {
        await this.setHeader();
        const _apiKey = apiKey || this.apiKey
        Object.keys(post).forEach((key) => {
          const postkey = post[key]
          post[key] = (typeof postkey == 'string') && postkey.includes('\\') && (postkey.startsWith("{") || postkey.startsWith("[")) ? JSON.parse(postkey) : postkey
        })
        let _payload: any = {}
        Object.keys(post).map((key) => {
          _payload[decodeURIComponent(encodeURIComponent(key))] = decodeURIComponent(encodeURIComponent(post[key]))
        })
        let _post: any = { payload: JSON.stringify(_payload) }
        if (_apiKey) {
          _post.api_key = _apiKey
          post.api_key = _apiKey
        }
        let ps = Object.keys(_post).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(_post[key])).join('&');
        var options: any = {
          method: "POST",
          headers: {
            ...this.header,
            ["Content-Type"]: "application/x-www-form-urlencoded;charset=UTF-8"
          },
          body: ps,
          cache: "no-store",
          _post: _post
        }
        var res = await fetch(this.url + this.uri + (token_uri || 'get_token'), options);
        let resText = await res.text()
        this.onFetched(resText,
          (res, msg) => {
            this.init(uri, { ...post, access_token: res }, onDone, onFailed, debug);
          }, (msg) => {
            if (onFailed)
              onFailed(msg, false)
          }, debug)
      }
    }
  }

  upload(uri: string, postKey: string, fileUri: string, mimeType: string, onDone?: (res: any, msg: string) => void, onFailed?: (msg: string, timeout: boolean) => void, debug?: number): void {
    postKey = postKey || "image";
    var uName = fileUri.substring(fileUri.lastIndexOf("/") + 1, fileUri.length);
    if (!uName.includes('.')) {
      uName += '.jpg'
    }
    var uType = mimeType || "image/jpeg"
    var post = { [postKey]: { uri: fileUri, type: uType, name: uName } }
    this.init(uri, post, onDone, onFailed, debug, true)
  }

  urlEncode(str: string): string {
    return str
      .replace(/\!/g, '%21')
      .replace(/\'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/%20/g, '+')
  }

  encodeGetValue(_get: string): string {
    if (_get != '') {
      let hashes = _get.split('&')
      let params: any = {}
      hashes.map(hash => {
        if (hash && hash.includes('=')) {
          let [key, val] = hash.split('=')
          params[key] = encodeURIComponent(decodeURIComponent(val.trim()))
        }
      })
      return Object.keys(params).map((key, index) => {
        let out = ''
        if (key) {
          out += index == 0 ? '' : '&'
          out += [key] + '=' + params[key]
        }
        return out
      }).join('')
    }
    return _get
  }

  signatureBuild(): string {
    let signature = '';
    if (this.url.includes(esp.config('url'))) {
      let payload = '';
      let method = '';
      let _uri = '';
      const link = this.url + this.uri;
      if (this.post) {
        method = 'POST';
        _uri = link.replace(esp.config('url'), '');
        _uri = _uri.includes('?') ? _uri.substring(0, _uri.indexOf('?')) : _uri
        payload = this.post;
      } else {
        method = 'GET';
        _uri = link.replace(esp.config('url'), '');
        payload = this.encodeGetValue(_uri.includes('?') ? _uri.substring(_uri.indexOf('?') + 1, _uri.length) : '');
        _uri = _uri.includes('?') ? _uri.substring(0, _uri.indexOf('?')) : _uri;
      }
      // console.log("HASH", method, _uri, payload, typeof payload == 'string' ? this.urlEncode(payload) : payload)
      signature = method + ':' + _uri + ':' + LibUtils.shorten(typeof payload == 'string' ? this.urlEncode(payload) : payload);
    }
    return signature
  }

  async custom(uri: string, post?: any, onDone?: (res: any, timeout: boolean) => void, debug?: number): Promise<void> {
    // this.setMaxTimeout(this.maxTimeout)
    // this.timeout = setTimeout(() => {
    //   // if (onDone)
    //     // onDone("Request Timed Out", true)
    //   LibProgress.hide()
    // }, this.maxTimeout);
    const str: any = _global.store.getState()
    if (str.lib_net_status.isOnline) {
      if (post) {
        let ps = Object.keys(post).map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(post[key]);
        }).join('&');
        this.post = ps
      }
      this.setUri(uri)
      if ((/^[A-z]+:\/\//g).test(uri)) {
        this.setUrl(uri)
        this.setUri("")
      } else {
        this.setUrl(esp.config("url"))
      }
      await this.setHeader()
      var options: any = {
        method: !this.post ? "GET" : "POST",
        headers: {
          ...this.header,
          ["Content-Type"]: "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: this.post,
        cache: "no-store",
        mode: "cors",
        _post: post
      }
      if (debug == 1)
        esp.log(this.url + this.uri, options)
      var res
      this.fetchConf = { url: this.url + this.uri, options: options }
      res = await fetch(this.url + this.uri, options)
      // clearTimeout(this.timeout)
      var resText = await res.text()
      var resJson = (resText.startsWith("{") || resText.startsWith("[")) ? JSON.parse(resText) : null
      if (resJson) {
        if (onDone) onDone(resJson, false)
        this.onDone(resJson)
      } else {
        LibProgress.hide()
        this.onError(resText)
      }
    }
  }

  async init(uri: string, post?: any, onDone?: (res: any, msg: string) => void, onFailed?: (msg: string, timeout: boolean) => void, debug?: number, upload?: boolean): Promise<void> {
    // this.setMaxTimeout(this.maxTimeout)
    // this.timeout = setTimeout(() => {
    //   // this.onFailed("Request Timed Out", true)
    //   // if (onFailed)
    //     // onFailed("Request Timed Out", true)
    //   LibProgress.hide()
    // }, this.maxTimeout);
    if (post) {
      if (upload) {
        let fd = new FormData();
        Object.keys(post).map(function (key) {
          if (key !== undefined) {
            fd.append(key, post[key])
          }
        });
        this.post = fd
      } else {
        let ps = Object.keys(post).map((key) => {
          return encodeURIComponent(key) + '=' + encodeURIComponent(post[key]);
        }).join('&');
        this.post = ps
      }
    }
    this.setUri(uri)
    if ((/^[A-z]+:\/\//g).test(uri)) {
      this.setUrl(uri)
      this.setUri("")
    } else {
      this.setUrl(esp.config("url"))
    }
    await this.setHeader();
    if (!upload)
      this.header["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8"
    var options: any = {
      method: !this.post ? "GET" : "POST",
      headers: this.header,
      body: this.post,
      cache: "no-store",
      mode: "cors",
      _post: post
    }
    if (debug == 1) esp.log(this.url + this.uri, options)
    this.fetchConf = { url: this.url + this.uri, options: options }

    // if (Platform.OS == 'android' && Platform.Version <= 22) {
    var res = await fetch(this.url + this.uri, options);
    let resText = await res.text()
    this.onFetched(resText, onDone, onFailed, debug)
    // } else
    //   if (!upload) {
    //     LibWorker.curl(this.url + this.uri, options, async (resText) => {
    //       if (typeof resText == 'string') {
    //         this.onFetched(resText, onDone, onFailed, debug)
    //       }
    //     })
    //   } else {
    //     var res = await fetch(this.url + this.uri, options);
    //     let resText = await res.text()
    //     this.onFetched(resText, onDone, onFailed, debug)
    //   }
  }

  onFetched(resText: string, onDone?: (res: any, msg: string) => void, onFailed?: (msg: string, timeout: boolean) => void, debug?: number): void {
    var resJson = (resText.startsWith("{") && resText.endsWith("}")) || (resText.startsWith("[") && resText.endsWith("]")) ? JSON.parse(resText) : resText
    if (typeof resJson == "object") {
      if (resJson.ok === 1) {
        if (onDone) onDone(resJson.result, resJson.message)
        this.onDone(resJson.result, resJson.message)
      } else {
        if (onFailed) onFailed(resJson.message, false)
        this.onFailed(resJson.message, false)
      }
    } else {
      this.onError(resText)
    }
  }

  onError(msg: string): void {
    esp.log("\x1b[31m", msg)
    esp.log("\x1b[0m")
    reportApiError(this.fetchConf, msg)
    LibProgress.hide()
  }

  getTimeByTimeZone(timeZone: string): number {
    var mytimes = [86400, 3600, 60, 1]
    var date1 = [], date2 = []
    var dateFormat = "H-m-s"
    var dt1: any = momentTimeZone.tz(new Date(), timeZone)
    var dt2 = moment(new Date())
    date1.push(this.getDayOfYear(dt1))
    date2.push(this.getDayOfYear(dt2))
    date1.push(...dt1.format(dateFormat).split("-"))
    date2.push(...dt2.format(dateFormat).split("-"))
    var time = (new Date()).getTime();
    var a, b
    for (var i = 0; i < date1.length; i++) {
      a = parseInt(date1[i]);
      b = parseInt(date2[i]);
      if (a > b) {
        time += mytimes[i] * (a - b)
      } else {
        time -= mytimes[i] * (b - a)
      }
    }
    return time;
  }

  getDayOfYear(d: string): number {
    var date = new Date(d);
    var start = new Date(date.getFullYear(), 0, 0);
    var diff = date.getTime() - start.getTime();
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    return day
  }
}