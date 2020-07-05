import React from 'react';
import HeaderCard from './HeaderCard';
import ContentCard from './ContentCard';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

// TODO: Make global style, ex: font color
const LaunchCard = ({ data, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <HeaderCard
          name={data.name}
          location={data.location.pads[0]?.name}
          date={new Date(data.net).toDateString()}
          status={data.status}
        />
        <ContentCard
          imgURL={data.rocket.imageURL}
          launchDate={data.net}
          launchStatus={data.status}
          description={data.missions[0]?.description}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    color: 'red',
    backgroundColor: '#f0f0f0',
    marginVertical: 7.5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
});

export default LaunchCard;
