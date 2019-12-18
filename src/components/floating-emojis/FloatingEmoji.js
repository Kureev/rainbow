import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import Animated, { Easing } from 'react-native-reanimated';
import { interpolate, timing } from '../animations';
import { Emoji } from '../text';

const { add, concat, multiply, sin } = Animated;

const FloatingEmoji = ({
  distance,
  duration,
  emoji,
  index,
  left,
  size,
  top,
  wiggleFactor,
}) => {
  const animation = useRef(
    timing({
      duration,
      easing: Easing.elastic(),
    })
  ).current;

  const progress = useRef(
    interpolate(animation, {
      inputRange: [0, 1],
      outputRange: [0, distance],
    })
  ).current;

  const opacity = useRef(
    interpolate(progress, {
      inputRange: [0, distance / 2, distance - size],
      outputRange: [1, 0.89, 0],
    })
  ).current;

  const rotate = useRef(
    concat(
      interpolate(progress, {
        inputRange: [0, distance / 4, distance / 3, distance / 2, distance],
        outputRange: [0, -2, 0, 2, 0],
      }),
      'deg'
    )
  ).current;

  const scale = useRef(
    interpolate(progress, {
      inputRange: [0, 15, 30, 50, distance],
      outputRange: [0, 1.2, 1.1, 1, 1],
    })
  ).current;

  const translateX = useRef(
    add(
      multiply(
        animation,
        size,
        index % 3 === 0 ? 3 : 2,
        index % 2 === 0 ? -1 : 1
      ),
      multiply(
        sin(multiply(progress, distance / (350 / 15))),
        interpolate(progress, {
          inputRange: [0, distance / 10, distance],
          outputRange: [
            10 * wiggleFactor,
            6.9 * wiggleFactor,
            4.2069 * wiggleFactor,
          ],
        })
      )
    )
  ).current;

  const translateY = useRef(multiply(animation, distance, -1)).current;

  return (
    <Animated.View
      style={{
        left,
        opacity,
        position: 'absolute',
        top: top || size * -0.5,
        transform: [{ rotate }, { scale }, { translateX }, { translateY }],
      }}
    >
      <Emoji name={emoji} size={size} />
    </Animated.View>
  );
};

FloatingEmoji.propTypes = {
  distance: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  emoji: PropTypes.string.isRequired,
  left: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  top: PropTypes.number,
  wiggleFactor: PropTypes.number,
};

const neverRerender = () => true;
export default React.memo(FloatingEmoji, neverRerender);
