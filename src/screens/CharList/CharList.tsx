import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import React from 'react';
import {useCharListApi} from '../../../hooks/useCharListApi';
import {Result} from '../../../types/types';
import CharListItem from './components/CharListItem';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
const CharList = () => {
  const {data, getNextPage} = useCharListApi();
  const {navigate} =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const renderItem: ListRenderItem<Result> = ({item}) => (
    <CharListItem
      {...item}
      onPress={() => navigate('CharDetail', {id: item.id.toString()})}
    />
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionHeader}>Movie List</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        style={styles.list}
        keyExtractor={({id}) => id.toString()}
        onEndReached={() => {
          getNextPage();
        }}
      />
    </SafeAreaView>
  );
};

export default CharList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  list: {paddingHorizontal: 20},
  sectionHeader: {paddingBottom: 10, fontSize: 24, paddingHorizontal: 20},
});
