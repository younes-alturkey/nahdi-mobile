import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Keyboard, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { connectInfiniteHits } from 'react-instantsearch-native';
import { useNavigation } from '@react-navigation/native';

import ProductCard from './ProductCard';

const InfiniteHits = ({ hits, hasMore, refine }) => {

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <FlatList
        data={hits}
        keyExtractor={(item) => item.objectID}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        onEndReached={() => hasMore && refine()}
        renderItem={({ item }) => (
          <ProductCard item={item} />
        )}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      />
    </TouchableWithoutFeedback>
  )
}


InfiniteHits.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasMore: PropTypes.bool.isRequired,
  refine: PropTypes.func.isRequired,
};


const styles = StyleSheet.create({
  separator: {
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  item: {
    padding: 10,
    flexDirection: 'column',
  },
  titleText: {
    fontWeight: 'bold',
  },
  list: {
    justifyContent: "space-around",
    paddingBottom: 350,
  },
  column: {
    flexShrink: 1,
  },
});

export default connectInfiniteHits(InfiniteHits);
