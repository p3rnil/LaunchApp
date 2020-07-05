import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import HeaderDetail from './HeaderDetail';
import ContentDetail from './ContentDetail';

const LaunchDetail = ({ route }) => {
  const { launch, ctx } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <HeaderDetail data={launch} ctx={ctx} />
        <ContentDetail data={launch} />
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
    paddingTop: 15,
  },
});

export default LaunchDetail;
