import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  StatusBar,
  Pressable,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {sign_user} from '../helper/http';
import {AuthStackParamsList} from '../routes/AuthStack';
import {signIn} from '../slice/AuthSlice';

type ReturnObject = {
  message: string;
  token: string;
  name: string;
};

type LoginParamsType = StackNavigationProp<AuthStackParamsList, 'login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();
  const navigation = useNavigation<LoginParamsType>();

  const onPressHandler = async () => {
    console.log(email, password);
    if (!email || !password) {
      console.log(`error`);
      return;
    }
    const data = await sign_user(email, password);
    if (data) {
      dispatch(signIn(data.token));
      AsyncStorage.setItem('user_token', data.token);
    }

    console.log(data);
  };

  return (
    <View style={styles.root}>
      <View style={styles.input_container}>
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={e => setEmail(e)}
        />
      </View>
      <View style={styles.input_container}>
        <Text>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          keyboardType="twitter"
          autoCapitalize="none"
          value={password}
          onChangeText={e => setPassword(e)}
        />
      </View>
      <Button title="Login" onPress={onPressHandler} />
      <Pressable onPress={() => navigation.navigate('forgot')}>
        <Text>Forgot Password?</Text>
      </Pressable>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    // justifyContent:'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input_container: {
    backgroundColor: '#fff',
    marginTop: StatusBar.currentHeight || 30,
    width: '90%',
    borderRadius: 5,
  },
  input: {
    padding: 8,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
  },
});
