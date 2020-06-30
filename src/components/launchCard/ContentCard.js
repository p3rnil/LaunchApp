import React from 'react';
import { Divider } from '../common/index';
import { View, Text, Image, StyleSheet } from 'react-native';
import Countdown from '../common/Countdown';

const ContentCard = ({ imgURL, launchDate, description, launchStatus }) => {
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: imgURL, //.replace(/_\d*./g, '_320.');,
        }}
      />
      <View style={styles.section}>
        <Countdown propDate={launchStatus === 1 ? launchDate : ''} />
        <Divider />
        <Text style={[styles.description, styles.textColor]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textColor: {
    color: 'black',
  },
  image: {
    width: '100%',
    height: 250,
    //resizeMode: 'cover',
  },
  section: {
    alignItems: 'center',
    padding: 15,
  },
  description: {},
});

export default ContentCard;
