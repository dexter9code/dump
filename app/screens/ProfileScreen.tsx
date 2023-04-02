import {View, StyleSheet, Text, Pressable} from 'react-native';
import React from 'react';
import Card from './Card';

export const USERS = [
  {
    id: 1,
    information: {
      inRelationship: true,
      goesToGym: true,
      cooks: false,
      listenMusic: true,
    },
    source: require('../../assets/user1.jpg'),
  },
  {
    id: 2,
    information: {
      inRelationship: true,
      goesToGym: true,
      cooks: false,
      listenMusic: true,
    },
    source: require('../../assets/user2.jpg'),
  },
  {
    id: 3,
    information: {
      inRelationship: true,
      goesToGym: true,
      cooks: false,
      listenMusic: true,
    },
    source: require('../../assets/user3.jpg'),
  },
  {
    id: 4,
    information: {
      inRelationship: true,
      goesToGym: true,
      cooks: false,
      listenMusic: true,
    },
    source: require('../../assets/user4.jpg'),
  },
  {
    id: 5,
    information: {
      inRelationship: true,
      goesToGym: true,
      cooks: false,
      listenMusic: true,
    },
    source: require('../../assets/user5.jpg'),
  },
  {
    id: 6,
    information: {
      inRelationship: true,
      goesToGym: true,
      cooks: false,
      listenMusic: true,
    },
    source: require('../../assets/user6.jpg'),
  },
];
const ProfileScreen = () => {
  const childRef = React.useRef();
  return (
    <View style={styles.container}>
      {USERS.map((item, index) => {
        console.log(item);
        return <Card card={item} key={index} ref={childRef} />;
      })}
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          position: 'absolute',
          bottom: 50,
        }}>
        <Pressable
          onPress={() => {
            childRef?.current?.skipFullCard();
            console.log(`pressed`);
          }}
          style={{
            backgroundColor: '#ae220b',
            width: '80%',
            alignItems: 'center',
            padding: 12,
            borderRadius: 4,
          }}>
          <Text
            style={{
              fontWeight: '700',
              textTransform: 'capitalize',
              color: '#f7f7f7',
              fontSize: 17,
            }}>
            schedule Appointment
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
