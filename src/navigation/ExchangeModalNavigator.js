import { get } from 'lodash';
import React from 'react';
import Animated from 'react-native-reanimated';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import CurrencySelectModal from '../screens/CurrencySelectModal';
import ExchangeModal from '../screens/ExchangeModal';
import { deviceUtils } from '../utils';

const ExchangeModalTabPosition = new Animated.Value(0);

const ExchangeModalNavigator = createMaterialTopTabNavigator(
  {
    MainExchangeScreen: {
      params: {
        position: ExchangeModalTabPosition,
      },
      screen: ExchangeModal,
    },
    // eslint-disable-next-line sort-keys
    CurrencySelectScreen: {
      params: {
        position: ExchangeModalTabPosition,
      },
      screen: CurrencySelectModal,
    },
  },
  {
    headerMode: 'none',
    initialLayout: deviceUtils.dimensions,
    mode: 'modal',
    position: ExchangeModalTabPosition,
    springConfig: {
      damping: 40,
      mass: 1,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
      stiffness: 300,
    },
    swipeDistanceMinimum: 0,
    swipeVelocityImpact: 1,
    swipeVelocityScale: 1,
    tabBarComponent: null,
    transparentCard: true,
  }
);

// I need it for changing navigationOptions dynamically
// for preventing swipe down to close on CurrencySelectScreen
// TODO
// eslint-disable-next-line react/display-name
const EnhancedExchangeModalNavigator = React.memo(props => (
  <ExchangeModalNavigator {...props} />
));
EnhancedExchangeModalNavigator.router = ExchangeModalNavigator.router;
EnhancedExchangeModalNavigator.navigationOptions = ({ navigation }) => ({
  ...navigation.state.params,
  gestureEnabled: !get(navigation, 'state.params.isGestureBlocked'),
});

export default EnhancedExchangeModalNavigator;
