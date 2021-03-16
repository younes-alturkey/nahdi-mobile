import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const CheckOutScreen = () => {
  return <Text>Checkout plep!</Text>;
};

// Wrap and export
export default function(props) {
  const navigation = useNavigation();

  return <CheckOutScreen {...props} navigation={navigation} />;
}
