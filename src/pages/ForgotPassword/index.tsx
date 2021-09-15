import React, { lazy } from 'react';

const GridFullHeight = lazy(() => import('components/GridFullHeight'));
const CoverContainer = lazy(() => import('components/CoverContainer'));
const ForgotForm = lazy(() => import('containers/ForgotForm'));
const GridFormContainer = lazy(() => import('components/GridFormContainer'));

const ResetForm = React.memo(props => {
  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={6}>
        <GridFullHeight
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <ForgotForm />
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

export default ResetForm;
