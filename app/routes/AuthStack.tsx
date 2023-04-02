import {createStackNavigator} from '@react-navigation/stack';
import ImagePickScreen from '../screens/ImagePickScreen';
import LoginScreen from '../screens/LoginScreen';
import MultiScreen from '../screens/MultiScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QuestionnaireScreen from '../screens/Questionare';
import SearchScreen from '../screens/SearchScreen';
import SwipeScreen from '../screens/SwipeScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="image">
      <Stack.Screen name="image" component={ImagePickScreen} />
      <Stack.Screen name="match" component={ProfileScreen} />
      <Stack.Screen name="question" component={QuestionnaireScreen} />
      <Stack.Screen name="multi" component={MultiScreen} />
      <Stack.Screen name="search" component={SearchScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="swipe" component={SwipeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
