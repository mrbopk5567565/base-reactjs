import React from 'react';
import { Trans } from 'react-i18next';
import styled from 'styled-components';

const Title = styled.h1`
  color: ${props => props.theme.color};
`;

const MainPage = () => {
  return (
    <Title>
      <Trans>welcome</Trans>
    </Title>
  );
};

export default MainPage;
