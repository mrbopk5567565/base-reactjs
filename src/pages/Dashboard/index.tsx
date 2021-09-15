import React, { lazy } from 'react';

const GridFullHeight = lazy(() => import('components/GridFullHeight'));
const UserInfo = lazy(() => import('containers/UserInfo'));
const GridFormContainer = lazy(() => import('components/GridFormContainer'));
const Dashboard = React.memo(props => {
  return (
    <GridFullHeight container>
      <GridFormContainer item xs={12} sm={12} md={6}>
        <GridFullHeight
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
          <UserInfo />
        </GridFullHeight>
      </GridFormContainer>
    </GridFullHeight>
  );
});

export default Dashboard;
