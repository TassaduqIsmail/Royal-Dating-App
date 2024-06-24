import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';
const ITEM_HEIGHT = 60;
const VISIBLE_ITEMS = 5; // Number of visible items in the wheel
const VerticalSliderWithDates = ({ dates }) => {
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const handleDateChange = (index) => {
    setSelectedDateIndex(index);
    flatListRef.current.scrollToIndex({ index: index, animated: true });
  };
  const renderItem = ({ item, index }) => {
    const translateY = scrollY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [-ITEM_HEIGHT, 0, ITEM_HEIGHT],
    });
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0.8, 1, 0.8],
    });
    const fontWeight = index === selectedDateIndex ? 'bold' : 'normal';
    const color = index === selectedDateIndex ? 'black' : 'gray';
    return (
      <Animated.View
        style={{
          ...styles.dateItem,
          transform: [{ translateY }, { scale }],
        }}
      >
        <TouchableOpacity onPress={() => handleDateChange(index)}>
          <Text style={{ ...styles.dateText, color, fontWeight }}>{item}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setSelectedDateIndex(index);
    scrollY.setValue(offsetY);
  };
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={dates}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate={'fast'}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        bounces={false}
        onScroll={handleScroll}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    marginBottom: 50,
    overflow: 'hidden',
  },
  contentContainer: {
    paddingTop: ITEM_HEIGHT * 2,
    paddingBottom: ITEM_HEIGHT * 2,
  },
  dateItem: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
  },
});
export default VerticalSliderWithDates;