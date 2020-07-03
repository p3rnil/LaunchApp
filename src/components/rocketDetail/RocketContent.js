import React, { useEffect } from 'react';
import { Text, FlatList, ScrollView } from 'react-native';
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
      {rocket !== null ? <Text>{rocket.description}</Text> : null}
      {rocketFamily ? (
        <FlatList
          data={rocketFamily.agencies}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
      ) : null}
      <FlatList
        data={data.defaultPads?.split(',')}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
      <Text>Agency stats!</Text>
      <Text>Info links!</Text>
    </ScrollView>
  );
};

export default RocketContent;
