import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';

const RootStack = () => {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
};

export default RootStack;
