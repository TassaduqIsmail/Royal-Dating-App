import React from 'react';
import { View, StyleSheet } from 'react-native';
import VerticalSliderWithDates from './Texsst';

const App = () => {
  const dates = [
    '2024-03-01',
    '2024-03-02',
    '2024-03-03',
    '2024-03-04',
    '2024-03-05',
    '2024-03-06',
    '2024-03-07',
    '2024-03-01',
    '2024-03-02',
    '2024-03-03',
    '2024-03-04',
    '2024-03-05',
    '2024-03-06',
    '2024-03-07',
    '2024-03-01',
    '2024-03-02',
    '2024-03-03',
    '2024-03-04',
    '2024-03-05',
    '2024-03-06',
    '2024-03-07',

    '2024-03-01',
    '2024-03-02',
    '2024-03-03',
    '2024-03-04',
    '2024-03-05',
    '2024-03-06',
    '2024-03-07',  '2024-03-01',
    '2024-03-02',
    '2024-03-03',
    '2024-03-04',
    '2024-03-05',
    '2024-03-06',
    '2024-03-07',
    '2024-03-01',
    '2024-03-02',
    '2024-03-03',
    '2024-03-04',
    '2024-03-05',
    '2024-03-06',
    '2024-03-07',
  ];
  return (
    <View style={styles.container}>
      <VerticalSliderWithDates dates={dates} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;