import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
type Props = {
  info?: string;
};

const RoundedInfo: React.FC<Props> = ({info}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.info}>{info}</Text>
    </View>
  );
};

export default RoundedInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#DBE3FF',
    width: 61,
    height: 18,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {color: '#88A4E8', fontSize: 14},
});
