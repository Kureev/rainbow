import PropTypes from 'prop-types';
import React from 'react';
import Animated from 'react-native-reanimated';
import stylePropType from 'react-style-proptype';
import { position } from '../../styles';
import { interpolate } from './procs';

const ScaleInAnimation = ({ range, scaleTo, style, value, ...props }) => (
  <Animated.View
    {...props}
    style={[
      style,
      {
        ...position.centeredAsObject,
        ...position.coverAsObject,
        opacity: interpolate(value, {
          extrapolate: Animated.Extrapolate.CLAMP,
          inputRange: [range.from, range.to * 0.1, range.to * 0.25],
          outputRange: [1, 0.333, 0],
        }),
        transform: [
          {
            scale: interpolate(value, {
              extrapolate: Animated.Extrapolate.IDENTITY,
              inputRange: [range.from, range.to * 0.333],
              outputRange: [1, scaleTo],
            }),
          },
        ],
      },
    ]}
  />
);

ScaleInAnimation.propTypes = {
  range: PropTypes.shape({
    from: PropTypes.number,
    to: PropTypes.number,
  }),
  scaleTo: PropTypes.number,
  style: stylePropType,
  value: PropTypes.object,
};

ScaleInAnimation.defaultProps = {
  range: {
    from: 0,
    to: 100,
  },
  scaleTo: 0.42,
};

export default React.memo(ScaleInAnimation);
