import React, { useEffect } from 'react';
import { Text, FlatList, ScrollView } from 'react-native';
import {
  getRocket,
  useRocketDispatch,
  useRocketsState,
} from '../../context/index';

const RocketContent = ({ data }) => {
  const { rocket } = useRocketsState();
  const rocketsDispatch = useRocketDispatch();

  useEffect(() => {
    getRocket(data.id, data.wikiURL, rocketsDispatch);
  }, [data.id, data.wikiURL, rocketsDispatch]);

  return (
    <ScrollView>
      {rocket !== null ? <Text>{rocket.description}</Text> : null}
      <FlatList
        data={data.family?.agencies.split(',')}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
      />
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
