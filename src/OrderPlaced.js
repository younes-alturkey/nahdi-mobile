import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Icon,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const OrderPlaced = props => {
  const { navigation } = props;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 2000);
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        style={{ width: 150, height: 150 }}
        resizeMode={'contain'}
        source={require('../assets/images/order-placed.png')}
      />
    </View>
  );
};

// Wrap and export
export default function(props) {
  const navigation = useNavigation();

  return <OrderPlaced {...props} navigation={navigation} />;
}
