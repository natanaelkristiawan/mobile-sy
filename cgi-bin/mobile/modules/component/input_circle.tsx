import React from 'react';
import { View, TextInput, Text, Image } from 'react-native';
import { LibComponent, LibStyle, LibUtils, LibIcon, esp } from 'esoftplay';

export interface ComponentInput_circle_iconProps {
  icon?: string,
  label?: string,
  placeholder?: string,
  mask?: string,
  maskFrom?: 'start' | 'end',
  suffix?: string,
  onPress?: () => void,
  helper?: string
  allowFontScaling?: boolean,
  autoCapitalize?: "none" | "sentences" | "words" | "characters",
  autoCorrect?: boolean,
  autoFocus?: boolean,
  blurOnSubmit?: boolean,
  caretHidden?: boolean,
  contextMenuHidden?: boolean,
  defaultValue?: string,
  editable?: boolean,
  inactive?: boolean,
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad",
  maxLength?: number,
  multiline?: boolean,
  onSubmitEditing?: () => void,
  onChangeText?: (text: string) => void,
  placeholderTextColor?: string,
  returnKeyType?: "done" | "go" | "next" | "search" | "send",
  secureTextEntry?: boolean,
  selectTextOnFocus?: boolean,
  selectionColor?: string,
  style?: any,
  inputStyle?: any,
  value?: string,
  bgColor?: string,
  text?: string,
  iconRight?: boolean,
  iconRightName?: string,
  iconLeft?: boolean,
  iconLeftName?: string,
  iconShowPass?: boolean,
}

export interface LibInputState {
  hasFocus: boolean,
  error?: string,
  helper?: string
}
export default class m extends LibComponent<ComponentInput_circle_iconProps, LibInputState>{
  text: string
  ref: any
  constructor(props: ComponentInput_circle_iconProps) {
    super(props);
    this.state = { hasFocus: false }
    this.text = ''
    this.ref = React.createRef()
    this.getText = this.getText.bind(this);
    this.mask = this.mask.bind(this);
    this.unmask = this.unmask.bind(this);
    this.setError = this.setError.bind(this);
    this.clearError = this.clearError.bind(this);
    this.setHelper = this.setHelper.bind(this);
    this.clearHelper = this.clearHelper.bind(this);
    this.getTextMasked = this.getTextMasked.bind(this);
  }

  getText(): string {
    return this.unmask(this.text)
  }

  getTextMasked(): string {
    return this.text
  }

  focus(): void {
    this.ref.focus()
  }

  blur(): void {
    this.ref.blur()
  }

  setHelper(msg: string): void {
    this.setState({ helper: msg })
  }

  clearHelper(): void {
    this.setState({ helper: undefined })
  }

  setError(msg: string): void {
    this.setState({ error: msg })
  }

  clearError(): void {
    this.setState({ error: undefined })
  }

  mask(text: string): string {
    let _text = text
    let { mask, maskFrom } = this.props
    if (mask) {
      if (!maskFrom) maskFrom = 'start'
      let rMask = mask.split("")
      let rText = this.unmask(_text).split("")
      if (maskFrom == 'end') {
        rMask = [...rMask.reverse()]
        rText = [...rText.reverse()]
      }
      let maskedText = ''
      var _addRange = 0
      var _addMaskChar = ''
      for (let i = 0; i < rMask.length; i++) {
        const iMask = rMask[i];
        if (iMask == '#') {
          if (rText[i - _addRange] != undefined) {
            maskedText += _addMaskChar + rText[i - _addRange]
          }
          else {
            break
          }
          _addMaskChar = ''
        }
        else {
          _addMaskChar += iMask
          _addRange++
        }
      }
      if (maskFrom == 'end') {
        maskedText = maskedText.split('').reverse().join('')
      }
      this.ref.setNativeProps({ text: maskedText })
      return maskedText
    }
    return _text
  }

  unmask(text: string): string {
    let _text = text
    let { mask } = this.props
    if (mask) {
      let masks = mask.match(/((?!\#).)/g)
      if (masks) {
        for (let i = 0; i < masks.length; i++) {
          _text = _text.replace(new RegExp(LibUtils.escapeRegExp(masks[i]), 'g'), '')
        }
      }
      return _text
    }
    return _text
  }

  setText(text: string): void {
    if (this.ref) {
      this.ref.setNativeProps({ text: this.mask(text) })
      this.text = this.mask(text)
    }
  }

  componentDidUpdate(prevProps: ComponentInput_circle_iconProps, prevState: LibInputState): void {
    if (this.ref) {
      this.ref.setNativeProps({ text: this.mask(this.text) })
    }
  }

  componentDidMount(): void {
    super.componentDidMount()
    setTimeout(() => {
      if (this.props.defaultValue) {
        this.setText(this.props.defaultValue)
      }
    }, 300);
  }

  render(): any {
    const { error } = this.state
    return (
      <View style={[{ height: 35, borderRadius: 5, marginTop: 10, backgroundColor: "#ffffff", borderStyle: "solid", borderWidth: 0.5, borderColor: '#9e9e9e', flexDirection: 'row', alignItems: 'center' }, this.props.style]} >
        {
          this.props.iconLeft &&
          <View style={{ width: 39, height: 35, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }}>
            <Image style={{ height: 20, width: 20, marginLeft: 6 }} source={esp.assets(this.props.iconLeftName ? this.props.iconLeftName : 'icons/ic_login_email.png')} />
          </View>
        }
        <TextInput
          ref={(r) => this.ref = r}
          placeholder={this.props.placeholder}
          placeholderTextColor='#e5e5e5'
          {...this.props}
          onChangeText={(e) => {
            this.text = this.mask(e)
            if (error != undefined)
              this.clearError()
            if (this.props.onChangeText) this.props.onChangeText(e)
          }}
          style={[{ flex: 1, fontFamily: "ArialBold", fontSize: 14, color: LibStyle.colorTextPrimary, marginRight: 15, marginLeft: 10 }, this.props.inputStyle]}
        />
        {
          this.props.iconRight &&
          <View style={{ width: 39, height: 35, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }}>
            <LibIcon name="chevron-right" color={LibStyle.colorPrimaryGreen} size={20} />
          </View>
        }
        {
          this.props.iconShowPass &&
          <View style={{ width: 39, height: 35, justifyContent: 'center', alignContent: 'center', alignItems: 'center', alignSelf: 'flex-start' }}>
            <LibIcon name="eye" color={LibStyle.colorPrimaryGreen} size={15} />
          </View>
        }
      </View>
    )
  }
}