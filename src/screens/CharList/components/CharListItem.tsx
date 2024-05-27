import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Result} from '../../../../types/types';
import RoundedInfo from '../../../../components/RoundedInfo';

const CharListItem = ({
  name,
  image,
  gender,
  status,
  species,
  onPress,
}: Result & {onPress?: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{uri: image}} style={styles.img} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.infoInner}>
            <RoundedInfo info={gender} />
            <RoundedInfo info={status} />
          </View>
          <Text style={styles.altInfo}> {species}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CharListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  altInfo: {fontSize: 16},
  infoInner: {flexDirection: 'row', gap: 10},
  name: {fontSize: 20, fontWeight: '500'},
  infoContainer: {gap: 10},
  img: {
    width: 100,
    height: undefined,
    aspectRatio: 85 / 120,
    borderRadius: 5,
  },
});
