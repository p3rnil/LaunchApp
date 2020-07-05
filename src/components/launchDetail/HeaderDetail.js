import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const HeaderDetail = ({ data, ctx }) => {
  const isThumbsUps = useCallback(
    (id) => {
      const isAGoStatus =
        ctx.launchesStatus[id - 1].id === 1 ||
        ctx.launchesStatus[id - 1].id === 3 ||
        ctx.launchesStatus[id - 1].id === 6;

      return isAGoStatus;
    },
    [ctx.launchesStatus],
  );

  return (
    <View style={styles.section}>
      <Text style={[styles.title, styles.marginBottom]}>{data.name}</Text>
      <View style={styles.row}>
        {isThumbsUps(data.status) ? (
          <Ionicons
            style={styles.icon}
            name="ios-thumbs-up"
            size={25}
            color="tomato"
          />
        ) : (
          <Ionicons
            style={styles.icon}
            name="ios-thumbs-down"
            size={25}
            color="tomato"
          />
        )}
        <Text>{ctx.launchesStatus[data.status - 1].name}</Text>
      </View>
      <View style={styles.row}>
        <Ionicons style={styles.icon} name="ios-pin" size={25} color="tomato" />
        <Text>{data.location.name}</Text>
      </View>
      <View style={styles.row}>
        <Ionicons
          style={styles.icon}
          name="ios-timer"
          size={25}
          color="tomato"
        />
        <Text>{new Date(data.net).toLocaleString()}</Text>
      </View>
    </View>
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
});

export default HeaderDetail;
