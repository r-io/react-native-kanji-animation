## react-native-kanji-animation

### Installation

`react-native-kanji-animation` depends on [`react-native-svg`](https://github.com/react-native-community/react-native-svg) for animation. If you have not installed [`react-native-svg`](https://github.com/react-native-community/react-native-svg), follow [these instructions](https://github.com/react-native-community/react-native-svg) to install.


### Usage  

```javascript
render() {
  return (
    <Kanji
      ref={el => kanjiExample = el}
      element="儀"
      size={90}
      pathProps = {{strokeWidth: 3, stroke: '#fff'}}
      placeholderProps = {{stroke: '#000'}}
      placeholder={true}
      duration={100}
      step={10}
      onPress={() => kanjiExample.animate()}
    />
  );
}
