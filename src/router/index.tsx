import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackScreens } from './stackScreen';

const ScreensIndex = () => {
  return (
    <NavigationContainer>
      <StackScreens />
    </NavigationContainer>
  );
};

export default ScreensIndex;
