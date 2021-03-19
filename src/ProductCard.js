import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { Icon, Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

class ProductCard extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
  }

  setQty = val => {
    this.props.cart.qty = this.props.cart.qty + val;
    this.forceUpdate();
  };

  incrementQuantity() {
    this.setState({
      quantity: this.state.quantity + 1,
    });
  }

  decrementQuantity() {
    if (this.state.quantity <= 1) this.resetQuantity();
    else
      this.setState({
        quantity: this.state.quantity - 1,
      });
  }

  resetQuantity() {
    this.setState({
      quantity: 1,
    });
  }

  render() {
    const { navigation } = this.props;

    const item = this.props.item;
    const imageUrl =
      'https://' + item.image_url.substring(2, item.image_url.length);
    const url = item.url;
    const isNew = item.redbox_pl ? true : false;

    return (
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate('ProductDescriptionPage', {
            sku: item.sku,
            name: item.name,
            imageUrl: imageUrl,
            url: url,
            manufacturer: item.manufacturer,
            cart: this.props.cart,
          });
        }}
      >
        <Card containerStyle={styles.card}>
          <Card.Image
            source={{
              uri: imageUrl,
            }}
            resizeMode={'contain'}
          />
          <Text
            style={{
              fontSize: 14,
              paddingTop: 15,
              textAlign: 'center',
              color: '#278585',
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              paddingTop: 9,
              color: '#90A4AE',
              fontSize: 16,
            }}
          >
            SAR{'  '}
            <Text
              style={{
                textAlign: 'center',
                paddingTop: 15,
                color: '#278585',
                fontSize: 18,
              }}
            >
              {item.price.SAR.default}
            </Text>
          </Text>
          <View style={{ flex: 1, flexDirection: 'row', marginTop: 14 }}>
            <View style={{ width: 50, height: 50, marginTop: 3 }}>
              <Icon
                name="minus"
                type="font-awesome"
                color="#278585"
                size={23}
                onPress={this.decrementQuantity.bind(this)}
              />
            </View>
            <View style={{ width: 50, height: 50 }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#278585',
                  fontWeight: 'bold',
                  borderColor: '#278585',
                  borderWidth: 1,
                }}
              >
                {this.state.quantity}
              </Text>
            </View>
            <View style={{ width: 50, height: 50, marginTop: 3 }}>
              <Icon
                name="plus"
                type="font-awesome"
                color="#278585"
                size={23}
                onPress={this.incrementQuantity.bind(this)}
              />
            </View>
          </View>
          <TouchableHighlight
            underlayColor="#90A4AE"
            activeOpacity={0.6}
            onPress={() => {
              this.setQty(this.state.quantity);
              this.props.cart.products.push({
                sku: item.sku,
                name: item.name,
                price: item.price.SAR.default_formated,
                imageUrl: imageUrl,
                url: url,
                qty: this.state.quantity,
                index: this.props.cart.indices++,
              });
              this.props.cart.total =
                this.props.cart.total +
                parseFloat(
                  item.price.SAR.default_formated
                    .replace(/[^0-9, ., ]/g, '')
                    .trim()
                ) *
                  this.state.quantity;
              this.resetQuantity();
              Toast.show({
                text1: 'Success',
                text2: 'Added to your cart 🥰',
                visibilityTime: 300,
                position: 'bottom',
                bottomOffset: 60,
              });
              navigation.navigate('ProductListPage');
            }}
            style={{ backgroundColor: '#278585' }}
          >
            <View
              style={{
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Icon
                name="cart-plus"
                type="font-awesome"
                color="#fff"
                size={25}
              />
              {/* <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>
                Add to Cart
              </Text> */}
            </View>
          </TouchableHighlight>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    width: (Dimensions.get('window').width - 4 * 10) / 2,
    margin: 10,
  },
});

// Wrap and export
export default function(props) {
  const navigation = useNavigation();

  return <ProductCard {...props} navigation={navigation} />;
}
