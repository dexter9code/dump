import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {useState} from 'react';
import {USERS} from './ProfileScreen';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const {width, height} = Dimensions.get('screen');

type UserInformation = {
  inRelationship: boolean;
  goesToGym: boolean;
  cooks: boolean;
  listenMusic: boolean;
};
interface UsersProps {
  card: {
    source: ReturnType<typeof require>;
  };
  id: number;
  info: UserInformation;
}

type US = typeof USERS;
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 1.7;
const SwipeScreen = () => {
  const [user, setUser] = useState<US>(USERS);

  return (
    <View style={styles.root}>
      <FlatList
        data={user}
        horizontal
        inverted
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          padding: 4,
        }}
        scrollEnabled={false}
        removeClippedSubviews={false}
        CellRendererComponent={({item, index, children, style, ...props}) => {
          const updatedStyle = [style, {zIndex: user.length - index}];
          return (
            <View style={updatedStyle} index={index} {...props}>
              {children}
            </View>
          );
        }}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => {
          return (
            <GestureHandlerRootView
              style={{position: 'absolute', left: -ITEM_WIDTH / 2}}>
              <PanGestureHandler>
                <Animated.View
                  style={{backgroundColor: 'orangered', marginTop: 10}}>
                  <Image
                    source={item.source}
                    style={{width: ITEM_WIDTH, height: ITEM_HEIGHT}}
                    resizeMode="cover"
                  />
                </Animated.View>
              </PanGestureHandler>
            </GestureHandlerRootView>
          );
        }}
      />
    </View>
  );
};

export default SwipeScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
});
