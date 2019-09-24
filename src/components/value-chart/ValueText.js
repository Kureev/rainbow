import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/primitives';
import { View } from 'react-native';
import { colors, fonts } from '../../styles';
import { TruncatedText } from '../text';
import TrendIndicatorText from './TrendIndicatorText';
import { deviceUtils } from '../../utils';

const HeadingTextStyles = {
  color: colors.dark,
  family: 'SFProText',
  weight: 'bold',
};

const Title = styled(TruncatedText).attrs(HeadingTextStyles)`
  font-size: 30px;
  margin-bottom: 6.5px;
`;

const Header = styled(TruncatedText)`
  font-size: ${fonts.size.smedium};
  color: ${colors.blueGreyLight};
  font-weight: ${fonts.weight.semibold};
  letter-spacing: 1.3;
`;

const LoadingText = styled(TruncatedText)`
  font-size: ${fonts.size.smedium};
  color: ${colors.blueGreyLight};
  font-weight: ${fonts.weight.semibold};
  letter-spacing: 1.3;
  text-align: center;
  padding: 10px;
`;

class ValueText extends React.Component {
  static propTypes = {
    change: PropTypes.string,
    direction: PropTypes.bool,
    headerText: PropTypes.string,
    isOpen: PropTypes.bool,
    startValue: PropTypes.string,
    text: PropTypes.string,
  };

  state = {
    text: this.props.startValue,
  }

  updateValue = (text) => {
    this.setState({ text });
  }

  render() {
    return (
      <View style={{
        height: this.props.isOpen ? 85 : 110,
        paddingLeft: 15,
        width: deviceUtils.dimensions.width,
      }}>
        <Header>
          {this.props.headerText}
        </Header>
        <Title>
          ${Number(this.state.text).toFixed(2)}
        </Title>
        <TrendIndicatorText direction={this.props.direction}>
          {this.props.change}
        </TrendIndicatorText>
        {
          !this.props.isOpen
          && <LoadingText>
            Loading chart...
          </LoadingText>
        }
      </View>
    );
  }
}

export default ValueText;
