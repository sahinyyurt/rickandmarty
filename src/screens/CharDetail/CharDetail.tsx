import {
  View,
  Text,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import RoundedInfo from '../../../components/RoundedInfo';
import {RootStackParamList} from '../../../App';
import {useQuery} from '@tanstack/react-query';
import {Result} from '../../../types/types';
type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'CharDetail'>;

const CharDetail = () => {
  const {params} = useRoute<ProfileScreenRouteProp>();
  const {goBack} = useNavigation();
  const {width: screenWidth} = useWindowDimensions();
  const {data, isLoading} = useQuery<Result>({
    queryKey: ['char', params.id],
    queryFn: async () => {
      const res = await fetch(
        'https://rickandmortyapi.com/api/character/' + params.id,
      );

      return (await res.json()) as Result;
    },
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imgOuter}>
        <TouchableOpacity onPress={() => goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>{'<'}</Text>
        </TouchableOpacity>
        <Image
          source={{
            uri: data?.image,
          }}
          style={[
            {
              width: screenWidth,
            },
            styles.image,
          ]}
        />
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.name}>{data?.name}</Text>
        <View style={styles.infos}>
          <RoundedInfo info={data?.gender} />
          <RoundedInfo info={data?.species} />
          <RoundedInfo info={data?.status} />
        </View>
        <Text style={styles.desc}>Description</Text>
        <Text>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum deleniti
          libero iusto dolores, vero magni reprehenderit tempora consequatur
          eius obcaecati harum perferendis et accusantium inventore hic mollitia
          corporis possimus! Vitae?
        </Text>
      </View>
    </View>
  );
};

export default CharDetail;

const styles = StyleSheet.create({
  loadingContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  container: {flex: 1},
  imgOuter: {position: 'absolute'},
  backIcon: {color: 'black', fontSize: 32, fontWeight: 'bold'},
  infos: {flexDirection: 'row', gap: 5},
  desc: {fontSize: 24, fontWeight: '500'},
  image: {
    height: undefined,
    aspectRatio: 1,
  },
  backBtn: {
    position: 'absolute',
    top: 30,
    left: 5,
    zIndex: 9,
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    marginTop: 300,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    padding: 20,
    gap: 10,
  },
  name: {fontSize: 26, fontWeight: '500'},
});
