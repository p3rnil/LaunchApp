import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const LaunchDetail = ({ route }) => {
  const { launch } = route.params;
  console.log(launch);
  return (
    <SafeAreaView>
      <View style={styles.view}>
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
        <Text style={styles.title}>Mission details</Text>
        <Text style={styles.subtitle}>{launch.missions[0].name}</Text>
        <Text>{launch.missions[0].description}</Text>
        <Text>{`Type: ${launch.missions[0].typeName}`}</Text>
        <Text>{`Agency: ${launch.lsp.name}, ${launch.lsp.countryCode}`}</Text>
        <Text style={styles.title}>Location info</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingHorizontal: 15,
    backgroundColor: 'pink',
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
});

export default LaunchDetail;
