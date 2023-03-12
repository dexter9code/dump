import {createStackNavigator} from '@react-navigation/stack';
import ForgotScreen from '../screens/ForgotScreen';
import LoginScreen from '../screens/LoginScreen';

export type AuthStackParamsList = {
  login: undefined;
  forgot: undefined;
};

const Stack = createStackNavigator<AuthStackParamsList>();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="forgot" component={ForgotScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
