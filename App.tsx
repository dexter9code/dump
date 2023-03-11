/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {StripeProvider} from '@stripe/stripe-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Payment from './app/Payment';
import SplashScreen from './app/SplashScreen';

const PUBLIC_KEY = `pk_test_51LIBpPSB6X3CnjxjTn4JPY977iVwPEIscDkDngbsnbG1yJCpEBm5qmZpVjKYxkzCKUIhtJeMsDGEicMjWnuLzvqE00XNkEmfAM`;

function App(): JSX.Element {
  return (
    // <SafeAreaProvider>
    //   <SplashScreen />
    // </SafeAreaProvider>
    <StripeProvider
      publishableKey={PUBLIC_KEY}
      merchantIdentifier={`tstuser.com`}>
      <Payment />
    </StripeProvider>
  );
}

export default App;
