import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export const OrderPlaced = props => {
  const { navigation } = props;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 3000);
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
        source={require('../assets/images/order-placed.gif')}
      />
      <Text
        style={{
          paddingVertical: 12,
          fontSize: 20,
          color: '#278585',
          fontWeight: 'bold',
        }}
      >
        There for every beat.
      </Text>
    </View>
  );
};

// Wrap and export
export default function(props) {
  const navigation = useNavigation();

  return <OrderPlaced {...props} navigation={navigation} />;
}
