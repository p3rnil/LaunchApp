import React from 'react';
import { AgenciesList } from '../components/index';
import { AgencyProvider } from '../context/index';

const Agencies = ({ navigation }) => {
  const handlePress = (item) => {
    navigation.navigate('AgencyDetail', {
      item,
    });
  };

  return (
    <AgencyProvider>
      <AgenciesList handlePress={handlePress} />
    </AgencyProvider>
  );
};

export default Agencies;
