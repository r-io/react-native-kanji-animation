import React from 'react';
import Svg, { Path } from 'react-native-svg';
import kanji from './kanji.json';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';

const AnimatedPath = Animated.createAnimatedComponent(Path);

class Kanji extends React.Component {

  paths = [];

  constructor() {
    super();
    this.state = {
      svgPaths: null,
      dashArray: [],
      dashOffset: [],
      animating: false
    };
  }

  componentDidMount() {
    const { element, step } = this.props;
    const hex = this.getUnicodeHexadecimal(element);
    if (kanji[hex]) {
      this.setState({
        svgPaths: kanji[hex]['svgPaths'],
        step: step === undefined ? kanji[hex]['numOfStroke'] : step
      })
    }
  }

  componentDidUpdate() {
    if (this.paths.length > 0 && this.state.animating) {
      const { duration } = this.props;
      const { dashArray, dashOffset } = this.state;
      const animations = [];
      this.paths.map((path, index) => {
        const strokeLength = path._component.getTotalLength() + 1;
        dashArray[index] = strokeLength;
        dashOffset[index] = new Animated.Value(strokeLength);
        animations.push(Animated.timing(dashOffset[index], {
          toValue: 0,
          duration,
          Easing: Easing.out
        }));
      });
      this.setState({ dashArray, dashOffset, animating: false });
      Animated.sequence(animations).start();
    }
  }

  animate() {
    this.setState({ animating: true })
  }

  getUnicodeHexadecimal(character){
    if (character.length === 1) {
      return character.charCodeAt(0).toString(16).padStart(5, "0");
    } 
    if (character.length === 2) {
      return ((((character.charCodeAt(0)-0xD800)*0x400) + (character.charCodeAt(1)-0xDC00) + 0x10000)).toString(16).padStart(5, "0");
    }
    return 0;
  };

  renderPlaceholder(index, path) {
    const { pathProps, placeholderProps } = this.props;

    return (
      <AnimatedPath
        key={index}
        strokeWidth={3}
        strokeLinecap={"round"}
        fillOpacity={0}
        {...pathProps}
        stroke="#DDD"
        {...placeholderProps}
        d={path}
      />
    );
  }

  renderPath(index, path) {
    const { pathProps, previousStep } = this.props;
    const { dashArray, dashOffset, step } = this.state;
    if (
      previousStep && index + 1 > step || 
      !previousStep && index + 1 != step
    ) {
      return;
    }
    return (
      <AnimatedPath
        ref={e => this.paths[index] = e}
        key={index}
        strokeWidth={3}
        stroke="#000"
        strokeLinecap="round"
        fillOpacity={0}
        {...pathProps}
        d={path}
        strokeDasharray={dashArray[index]}
        strokeDashoffset={dashOffset[index]}
      />
    );
  }  

  render() {
    let { size, placeholder, onPress, onLongPress } = this.props;
    const { svgPaths } = this.state;
    return (
      <Svg 
        height={size} 
        width={size}
        viewBox="0 0 109 109"
        onPress={onPress}
        onLongPress={onLongPress}
      > 
        {svgPaths && placeholder && svgPaths.map((path, index) => this.renderPlaceholder(index, path))}
        {svgPaths && svgPaths.map((path, index) => this.renderPath(index, path))}
      </Svg>
    );
  }

}

Kanji.propTypes = {
  element: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func,
  pathProps: PropTypes.object,
  placeholder: PropTypes.bool,
  placeholderProps: PropTypes.object,
  previousStep: PropTypes.bool,
  size: PropTypes.number,
  step: PropTypes.number,
};

Kanji.defaultProps = {
  size: 109,
  duration: 250,
  previousStep: true
};  

export default Kanji;