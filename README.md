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
      element="書"
      size={90}
      placeholder={true}
      duration={700}
      step={6}
      onPress={() => kanjiExample.animate()}
    />
  );
}
```
<img src="https://media.giphy.com/media/YWImRbDnPPxfc7uqo1/giphy.gif" width="180" height="180" alt="react-native-kanji-animation" />

### Another Example

```javascript
<Kanji
  ref={e => kanjiExample = e}
  element={'字'}
  size={200}
  pathProps={{
    strokeLinecap: 'square',
    strokeWidth: 5,
    stroke: 'red'
  }}
  placeholder={true}
  placeholderProps={{
    strokeLinecap: 'round',
    strokeWidth: 8,
    stroke: 'green'
  }}
  guideProps={{
    strokeWidth: 15,
    stroke: 'blue',
    strokeOpacity: 0.7
  }}
  duration={1000}
  step={0}
  onPress={() => {
    kanjiExample.animate({
      previousStep: false,
      step: 4
    });
  }}
/>
```
<img src="https://media.giphy.com/media/7pchLkBbt8IxtuP4r6/giphy.gif" width="180" height="180" alt="react-native-kanji-animation" />

### Reference

#### Props
| Name                           | Type             | Default        | Description |
| ------------------------------ | ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| containerStyle                 | object           | null           | Style props for canvas |
| easing                         | func             | null           | Easing function for the animation |
| duration                       | number           | 250            | Timing for the kanji animation every stroke (in ms) |                                                            
| element                        | string           | **REQUIRED**   | Kanji character to be drawn                         |
| guideProps                      | object           | null           | Properties for Animation Guide based on Path Component of [`react-native-svg`](https://github.com/react-native-community/react-native-svg). Click [here](https://github.com/react-native-community/react-native-svg#path) for more information. Recommended to use only stroke, strokeWidth, and strokeLinecap. |
| onLongPress                    | func             | null           | Called when the character is long pressed           |                                                                                                            
| onPress                        | func             | null           | Called when the character is pressed                |                                                                                
| pathProps                      | object           | null           | Properties for Kanji stroke based on Path Component of [`react-native-svg`](https://github.com/react-native-community/react-native-svg). Click [here](https://github.com/react-native-community/react-native-svg#path) for more information. Recommended to use only stroke, strokeWidth, and strokeLinecap. |
| placeholder                    | bool             | false          | Kanji character to be drawn unaffected by the animation |
| placeholderProps               | object           | null           | Properties for Placeholder Kanji stroke based on Path Component of [`react-native-svg`](https://github.com/react-native-community/react-native-svg). Click [here](https://github.com/react-native-community/react-native-svg#path) for more information. Recommended to use only stroke, strokeWidth, and strokeLinecap. |                                                                                                                       
| previousStep                   | bool             | true           | Show the previous stroke of the selected step. Will show the first until n-th stroke if it's `true` or only the n-th stroke if it's `false` |
| size                           | number           | 109            | The size (width and height) of the kanji character  |
| step                           | number           | null           | Indicating the current stroke. Show the first until n-th stroke (previousStep is `true`) or only the n-th stroke (previousStep is `false`). By default it will point to the last stroke. |                                                                                      

#### Methods

##### animate(options?, animationEndCallback?)
Starts the kanji stroke animation with an options and callback after the animation ends.

Options:
| Name                           | Type             | Description |
| ------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| hideGuide                      | bool             | Set to true to hide the Guide when the animation occurs |
| previousStep                   | bool             | Will show the animation of first until n-th stroke if it's `true` or only the n-th stroke if it's `false`. By default will be the same as props. |
| step                           | number           | Indicating the current stroke. Show the first until n-th stroke (previousStep is `true`) or only the n-th stroke (previousStep is `false`). By default will be the same as props. |      

Example:
```javascript
this.kanji.animate({
  step: 5,
  previousStep: true,
  hideGuide: true
}, () => console.log("animation finished"));
```

##### numOfStrokes()
Return `number`. Obtain the total number of stroke of the current kanji element.

Example:
```javascript
console.log(this.kanji.numOfStrokes());
```

##### strokeProperties()
Return `Array of SVGPathProperties`. Obtain the [SVG Path Properties](https://www.npmjs.com/package/svg-path-properties) for each stroke with the following methods:

-  getTotalLength: () => number;
-  getPointAtLength: (fractionLength: number) => Point;
-  getTangentAtLength: (fractionLength: number) => Point;
-  getPropertiesAtLength: (fractionLength: number) => PointProperties;
-  getParts: () => PartProperties[];

Example:
```javascript
console.log(this.kanji.strokeProperties()[0].getTotalLength());
```
