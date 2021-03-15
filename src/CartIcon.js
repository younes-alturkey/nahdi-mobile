import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

class CartIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  setQty = val => {
    console.log(this.props.cart.qty);
    this.props.cart.qty = this.props.cart.qty + val;
    this.forceUpdate();
  };

  render() {
    // Get it from props
    const { navigation } = this.props;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('CartView')}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          {this.props.cart.qty <= 0 ? (
            <Text></Text>
          ) : (
            <Text
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                textAlign: 'center',
                color: '#fff',
                backgroundColor: '#ff6900',
                width: 15,
                height: 15,
                borderRadius: 15 / 2,
              }}
            >
              {this.props.cart.qty}
            </Text>
          )}
          <View>
            <Icon
              name="shopping-basket"
              type="font-awesome"
              color="#fff"
              size={23}
              style={{ paddingRight: 15, paddingBottom: 20 }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

// Wrap and export
export default function(props) {
  const navigation = useNavigation();

  return <CartIcon {...props} navigation={navigation} />;
}
