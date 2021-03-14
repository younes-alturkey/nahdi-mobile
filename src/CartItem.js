import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Icon, Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

class CartItem extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { navigation, product } = this.props;
    console.log(product.imageUrl);

    return (
      <Card style={styles.card}>
        <Card.Title
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ color: '#278585' }}
        >
          {product.name}
        </Card.Title>
        <View style={{ flexDirection: 'row' }}>
          <Image
            source={{ uri: product.imageUrl }}
            style={{ width: 80, height: 80 }}
            resi
            zeMode={'contain'}
          />
          <Text style={{ paddingLeft: 10, paddingTop: 30, color: '#90A4AE' }}>
            x {product.qty}
          </Text>

          <Text style={{ paddingTop: 30, paddingLeft: 50, color: '#90A4AE' }}>
            {product.price.length < 9 ? ' ' + product.price : product.price}
          </Text>
          <View style={{ paddingTop: 20, paddingLeft: 85 }}>
            <TouchableOpacity
              onPress={() => {
                product.sku = null;
                this.props.updateCart(product.qty, product.name, product.price);
                navigation.navigate('CartView');
              }}
            >
              <Icon
                size={30}
                name="trash"
                type="font-awesome"
                color="#FF0000"
              />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 10,
  },
});

// Wrap and export
export default function(props) {
  return <CartItem {...props} />;
}
