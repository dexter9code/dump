import {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TextInput,
  Button,
  Image,
  StatusBar,
  Pressable,
} from 'react-native';
// import { TextInput } from 'react-native-gesture-handler';

const ForgotScreen = () => {
  const floatAnimation = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 15,
    }),
  ).current;
  const [email, setEmail] = useState<string>('');

  const checkForString = (str: string) => {
    const final_str = str.trim();
    return final_str.length >= 1;
  };

  const moveLabel = () => {
    Animated.timing(floatAnimation, {
      toValue: {y: -15, x: 8},
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const moveBackLabel = () => {
    if (checkForString(email)) {
      return;
    } else {
      setEmail('');
      Animated.timing(floatAnimation, {
        toValue: {y: 15, x: 0},
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.info_container}>
        <Image
          style={styles.forgot_image}
          source={{
            uri: `https://cdn-icons-png.flaticon.com/512/9867/9867876.png`,
          }}
        />
        <Text
          style={{
            marginVertical: 8,
            fontWeight: '700',
            fontSize: 18,
            textAlign: 'center',
            padding: 10,
          }}>
          Email attach to your Account to get the reset link
        </Text>
      </View>
      <Animated.View style={[styles.email_container]}>
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [
                {translateY: floatAnimation.y},
                {translateX: floatAnimation.x},
              ],
            },
          ]}>
          Email
        </Animated.Text>
        <TextInput
          //   placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          style={styles.email_input}
          onChangeText={e => setEmail(e)}
          onFocus={moveLabel}
          onBlur={moveBackLabel}
        />
      </Animated.View>
      <Pressable style={styles.btn_container}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
          Get the Link
        </Text>
      </Pressable>
      <TextInput placeholder="to loose focus" />
    </View>
  );
};

export default ForgotScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  email_container: {
    width: '90%',
    backgroundColor: '#fff',
    marginTop: 20,
    padding: 8,
    borderWidth: 0.5,
    borderRadius: 4,
  },
  email_input: {
    borderBottomWidth: 0.3,
    padding: 3,
  },
  text: {
    backgroundColor: '#fff',
    width: '14%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
  },
  forgot_image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  info_container: {
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 20,
  },
  btn_container: {
    backgroundColor: 'orangered',
    width: '80%',
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});
