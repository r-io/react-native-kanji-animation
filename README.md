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
