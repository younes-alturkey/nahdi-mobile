import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-native';

const SearchBox = ({ currentRefinement, refine }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={value => {
          refine(value);
          setTimeout(() => {
            Keyboard.dismiss();
          }, 5000);
        }}
        value={currentRefinement}
        placeholder="What are you looking for?"
        underlineColorAndroid={'#278585'}
        autoFocus={true}
      />
    </View>
  );
};

SearchBox.propTypes = {
  currentRefinement: PropTypes.string.isRequired,
  refine: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '90%',
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderColor: '#278585',
    color: '#278585',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});

export default connectSearchBox(SearchBox);
