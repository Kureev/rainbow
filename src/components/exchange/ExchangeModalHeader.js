import React from 'react';
import styled from 'styled-components/primitives';
import { colors, padding, position } from '../../styles';
import { TouchableScale } from '../animations';
import { Icon } from '../icons';
import { Centered, ColumnWithMargins } from '../layout';
import { SheetHandle } from '../sheet';
import { Text } from '../text';

const InfoButtonPaddingHorizontal = 19;

const InfoButton = styled(Centered).attrs({
  activeScale: 0.8,
  component: TouchableScale,
  hapticType: 'impactLight',
  pressInFriction: 50,
  pressInTension: 400,
  pressOutFriction: 30,
  pressOutTension: 300,
})`
  bottom: 0;
  padding-left: ${InfoButtonPaddingHorizontal * 2};
  padding-right: ${InfoButtonPaddingHorizontal};
  padding-top: 3;
  position: absolute;
  right: 0;
  top: 0;
`;

const ExchangeModalHeader = ({ onPressDetails }) => (
  <ColumnWithMargins align="center" css={padding(8, 0)} margin={6}>
    <SheetHandle />
    <Text
      align="center"
      letterSpacing="tighter"
      lineHeight="loose"
      size="large"
      weight="bold"
    >
      Swap
    </Text>
    <InfoButton onPress={onPressDetails} useNativeDriver>
      <Icon
        {...position.sizeAsObject(18)}
        color={colors.alpha(colors.blueGreyDark, 0.3)}
        name="info"
      />
    </InfoButton>
  </ColumnWithMargins>
);

export default React.memo(ExchangeModalHeader);
