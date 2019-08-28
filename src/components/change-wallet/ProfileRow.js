import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components/primitives';
import {
  View,
  Animated,
  Text,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import GraphemeSplitter from 'grapheme-splitter';
import { abbreviations } from '../../utils';
import { TruncatedAddress } from '../text';
import { fonts, colors } from '../../styles';
import { ButtonPressAnimation } from '../animations';
import { Icon } from '../icons';
import { removeFirstEmojiFromString } from '../../helpers/emojiHandler';

const Container = styled.View`
  align-items: center;
  flex-direction: row;
  padding-left: 7.5px;
  padding-right: 15px;
  justify-content: space-between;
`;

const Nickname = styled.Text`
  font-family: ${fonts.family.SFProText};
  font-weight: ${fonts.weight.medium};
  font-size: ${fonts.size.smedium};
  color: ${colors.dark};
`;

const AddressAbbreviation = styled(TruncatedAddress).attrs({
  firstSectionLength: abbreviations.defaultNumCharsPerSection,
  size: 'smaller',
  truncationLength: 4,
  weight: 'medium',
})`
  font-family: ${fonts.family.SFProText};
  width: 100%;
  opacity: 0.5;
  text-transform: lowercase;
`;

const IconWrapper = styled.View`
  height: 30px
  width: 30px;
  border-radius: 14px;
  background-color: ${colors.skeleton};
  justify-content: center;
  align-items: center;
  margin-right: 19px;
`;

const AvatarCircle = styled(View)`
  border-radius: 20px;
  margin-left: 8;
  margin-right: 9px;
`;

const FirstLetter = styled(Text)`
  width: 100%;
  text-align: center;
  color: #fff;
  font-weight: 600;
`;

const LeftSide = styled(View)`
  flex-direction: row;
`;

const MoneyAmountWrapper = styled(View)`
  background-color: ${colors.lightGreen};
  border-radius: 16;
  height: 24px;
  padding: 4px 6.5px;
`;

const MoneyAmount = styled(Text)`
  line-height: 16px;
  color: ${colors.moneyGreen};
  font-weight: ${fonts.weight.semibold};
`;

export default class ProfileRow extends Component {
  componentWillReceiveProps = () => {
    this.close();
  }

  onPress = () => {
    this.close();
    this.props.onEditWallet();
  }

  onLongPress = () => {
    this._swipeableRow.openRight();
  }

  renderRightAction = (x, progress, onPress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });
    return (
      <Animated.View style={{ flex: 1, justifyContent: 'center', transform: [{ translateX: trans }] }}>
        <ButtonPressAnimation onPress={onPress} scaleTo={0.9}>
          <IconWrapper>
            <Icon
              color={colors.blueGreyMedium}
              height={15}
              width={15}
              name={'gear'}
            />
          </IconWrapper>
        </ButtonPressAnimation>
      </Animated.View>
    );
  };

  renderRightActions = progress => (
    <View style={{ flexDirection: 'row', width: 50 }}>
      {this.renderRightAction(50, progress, this.onPress)}
    </View>
  );

  updateRef = ref => {
    this._swipeableRow = ref;
  };

  close = () => {
    this._swipeableRow.close();
  };

  render() {
    const {
      accountAddress,
      accountName,
      isHeader,
      onPress,
    } = this.props;
    const avatarSize = isHeader ? 32 : 30;
    const name = accountName ? removeFirstEmojiFromString(accountName) : '';
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        rightThreshold={20}
        renderRightActions={this.renderRightActions}
      >
        <ButtonPressAnimation scaleTo={0.96} onPress={onPress} onLongPress={this.onLongPress}>
          <Container style={{ padding: isHeader ? 15 : 10 }}>
            <LeftSide>
              <AvatarCircle style={{ backgroundColor: colors.purple, height: avatarSize, width: avatarSize }} >
                <FirstLetter style={{ fontSize: isHeader ? 18 : 15, lineHeight: isHeader ? 31 : 29 }}>
                  {new GraphemeSplitter().splitGraphemes(accountName)[0]}
                </FirstLetter>
              </AvatarCircle>
              <View>
                <Nickname>
                  {name}
                </Nickname>
                <AddressAbbreviation address={accountAddress} />
              </View>
            </LeftSide>
            <MoneyAmountWrapper>
              <MoneyAmount>
                $829.24
              </MoneyAmount>
            </MoneyAmountWrapper>
          </Container>
        </ButtonPressAnimation>
      </Swipeable>
    );
  }
}

ProfileRow.propTypes = {
  accountAddress: PropTypes.string.isRequired,
  accountName: PropTypes.string.isRequired,
  isHeader: PropTypes.bool,
  onEditWallet: PropTypes.func,
  onPress: PropTypes.func,
  onSwipeOpen: PropTypes.func,
};

ProfileRow.defaultProps = {
  isHeader: false,
};
