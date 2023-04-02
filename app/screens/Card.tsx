import React, {ForwardedRef, forwardRef, useImperativeHandle} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {snapPoint} from 'react-native-redash';
import AntIcon from 'react-native-vector-icons/AntDesign';

const {width: wWidth, height} = Dimensions.get('window');

const SNAP_POINTS = [-wWidth, 0, wWidth];
const aspectRatio = 722 / 368;
const CARD_WIDTH = wWidth - 80;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.6;

interface CardProps {
  card: {
    source: ReturnType<typeof require>;
  };
}

type SkipProfileHandler = {
  skipFullCard: () => void;
};

const Card = forwardRef(
  ({card: {source}}: CardProps, ref: ForwardedRef<unknown>) => {
    useImperativeHandle(ref, () => {
      return {
        skipFullCard: skipHandler,
      };
    });

    const x = useSharedValue<number>(0);
    const y = useSharedValue<number>(0);

    const gestureHandler = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      {x: number; y: number}
    >({
      onStart: (_, ctx) => {
        ctx.x = x.value;
        ctx.y = y.value;
      },
      onActive: (e, ctx) => {
        (x.value = ctx.x + e.translationX), (y.value = ctx.y + e.translationY);
      },
      onEnd: ({velocityX, velocityY}) => {
        const des = snapPoint(x.value, velocityX, SNAP_POINTS);
        x.value = withSpring(des, {velocity: velocityX});
        y.value = withSpring(0, {velocity: velocityY});
      },
    });

    const swipeAnimationStyles = useAnimatedStyle(() => {
      return {
        transform: [{translateX: x.value}, {translateY: y.value}],
      };
    });

    const skipHandler = () => {
      console.log(`i am checking here...`);
      x.value = withSpring(400);
      // y.value = withSpring(400);
    };

    return (
      <GestureHandlerRootView style={styles.root} pointerEvents="box-none">
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.card, swipeAnimationStyles]}>
            <View
              style={{
                // backgroundColor: 'pink',
                width: '90%',
                justifyContent: 'center',
                alignItems: 'flex-end',
                marginBottom: 10,
              }}>
              <Pressable
                onPress={skipHandler}
                style={{
                  //   backgroundColor: '#00adef',
                  justifyContent: 'flex-end',
                  width: '26%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontWeight: '500',
                    marginRight: 4,
                  }}>
                  Skip
                </Text>
                <AntIcon name="arrowright" size={16} />
              </Pressable>
            </View>
            <View
              style={{
                //   backgroundColor: 'orange',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                borderRadius: 18,
              }}>
              <Image
                source={source}
                style={{
                  width: 300,
                  height: IMAGE_WIDTH * aspectRatio,
                  marginVertical: 5,
                  borderRadius: 18,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                }}
                resizeMode="cover"
              />
            </View>
            <View
              style={{
                marginTop: 20,
                borderWidth: 0.3,
                width: '100%',
                padding: 10,
                borderRadius: 8,
              }}>
              <Text style={{fontSize: 17, fontWeight: '600', padding: 5}}>
                About
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  borderWidth: 0.3,
                  borderRadius: 10,
                  padding: 3,
                  alignItems: 'center',
                  width: '50%',
                }}>
                <AntIcon
                  name="hearto"
                  size={15}
                  style={{marginHorizontal: 5}}
                />
                <Text>A Relationship</Text>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    );
  },
);

export default Card;

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    // justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
});
