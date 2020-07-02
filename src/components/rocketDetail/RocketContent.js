import React, { useEffect } from 'react';
import { Text, ScrollView } from 'react-native';
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
    </ScrollView>
  );
};

export default RocketContent;
