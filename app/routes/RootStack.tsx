import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signIn} from '../slice/AuthSlice';
import {RootState} from '../store/store';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const RootStack = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state: RootState) => state.auth.token);

  const checkForToken = async () => {
    const token = await AsyncStorage.getItem('user_token');
    if (token) {
      dispatch(signIn(token));
    }
  };
  useEffect(() => {
    checkForToken();
  }, []);

  return (
    <NavigationContainer>
      {authToken ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootStack;
