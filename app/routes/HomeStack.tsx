import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="user-info">
      <Stack.Screen component={UserScreen} name="user-info" />
      <Stack.Screen component={HomeScreen} name="home" />
    </Stack.Navigator>
  );
};

export default HomeStack;
