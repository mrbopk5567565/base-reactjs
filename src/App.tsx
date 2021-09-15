import React from 'react';
import { History } from 'history';
import styled, { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';
import Routes from 'routers';
import theme from 'config/theme';

type AppProps = {
  history: History;
};

const AppContainer = styled.div`
  background-color: ${prop => prop.theme.bg};
  height: 100%;
`;

const App = ({ history }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
