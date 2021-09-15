import React, { lazy } from 'react';

const SignInForm = lazy(() => import('containers/SignInForm'));
const GridFullHeight = lazy(() => import('components/GridFullHeight'));
const GridFormContainer = lazy(() => import('components/GridFormContainer'));
const CoverContainer = lazy(() => import('components/CoverContainer'));

const SignIn = React.memo(props => {
  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={6}>
        <GridFullHeight
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <SignInForm />
        </GridFullHeight>
      </GridFormContainer>

      <CoverContainer item xs={12} sm={12} md={6}>
        {
          //cover img
        }
      </CoverContainer>
    </GridFullHeight>
  );
});

export default SignIn;
