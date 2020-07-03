import React, { useEffect } from 'react';
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native';
import OpenURLButton from '../common/OpenURLButton';
import {
  getRocket,
  useRocketDispatch,
  useRocketsState,
  useRocketFamilyState,
  useRocketFamilyDispatch,
  getRocketFamily,
} from '../../context/index';

const RocketContent = ({ data }) => {
  const { rocket } = useRocketsState();
  const { rocketFamily } = useRocketFamilyState();
  const rocketsDispatch = useRocketDispatch();
  const rocketFamiliesDispatch = useRocketFamilyDispatch();

  useEffect(() => {
    getRocket(data.id, data.wikiURL, rocketsDispatch);
  }, [data.id, data.wikiURL, rocketsDispatch]);

  useEffect(() => {
    getRocketFamily(data.family.id, rocketFamiliesDispatch);
  }, [data.family.id, rocketFamiliesDispatch]);

  console.log(rocketFamily);

  return (
    <ScrollView>
      {rocket && rocketFamily ? (
        <>
          <View style={styles.section}>
            <Text style={styles.title}>Description: </Text>
            <Text>{rocket.description}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Agencies: </Text>
            <FlatList
              style={styles.list}
              data={rocketFamily.agencies}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.agencyCard}>
                  <Text>{item.name}</Text>
                </View>
              )}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Links:</Text>
            <OpenURLButton url={data.wikiURL}>Wiki</OpenURLButton>
          </View>
        </>
      ) : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
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
  link: {},
});

export default RocketContent;
