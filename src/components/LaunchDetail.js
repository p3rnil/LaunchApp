import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';

const LaunchDetail = ({ route }) => {
  const { launch } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={[styles.title, styles.marginBottom]}>{launch.name}</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <Ionicons
              style={styles.icon}
              name="ios-thumbs-up"
              size={25}
              color="tomato"
            />
            <Text>{launch.status}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons
              style={styles.icon}
              name="ios-pin"
              size={25}
              color="tomato"
            />
            <Text>{launch.location.name}</Text>
          </View>
          <View style={styles.row}>
            <Ionicons
              style={styles.icon}
              name="ios-timer"
              size={25}
              color="tomato"
            />
            <Text>{new Date(launch.net).toLocaleString()}</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Mission details</Text>
          <Text style={styles.subtitle}>{launch.missions[0].name}</Text>
          <Text>{launch.missions[0].description}</Text>
          <Text>{`Type: ${launch.missions[0].typeName}`}</Text>
          <Text>{`Agency: ${launch.lsp.name}, ${launch.lsp.countryCode}`}</Text>
        </View>
        <Text style={[styles.title, styles.marginBottom]}>Location</Text>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: launch.location.pads[0].latitude,
            longitude: launch.location.pads[0].longitude,
            latitudeDelta: 0.0022,
            longitudeDelta: 0.0021,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 15,
  },
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

export default LaunchDetail;
