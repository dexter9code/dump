import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const LoginScreen = () => {
  return (
    <View style={styles.root}>
      <View style={styles.info_container}>
        <View style={styles.logo_container}>
          <Image
            source={require('../../assets/icons/tinder.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.login_text}>login</Text>
        <View style={styles.text_container}>
          <Text style={styles.info_text}>Don't have an account ? </Text>
          <Pressable>
            <Text style={styles.sign_up_text}>Sign up</Text>
          </Pressable>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#00adef',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.input_container}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput placeholder="email@example.com" style={styles.input} />
        </View>
        <View style={styles.input_container}>
          <Text style={styles.label}>Password</Text>
          <TextInput placeholder="password" style={styles.input} />
        </View>
        <Icon name="home" size={30} color="#900" />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo_container: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    alignItems: 'center',
  },
  logo: {
    width: '73%',
    height: '85%',
    resizeMode: 'cover',
  },
  info_container: {
    alignItems: 'center',
    // backgroundColor: 'orangered',
    justifyContent: 'center',
  },
  login_text: {
    fontSize: 25,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  text_container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  info_text: {
    fontWeight: '500',
    fontSize: 17,
    color: '#ccc',
  },
  sign_up_text: {
    fontWeight: '500',
    fontSize: 17,
    color: '#00adef',
    textDecorationLine: 'underline',
    textDecorationColor: '#00adef',
  },
  input_container: {
    backgroundColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'orangered',
    padding: 12,
    borderRadius: 4,
    width: '95%',
  },
  label: {
    marginVertical: 8,
    fontSize: 15,
    fontWeight: '500',
    width: '97%',
    paddingHorizontal: 3,
  },
});
