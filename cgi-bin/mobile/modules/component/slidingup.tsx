import React from 'react';
import { LibComponent, LibStyle } from 'esoftplay';
import { View, KeyboardAvoidingView, Animated, TouchableOpacity } from 'react-native';

export interface ComponentSlidingupProps {

}
export interface ComponentSlidingupState {
  show: boolean,
}
export default class m extends LibComponent<ComponentSlidingupProps, ComponentSlidingupState>{

  _show: boolean = false
  animValue: any = new Animated.Value(LibStyle.height)
  constructor(props: ComponentSlidingupProps) {
    super(props);
    this.state = {
      show: false,
    }
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
  }

  show(): void {
    if (this.props.children) {
      // this.animValue = new Animated.Value(0)
      this.setState({ show: true }, () => {
        this._toggleSubview(true)
      })
    }
  }

  hide(): void {
    // this.animValue = new Animated.Value(LibStyle.height)
    this._toggleSubview(false).then(() => {
      this.setState({ show: false })
    })
  }

  _toggleSubview(isOpen: boolean): Promise<void> {
    return new Promise((r) => {
      var toValue = LibStyle.height;
      if (isOpen) {
        toValue = 0;
      }
      //This will animate the transalteY of the subview between 0 & 100 depending on its current state
      //100 comes from the style below, which is the height of the subview.
      Animated.timing(
        this.animValue,
        {
          toValue: toValue,
          duration: 200,
          // velocity: 3,
          // tension: 2,
          // friction: 8,
        }
      ).start(() => {
        r()
      })
    })
  }

  render(): any {
    const { show } = this.state
    if (!show) return null
    return (
      <KeyboardAvoidingView style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} behavior="padding" >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end', zIndex: 999999 }}>
          <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => this.hide()} />
          <Animated.View style={{ transform: [{ translateY: this.animValue }] }} >
            {this.props.children}
            <View style={{ paddingBottom: LibStyle.isIphoneX ? 30 : 0, backgroundColor: 'white' }} />
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    )
  }
}