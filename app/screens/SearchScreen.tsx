import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Text,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {faker} from '@faker-js/faker';
import React from 'react';

interface UserData {
  id: string;
  image: string;
  name: string;
  jobTitle: string;
  email: string;
}

faker.seed(10);
const DATA: UserData[] = [...Array(30).keys()].map((_, i) => {
  return {
    id: faker.datatype.uuid(),
    image: faker.image.avatar(),
    name: faker.name.fullName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SearchScreen = () => {
  const [searchItem, setSearchItem] = React.useState<string>('');

  // Backend
  //   const [profiles, setProfiles] = React.useState([]);
  //   React.useEffect(() => {
  //     const getData = async () => {
  //       const res = await fetch(
  //         `https://jsonplaceholder.typicode.com/users?id=${searchItem}`,
  //       );
  //       const data = await res.json();
  //       setProfiles(data);
  //     };
  //     getData();
  //   }, [searchItem]);
  //   console.log(profiles);

  const getUserData = () => {
    return DATA.filter(item => item.name.toLowerCase().includes(searchItem));
  };
  const USERDATA = getUserData();

  return (
    <View style={styles.root}>
      <View style={styles.search_outer_container}>
        <View style={styles.search_container}>
          <TextInput
            placeholder="Profile"
            placeholderTextColor={'black'}
            style={styles.search_input}
            value={searchItem}
            onChangeText={e => setSearchItem(e.toLowerCase())}
          />
          <Pressable style={styles.search_icon}>
            <Icon name="search" size={23} color="white" />
          </Pressable>
        </View>
      </View>
      <FlatList
        data={USERDATA}
        contentContainerStyle={{
          paddingHorizontal: 14,
          marginVertical: 10,
        }}
        keyExtractor={item => item.id}
        renderItem={({index, item}) => {
          return (
            <View style={styles.profile_container}>
              <View style={styles.image_container}>
                <Image
                  resizeMode="cover"
                  style={styles.image}
                  source={{
                    uri: item.image,
                  }}
                />
              </View>
              <Text style={styles.text}>{item.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
  search_outer_container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  search_container: {
    flexDirection: 'row',
    backgroundColor: '#ccc',
    justifyContent: 'center',
    borderRadius: 18,
    overflow: 'hidden',
  },
  search_input: {
    height: 40,
    width: '75%',
    backgroundColor: '#e7e7e7',
    paddingHorizontal: 12,
  },
  search_icon: {
    backgroundColor: '#ac1c04',
    alignItems: 'center',
    justifyContent: 'center',
    width: '12%',
  },
  profile_container: {
    backgroundColor: '#ac1c04',
    flexDirection: 'row',
    alignItems: 'center',
    height: 65,
    marginVertical: 10,
  },
  image_container: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
});
