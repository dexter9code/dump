import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {getInfo} from '../helper/http';
import {logout} from '../slice/AuthSlice';

const UserScreen = () => {
  React.useEffect(() => {
    const getUserInfo = async () => {
      const data = await getInfo();
      if (data?.message === `Success`) {
        console.log(data);
        setEmail(data?.email);
        setName(data?.name);
      }
    };
    getUserInfo();
  }, []);

  const dispatch = useDispatch();

  const onPressHandler = async () => {
    await AsyncStorage.removeItem('user_token');
    dispatch(logout());
  };

  const [email, setEmail] = React.useState<string>('');
  const [name, setName] = React.useState('');

  return (
    <View style={styles.root}>
      <View style={styles.input_container}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={e => setEmail(e)}
        />
      </View>
      <View style={styles.input_container}>
        <TextInput
          placeholder="Username"
          value={name}
          onChangeText={e => setName(e)}
        />
      </View>
      <Button title="Logout" onPress={onPressHandler} />
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_container: {
    width: '90%',
    marginVertical: 16,
  },
});
