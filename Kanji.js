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
    const { step } = this.props;
    const hex = this.getUnicodeHexadecimal();
    if (kanji[hex]) {
      this.setState({
        svgPaths: kanji[hex]['svgPaths'],
        step: step === undefined ? kanji[hex]['numOfStroke'] : step
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (
        prevProps.element !== this.props.element ||
        prevProps.step !== this.props.step
      ) {
        this.componentDidMount();
      }
    }
    
    if (this.paths.length > 0 && this.state.animating) {
      const { duration, previousStep } = this.props;
      const { dashArray, dashOffset, step } = this.state;
      const animations = [];
      this.paths.map((path, index) => {
        if (
          !path || 
          previousStep && index + 1 > step || 
          !previousStep && index + 1 != step
        ) {
          return;
        }

        // Get Stroke Length Until Found
        let strokeLength = path._component.getTotalLength();
        while (strokeLength === 0) {
          strokeLength = path._component.getTotalLength();
        }
        strokeLength = strokeLength + 1;

        // Assign Animation Value
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

  numOfStrokes() {
    const hex = this.getUnicodeHexadecimal();
    if (kanji[hex]) {
      return kanji[hex]['numOfStroke'];
    }
    return 0;
  }

  getUnicodeHexadecimal(){
    const { element } = this.props;
    if (element.length === 1) {
      return element.charCodeAt(0).toString(16).padStart(5, "0");
    } 
    if (element.length === 2) {
      return ((((element.charCodeAt(0)-0xD800)*0x400) + (element.charCodeAt(1)-0xDC00) + 0x10000)).toString(16).padStart(5, "0");
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
    const opacity = (
      previousStep && index + 1 > step || 
      !previousStep && index + 1 != step
    ) ? 0 : 1;
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
        strokeOpacity={opacity}
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