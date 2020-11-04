import React from 'react';
import Svg, { Path } from 'react-native-svg';
import kanji from './kanji.json';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';
import { svgPathProperties } from "svg-path-properties";

const AnimatedPath = Animated.createAnimatedComponent(Path);

class Kanji extends React.Component {

  constructor() {
    super();
    this.state = {
      svgPaths: null,
      pathProperties: null,
      strokeLength: [],
      dashArray: [],
      dashOffset: [],
      animating: false,
      animationCallback: null
    };
  }

  componentDidMount() {
    const hex = this.getUnicodeHexadecimal();
    if (kanji[hex]) {
      const svgPaths = kanji[hex]['svgPaths'];
      const pathProperties = this.strokeProperties();
      const strokeLength = pathProperties.map(pathProperty => pathProperty.getTotalLength());
      const step = this.props.step === undefined ? kanji[hex]['numOfStroke'] : this.props.step;

      this.setState({
        svgPaths,
        strokeLength,
        step
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      if (
        prevProps.element !== this.props.element ||
        prevProps.step !== this.props.step
      ) {
        this.setState({ pathProperties: null }, () => {
          this.componentDidMount();
        });
      }
    }

    if (this.state.animating) {
      const { duration, previousStep, easing } = this.props;
      const { strokeLength, dashArray, dashOffset, step, animationCallback } = this.state;
      const animations = [];
      strokeLength.map((length, index) => {
        if (previousStep && index + 1 > step || !previousStep && index + 1 != step) {
          return;
        }

        // Assign Animation Value
        dashArray[index] = length + 1;
        dashOffset[index] = new Animated.Value(length + 2);
        animations.push(Animated.timing(dashOffset[index], {
          useNativeDriver: false,
          toValue: 0,
          duration,
          Easing: easing || Easing.ease
        }));
      });
      this.setState({ dashArray, dashOffset, animating: false });
      Animated.sequence(animations).start((result) => {
        if (animationCallback) {
          animationCallback(result);
        }
      });
    }
  }

  animate(callback) {
    this.setState({ animating: true, animationCallback: callback });
  }

  strokeProperties() {
    const { pathProperties } = this.state;
    if (pathProperties) {
      return pathProperties;
    }

    const hex = this.getUnicodeHexadecimal();
    if (kanji[hex]) {
      const svgPaths = kanji[hex]['svgPaths'];
      const newPathProperties = svgPaths.map(svgPath => new svgPathProperties(svgPath));
      this.setState({ pathProperties: newPathProperties });
      return newPathProperties;
    }
  }

  getUnicodeHexadecimal() {
    const { element } = this.props;
    if (element.length === 1) {
      return element.charCodeAt(0).toString(16).padStart(5, "0");
    }
    if (element.length === 2) {
      return ((((element.charCodeAt(0) - 0xD800) * 0x400) + (element.charCodeAt(1) - 0xDC00) + 0x10000)).toString(16).padStart(5, "0");
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
    if (previousStep && index + 1 > step || !previousStep && index + 1 != step) {
      return null;
    }

    return (
      <AnimatedPath
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
    let { size, placeholder, onPress, onLongPress, containerStyle } = this.props;
    const { svgPaths } = this.state;
    return (
      <Svg
        style={containerStyle}
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
  containerStyle: PropTypes.object,
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