import React from 'react';
import { Divider } from '../common/index';
import { View, Text, Image, StyleSheet } from 'react-native';

// TODO: Make countdown
const ContentCard = ({ imgURL, description }) => {
  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: imgURL, //.replace(/_\d*./g, '_320.');,
        }}
      />
      <View style={styles.section}>
        <Text style={[styles.timer, styles.textColor]}>00 : 11 : 06 : 34</Text>
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
  timer: {
    fontSize: 25,
  },
  description: {
    //paddingHorizontal: 15,
  },
});

export default ContentCard;
