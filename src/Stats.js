import React from 'react';
import { Text } from 'react-native';
import { connectStats } from 'react-instantsearch-native';

const Stats = ({ nbHits, processingTimeMS }) => {
  return (
    <Text style={{ textAlign: 'center', padding: 10, color: '#000' }}>
      <Text style={{ fontWeight: 'bold', color: '#000' }}>{nbHits}</Text>{' '}
      results found in{' '}
      <Text style={{ fontWeight: 'bold', color: '#000' }}>
        {processingTimeMS / (1000.0).toFixed(4)}
      </Text>{' '}
      sounds
    </Text>
  );
};

export default connectStats(Stats);
