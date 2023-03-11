import {useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const BG_COLOR = '#4d4a95';

const SplashScreen = () => {
  // getting the safe-area values
  const edges = useSafeAreaInsets();

  const moveAnimation = useRef(new Animated.Value(0)).current;

  const scaleLogo = useRef(new Animated.Value(1)).current;
  const scaleText = useRef(new Animated.Value(1)).current;

  const moveLogo = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const moveTitle = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(moveAnimation, {
          toValue: -Dimensions.get('window').height + (edges.top + 65),
          useNativeDriver: true,
        }),
        Animated.timing(scaleLogo, {
          toValue: 0.35,
          useNativeDriver: true,
        }),
        Animated.timing(scaleText, {
          toValue: 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(moveLogo, {
          toValue: {
            x: Dimensions.get('window').width / 2 - 35,
            y: Dimensions.get('window').height / 2 - 5,
            // y: 0,
          },
          useNativeDriver: true,
        }),
        Animated.timing(moveTitle, {
          toValue: {
            x: 0,
            y: Dimensions.get('window').height / 2,
            // y: 0,
          },
          useNativeDriver: true,
        }),
      ]).start();
    }, 500);
  }, []);

  return (
    <Animated.View
      style={[styles.root, {transform: [{translateY: moveAnimation}]}]}>
      <Animated.View style={[styles.inner_container]}>
        <Animated.Image
          source={require('./assets/chat.png')}
          style={[
            styles.img,
            {
              transform: [
                {translateX: moveLogo.x},
                {translateY: moveLogo.y},
                {scale: scaleLogo},
              ],
            },
          ]}
        />
        <Animated.Text
          style={[
            styles.text,
            {
              transform: [
                {scale: scaleText},
                {translateX: moveTitle.x},
                {translateY: moveTitle.y},
              ],
            },
          ]}>
          We Chat
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: BG_COLOR,
  },
  inner_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
});
