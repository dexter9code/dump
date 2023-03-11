import AsyncStorage from '@react-native-async-storage/async-storage';
import {View, StyleSheet, Text, Image, StatusBar, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {logout} from '../slice/AuthSlice';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const onPressHandler = async () => {
    await AsyncStorage.removeItem('user_token');
    dispatch(logout());
  };

  return (
    <View style={styles.root}>
      <Text>Welcome home</Text>
      <Image
        source={{
          uri: `https://images.unsplash.com/photo-1674574124340-c00cc2dae99c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80`,
        }}
        style={styles.image}
      />
      <Button title="logout" onPress={onPressHandler} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 30,
  },
  image: {
    width: 350,
    height: 350,
    resizeMode: 'cover',
    marginTop: 7,
  },
});
