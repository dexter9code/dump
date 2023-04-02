import {useReducer, useState, useEffect} from 'react';
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  Switch,
  ScrollView,
} from 'react-native';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import {MultiSelect} from 'react-native-element-dropdown';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SELECTED_DATA = ['reading', 'cooking', 'smoking'];
const DATA = [
  {label: 'Cooking', value: 'cooking'},
  {label: 'Smoking', value: 'smoking'},
  {label: 'Reading', value: 'reading'},
  {label: 'Eating', value: 'eating'},
  {label: 'Traveling', value: 'traveling'},
  {label: 'Singing', value: 'singing'},
  {label: 'Dancing', value: 'dancing'},
  {label: 'Movies', value: 'movies'},
];

const INITIAL_DATA = [];

const SELECTED_LOOP = [
  {id: 1, value: 'monday'},
  {id: 2, value: 'tuesday'},
  // {id: 3, value: 'wednesday'},
  // {id: 4, value: 'thursday'},
  // {id: 5, value: 'friday'},
  // {id: 6, value: 'saturday'},
  // {id: 7, value: 'sunday'},
];

interface ActionInter {
  day: string;
  isOpen: boolean;
  timing: any[];
}

const weekendInitialState = {
  monday: [],
  tuesday: [],
  // wednesday: [],
  // thursday: [],
  // friday: [],
  // saturday: [],
  // sunday: [],
};

const switchInitialState = {
  monday: false,
  tuesday: false,
  // wednesday: [],
  // thursday: [],
  // friday: [],
  // saturday: [],
  // sunday: [],
};

type ActionType =
  | {type: 'monday'; payload: ActionInter}
  | {type: 'tuesday'; payload: ActionInter};

const weekendReducer = (state: typeof weekendInitialState, action: any) => {
  switch (action.type) {
    case 'add':
      console.log(action.payload.day);
      return {...state, [action.payload.day]: action.payload.timing};
    case 'remove':
      return {...state, [action.payload.day]: []};
    default:
      state;
  }
};

const switchReducer = (state: typeof switchInitialState, action: any) => {
  switch (action.type) {
    case 'toggle':
      return {...state, [action.payload.day]: !state[action.payload.day]};
    default:
      state;
  }
};

const renderItem = item => {
  return (
    <View
      style={{
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'center',

        alignItems: 'center',
      }}>
      <MaterialIcon
        style={{marginRight: 8}}
        name="clock-time-five-outline"
        color={'black'}
        size={18}
      />
      <Text>{item.label}</Text>
    </View>
  );
};

const QuestionnaireScreen = () => {
  const [selected, setSelected] = useState(['eating', 'movies']);
  // console.log(selected);
  const [switchState, switchDispatch] = useReducer(
    switchReducer,
    switchInitialState,
  );
  const [weekendState, weekendDispatch] = useReducer(
    weekendReducer,
    weekendInitialState,
  );
  console.log(weekendState);
  return (
    <ScrollView style={styles.root}>
      <View style={{alignItems: 'center'}}>
        {SELECTED_LOOP.map((current, index) => {
          return (
            <View
              key={index}
              style={{
                width: '80%',
                alignItems: 'center',
                // backgroundColor: 'pink',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text>{current.value}</Text>
                <Switch
                  value={switchState[current.value]}
                  onValueChange={() => {
                    switchDispatch({
                      type: 'toggle',
                      payload: {day: current.value},
                    });
                  }}
                />
              </View>
              <MultiSelect
                data={DATA}
                renderItem={renderItem}
                containerStyle={{
                  // width: 140,
                  backgroundColor: '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center',
                  // justifyContent: 'space-evenly',
                }}
                itemContainerStyle={{
                  width: 140,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                itemTextStyle={{color: '#000'}}
                // dropdownPosition="top"
                mode="default" // default is default
                labelField="label"
                valueField="value"
                placeholder="Select Hobbies"
                value={weekendState[current.value]}
                flatListProps={{
                  numColumns: 2,
                }}
                onChange={item => {
                  const day = current.value;
                  weekendDispatch({
                    type: 'add',
                    payload: {day, timing: item},
                  });
                }}
                activeColor={'orangered'}
                style={{
                  height: 50,
                  backgroundColor: 'transparent',
                  borderBottomColor: 'gray',
                  borderBottomWidth: 0.5,
                  width: '90%',
                }}
                renderLeftIcon={() => (
                  <MaterialIcon
                    style={{marginRight: 8}}
                    name="clock-time-five-outline"
                    color={'black'}
                    size={18}
                  />
                )}
              />
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default QuestionnaireScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
