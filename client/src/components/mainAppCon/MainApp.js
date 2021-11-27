import React, { Fragment, useState } from 'react'
import LandingPage from '../landingPage/LandingPage'
import OptionsCon from '../optionsCon/OptionsCon'

const MainApp = ({ auth }) => {
  const [startApp, setStartApp] = useState(false);
  const startAppHan = () => {
    setStartApp(true);
  };

  return (
    <Fragment>
      {startApp ? (
        <OptionsCon auth={auth} />
      ) : (
        <LandingPage startAppHan={startAppHan} />
      )}
    </Fragment>
  );
};

export default MainApp;
