import styled from 'styled-components';
import { View, Text } from 'react-native';
import { Theme } from '../../../theme';

export const Container = styled(View)`
    flex: 1;

    padding: 0 ${Theme.metrics.screenHeight * 0.02}px 0
    ${Theme.metrics.screenHeight * 0.02}px;

    background-color: #EDEDED;
`;

export const AppLogo = styled(View)`
    align-items: center;
    justify-content: center;

    margin-top: 60px;
`;

export const LoginTextWrapper = styled(View)`
    align-items: center;
    justify-content: center;

    margin-top: 20px;
`;

export const LoginText = styled(Text)`
    font-weight: ${Theme.fontWeight.bold};
    font-size: ${Theme.fontSize.font30}px;
    color: ${Theme.colors.black};
`;

export const LoginWelcomeText = styled(Text)`
    font-weight: ${Theme.fontWeight.medium};
    font-size: ${Theme.fontSize.font18}px;
    color: ${Theme.colors.textPrimary};
    line-height: 23px;

    margin-top: 30px;
`;

export const LoginTextDescription = styled(Text)`
    font-weight: ${Theme.fontWeight.light};
    font-size: ${Theme.fontSize.font16}px;
    color: ${Theme.colors.textPrimary};
    line-height: 23px;

    margin-top: 10px;
`;

export const InputContainer = styled(View)`
    width: 90%;
    margin-top: 100px;
`;

export const ButtonContainer = styled(View)`
    margin-top: 60%;
`;
