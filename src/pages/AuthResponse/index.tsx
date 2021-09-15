import React, { lazy } from 'react';

const GridFullHeight = lazy(() => import('components/GridFullHeight'));
const AuthResponse = lazy(() => import('containers/AuthResponse'));
const GridFormContainer = lazy(() => import('components/GridFormContainer'));
const AuthResponsePage = React.memo(props => {
  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={12}>
        <GridFullHeight
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <AuthResponse />
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default AuthResponsePage;
