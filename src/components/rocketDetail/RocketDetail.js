import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { RocketsProvider } from '../../context/index';
import RocketContent from './RocketContent';

const rockets = [
  {
    id: 1,
    name: 'Falcon 9 v1.1',
    configuration: '9 v1.1',
    defaultPads: '84,100',
    infoURL: null,
    wikiURL: 'http://en.wikipedia.org/wiki/Falcon_9',
    infoURLs: ['http://www.spacex.com/falcon9'],
    imageSizes: [320, 480, 640, 720, 768, 800, 960, 1024, 1080, 1280],
    imageURL:
      'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/Falcon9v1.1.jpg_1280.jpg',
    changed: '2017-02-21 00:00:00',
  },
  {
    id: 171,
    name: 'SS-520-5',
    configuration: '5',
    defaultPads: '',
    infoURL: '',
    wikiURL:
      'https://ja.wikipedia.org/wiki/SS-520%E3%83%AD%E3%82%B1%E3%83%83%E3%83%88',
    infoURLs: [''],
    changed: '2017-02-21 00:00:00',
  },
  {
    id: 2,
    name: 'Atlas V 541',
    configuration: '541',
    infoURL: '',
    wikiURL: 'http://en.wikipedia.org/wiki/Atlas_V',
    infoURLs: [''],
    imageSizes: [
      320,
      480,
      640,
      720,
      768,
      800,
      960,
      1024,
      1080,
      1280,
      1440,
      1920,
    ],
    imageURL:
      'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/Atlas+V+541_1920.jpg',
    changed: '2017-02-21 00:00:00',
  },
  {
    id: 3,
    name: 'Soyuz 2.1b',
    configuration: '2.1b',
    defaultPads: '',
    infoURL: '',
    wikiURL: 'http://en.wikipedia.org/wiki/Soyuz-2_(rocket)',
    infoURLs: [''],
    changed: '2017-02-21 00:00:00',
  },
  {
    id: 4,
    name: 'Proton-M/Briz-M',
    configuration: '-M/Briz-M',
    defaultPads: '',
    infoURL: '',
    wikiURL: 'http://en.wikipedia.org/wiki/Proton_M',
    infoURLs: [''],
    changed: '2017-02-21 00:00:00',
  },
  {
    id: 8,
    name: 'Pegasus XL',
    configuration: 'XL',
    defaultPads: '162,164,163,168',
    infoURL: '',
    wikiURL: 'http://en.wikipedia.org/wiki/Pegasus_XL',
    infoURLs: [''],
    imageSizes: [320, 480, 640, 720, 768, 800, 960, 1024, 1080, 1280],
    imageURL:
      'https://launchlibrary1.nyc3.digitaloceanspaces.com/RocketImages/Pegasus+XL_1280.jpg',
    changed: '2017-02-21 00:00:00',
  },
];

const pads = [
  {
    id: 1,
    name: 'Launch Area 5B, Woomera',
    padType: 0,
    latitude: '-30.971993000000000',
    longitude: '136.475005000000000',
    mapURL: 'http://maps.google.com/maps?q=30.972+S,+136.475+E',
    retired: 1,
    locationid: 20,
    infoURL: '',
    wikiURL: 'https://en.wikipedia.org/wiki/Woomera_Launch_Area_5',
    infoURLs: [],
    changed: '2017-02-21 00:00:00',
  },
  {
    id: 2,
    name: 'Launch Area 6A, Woomera',
    padType: 0,
    latitude: '-31.074000000000000',
    longitude: '136.439400000000000',
    mapURL: 'http://maps.google.com/maps?q=31.074+S,+136.4394+E',
    retired: 1,
    locationid: 20,
    infoURL: '',
    wikiURL: '',
    infoURLs: [],
    changed: '2017-02-21 00:00:00',
  },
  {
    id: 3,
    name: 'Launch Area 6B, Woomera',
    padType: 0,
    latitude: '-31.079200000000000',
    longitude: '136.445000000000000',
    mapURL: 'http://maps.google.com/maps?q=31.0792+S,+136.445+E',
    retired: 1,
    locationid: 20,
    infoURL: '',
    wikiURL: '',
    infoURLs: [],
    changed: '2017-02-21 00:00:00',
  },
  {
    id: 4,
    name: 'Launch Area 8, Woomera',
    padType: 0,
    latitude: '-31.034000000000000',
    longitude: '136.463000000000000',
    mapURL: 'http://maps.google.com/maps?q=31.034+S,+136.463+E',
    retired: 1,
    locationid: 20,
    infoURL: '',
    wikiURL: '',
    infoURLs: [],
    changed: '2017-02-21 00:00:00',
  },
  {
    id: 5,
    name: 'Launch Area 2A, Jiuquan',
    padType: 0,
    latitude: '41.306000000000000',
    longitude: '100.314000000000000',
    mapURL: 'http://maps.google.com/maps?q=41.3060,100.3140',
    retired: 1,
    locationid: 1,
    infoURL: '',
    wikiURL: '',
    infoURLs: [],
    changed: '2017-02-21 00:00:00',
  },
  {
    id: 6,
    name: 'Launch Area 2B, Jiuquan',
    padType: 0,
    latitude: '41.309000000000000',
    longitude: '100.317000000000000',
    mapURL: 'http://maps.google.com/maps?q=40.958093,100.291188',
    retired: 1,
    locationid: 1,
    infoURL: '',
    wikiURL: '',
    infoURLs: [],
    changed: '2017-02-21 00:00:00',
  },
];

// TODO: Just a placeholder, make it functional >:)
const RocketDetail = ({ route, data }) => {
  const { rocket } = route.params;

  return (
    <RocketsProvider>
      <View>
        <RocketContent data={rocket} />
        <FlatList
          data={rockets}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
        <FlatList
          data={pads}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
        <Text>Agency stats!</Text>
        <Text>Info links!</Text>
      </View>
    </RocketsProvider>
  );
};

export default RocketDetail;
