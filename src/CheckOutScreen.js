import React from 'react';

export const CheckOutScreen = () => {
  return <Text>Checkout plep!</Text>;
};

// Wrap and export
export default function(props) {
  const navigation = useNavigation();

  return <CheckOutScreen {...props} navigation={navigation} />;
}
