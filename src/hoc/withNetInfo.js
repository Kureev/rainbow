import NetInfo from '@react-native-community/netinfo';
import { compose, lifecycle, withState } from 'recompact';

const withNetInfo = ComponentToWrap =>
  compose(
    withState('isConnected', 'setIsConnected', true),
    lifecycle({
      componentDidMount() {
        NetInfo.isInternetReachable.addEventListener(
          'connectionChange',
          this.props.setIsConnected
        );
      },
      componentWillUnmount() {
        NetInfo.isInternetReachable.removeEventListener(
          'connectionChange',
          this.props.setIsConnected
        );
      },
    })
  )(ComponentToWrap);

export default withNetInfo;
