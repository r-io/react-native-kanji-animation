## react-native-kanji-animation

### Installation

`react-native-kanji-animation` depends on [`react-native-svg`](https://github.com/react-native-community/react-native-svg) for animation. If you have not installed [`react-native-svg`](https://github.com/react-native-community/react-native-svg), follow [these instructions](https://github.com/react-native-community/react-native-svg) to install.

Install the library using npm or yarn:

```bash
# using npm
$ npm install react-native-kanji-animation --save

# using yarn
$ yarn add react-native-kanji-animation
```

### Usage  

```javascript
import { Kanji } from 'react-native-kanji-animation';

render() {
  return (
    <Kanji
      ref={el => kanjiExample = el}
      element="儀"
      size={90}
      placeholder={true}
      duration={300}
      step={10}
      onPress={() => kanjiExample.animate()}
    />
  );
}
```

![react-native-kanji-animation](https://media.giphy.com/media/VLdEhUlrqhz46rRQBN/giphy.gif)

### Reference

#### Props
| Name                           | Type             | Default                        | Description                                                                                                                                |
| ------------------------------ | ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| duration                       | number           | 250            | Timing for the kanji animation every stroke (in ms) |                                                            
| element                        | string           | **REQUIRED**   | Kanji character to be drawn                         |                                                                       
| onLongPress                    | func             | null           | Called when the character is long pressed           |                                                                                                            
| onPress                        | func             | null           | Called when the character is pressed                |                                                                                
| pathProps                      | object           | null           | Properties for Kanji stroke based on Path Component of [`react-native-svg`](https://github.com/react-native-community/react-native-svg). Click [here](https://github.com/react-native-community/react-native-svg#path) for more information. Recommended to use only stroke, strokeWidth, and strokeLinecap. |
| placeholder                    | bool             | false          | Kanji character to be drawn unaffected by the animation |
| placeholderProps               | object           | null           | Properties for Placeholder Kanji stroke based on Path Component of [`react-native-svg`](https://github.com/react-native-community/react-native-svg). Click [here](https://github.com/react-native-community/react-native-svg#path) for more information. Recommended to use only stroke, strokeWidth, and strokeLinecap. |                                                                                                                       
| previousStep                   | bool             | true           | Show the previous stroke of the selected step. Will show the first until n-th stroke if it's `true` or only the n-th stroke if it's `false` |
| size                           | number           | 109            | The size (width and height) of the kanji character  |
| step                           | number           | null           | Indicating the current stroke. Show the first until n-th stroke (previousStep is `true`) or only the n-th stroke (previousStep is `false`). By default it will point to the last stroke. |                                                                                      

#### Methods

##### animate()
Starts the kanji stroke animation.

Example:
```javascript
this.kanji.animate();
```

##### numOfStrokes()
Return `number`. Obtain the total nuber of stroke of the current kanji element.

Example:
```javascript
console.log(this.kanji.numOfStrokes());
```

### NOTICE:
`react-native-kanji-animation` is currently implemented and tested on Android only. Will be adding support for iOS soon.
