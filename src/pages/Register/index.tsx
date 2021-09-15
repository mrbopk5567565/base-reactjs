import React, { lazy, useState } from 'react';

const GridFullHeight = lazy(() => import('components/GridFullHeight'));
const CoverContainer = lazy(() => import('components/CoverContainer'));
const RegisterForm = lazy(() => import('containers/RegisterForm'));
const GridFormContainer = lazy(() => import('components/GridFormContainer'));

const Register = React.memo(props => {
  const [isAgreedPolicy, setIsAgreedPolicy] = useState(false);
  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={6}>
        <GridFullHeight
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <RegisterForm
            isAgreedPolicy={isAgreedPolicy}
            setIsAgreedPolicy={setIsAgreedPolicy}
          />
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

export default Register;
