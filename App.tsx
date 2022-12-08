import React, {useEffect} from 'react';
import { NavigationContainer, DefaultTheme  } from '@react-navigation/native';
import MainStack from './src/routes/MainStack';
import {ApostaProvider} from './src/hooks/useAposta'



function App() {
    

  const theme = {
    ...DefaultTheme,
    dark: true,
    
  }


  return (
    <NavigationContainer theme={theme}>
      
      <ApostaProvider>
  
            <MainStack />
  
      </ApostaProvider>
    </NavigationContainer>
  );
}

export default App;