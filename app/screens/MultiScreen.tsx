import React, {useState} from 'react';
import {Pressable, Text, View} from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash';
import {ScrollView} from 'react-native-gesture-handler';
import {MultipleSelectList} from 'react-native-dropdown-select-list';

// Options data must contain 'item' & 'id' keys

const K_OPTIONS = [
  {
    item: 'Juventus',
    id: 'JUVE',
  },
  {
    item: 'Real Madrid',
    id: 'RM',
  },
  {
    item: 'Barcelona',
    id: 'BR',
  },
  {
    item: 'PSG',
    id: 'PSG',
  },
  {
    item: 'FC Bayern Munich',
    id: 'FBM',
  },
  {
    item: 'Manchester United FC',
    id: 'MUN',
  },
  {
    item: 'Manchester City FC',
    id: 'MCI',
  },
  {
    item: 'Everton FC',
    id: 'EVE',
  },
  {
    item: 'Tottenham Hotspur FC',
    id: 'TOT',
  },
  {
    item: 'Chelsea FC',
    id: 'CHE',
  },
  {
    item: 'Liverpool FC',
    id: 'LIV',
  },
  {
    item: 'Arsenal FC',
    id: 'ARS',
  },

  {
    item: 'Leicester City FC',
    id: 'LEI',
  },
];
const data = [
  {key: '1', value: 'Mobiles', disabled: true},
  {key: '2', value: 'Appliances'},
  {key: '3', value: 'Cameras'},
  {key: '4', value: 'Computers', disabled: true},
  {key: '5', value: 'Vegetables'},
  {key: '6', value: 'Diary Products'},
  {key: '7', value: 'Drinks'},
];

const MultiScreen = () => {
  const [userSelected, setUserSelected] = useState([]);
  const [selected, setSelected] = useState([]);
  console.log(userSelected);
  console.log(`automatically selected`, selected);
  return (
    <ScrollView style={{flex: 1}}>
      <View style={{backgroundColor: '#ccc'}}>
        {K_OPTIONS.map((item, index) => {
          return (
            <Pressable
              key={item.id}
              style={{
                backgroundColor: '#00adef',
                padding: 15,
                marginVertical: 10,
              }}>
              <Text style={{color: 'black'}}>{item.item}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <MultipleSelectList
          data={data}
          setSelected={v => setSelected(v)}
          label="Select Items"
          save="value"
          notFoundText="no result found"
          onSelect={() => setUserSelected(selected)}
          badgeStyles={{backgroundColor: '#00adef'}} //controlling the selected badge
          checkBoxStyles={{backgroundColor: 'red'}} // internal checkbox style
        />
      </View>
    </ScrollView>
  );
};

export default MultiScreen;
