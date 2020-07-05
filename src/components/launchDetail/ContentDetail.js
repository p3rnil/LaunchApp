import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

const ContentDetail = ({ data }) => {
  return (
    <>
      <View style={styles.section}>
        <Text style={styles.title}>Mission details</Text>
        <Text style={styles.subtitle}>{data.missions[0].name}</Text>
        <Text>{data.missions[0].description}</Text>
        <Text>{`Type: ${data.missions[0].typeName}`}</Text>
        <Text>{`Agency: ${data.lsp.name}, ${data.lsp.countryCode}`}</Text>
      </View>
      <View style={styles.section}>
        <Text style={[styles.title, styles.marginBottom]}>Location</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: data.location.pads[0].latitude,
            longitude: data.location.pads[0].longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginBottom: {
    marginBottom: 15,
  },
  icon: {
    width: 25,
    marginRight: 2,
  },
  section: {
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 20,
  },
  list: {},
  agencyCard: {
    marginHorizontal: 10,
    backgroundColor: '#f0f0f0',
    marginVertical: 7.5,
    paddingHorizontal: 15,
    paddingVertical: 40,
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
  map: {
    height: 300,
    width: '100%',
    borderRadius: 10,
  },
});

export default ContentDetail;
