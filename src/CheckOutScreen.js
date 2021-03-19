import React, { useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import CountDown from 'react-native-countdown-component';
import Toast from 'react-native-toast-message';
import { TouchableOpacity } from 'react-native';

export const CheckOutScreen = props => {
  const [orderDetails, setOrderDetails] = useState({});

  const { navigation } = props;

  const { products } = props.cart;

  const clearCart = () => {
    props.cart.qty = 0;
    props.cart.indices = 0;
    props.cart.total = 0;
    props.cart.products = [];
  };

  const postProducts = async () => {
    await axios
      .post(`https://mcstaging.nahdionline.com/en/rest/all/V1/guest-carts`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then(response => {
        const cartId = response.data;
        console.log('cartId: ', cartId);
        for (let i = 0; i < products.length; i++) {
          axios
            .post(
              `https://mcstaging.nahdionline.com/en/rest/V1/guest-carts/${cartId}/items`,
              {
                cartItem: {
                  quote_id: cartId,
                  qty: products[i].qty,
                  sku: products[i].sku,
                },
              }
            )
            .then(productRes => {
              return;
            })
            .catch(error => {
              Toast.show({
                text1: 'Denied',
                text2: 'Could not post to Magento cart',
                visibilityTime: 1000,
                position: 'bottom',
                bottomOffset: 60,
              });
              console.log(error);
            });
        }

        setTimeout(() => {
          axios
            .get(
              `https://mcstaging.nahdionline.com/en/rest/all/V1/guest-carts/${cartId}/totals`
            )
            .then(totalsRes => {
              const totals = {
                grand_total: totalsRes.data.grand_total,
                base_grand_total: totalsRes.data.base_grand_total,
                tax_amount: totalsRes.data.tax_amount,
                nuhdeek: totalsRes.data.total_segments[5].value,
              };
              setOrderDetails(totals);
              return;
            })
            .catch(err => {
              Toast.show({
                text1: 'Denied',
                text2: 'Could not get Magento cart total',
                visibilityTime: 1000,
                position: 'bottom',
                bottomOffset: 60,
              });
              console.log(err);
            });
        }, 700);
        return;
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (!orderDetails.grand_total) {
    postProducts();
    setTimeout(() => {
      Toast.show({
        text1: 'Guaranteed',
        text2: 'Place your order now and delivery will be on time 😉.',
        visibilityTime: 2000,
        position: 'bottom',
        bottomOffset: 60,
      });
    }, 4000);
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#278585" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: '#278585',
          paddingVertical: 15,
          paddingLeft: 10,
          fontWeight: 'bold',
        }}
      >
        Guaranteed On-Time Delivery
      </Text>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity>
          <Image
            style={{ width: 150, height: 150 }}
            resizeMode={'contain'}
            source={require('../assets/images/guaranteed-delivery.png')}
          />
        </TouchableOpacity>
        <CountDown
          digitStyle={{ backgroundColor: '#fff' }}
          digitTxtStyle={{
            color: '#278585',
            paddingTop: 20,
          }}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{ h: 'hours', m: 'minutes', s: 'seconds' }}
          until={9000}
          size={20}
          showSeparator
          separatorStyle={{}}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          color: '#278585',
          paddingBottom: 10,
          paddingLeft: 10,
          fontWeight: 'bold',
        }}
      >
        Shipping Address
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={{ paddingVertical: 8, width: '90%' }}>
          <TextInput
            style={{
              color: '#90A4AE',
              fontSize: 16,
              padding: 5,
              borderColor: '#278585',
              fontStyle: 'italic',
              borderWidth: 1,
            }}
            value="Younes Alturkey"
            editable={false}
          />
        </View>
        <View style={{ paddingVertical: 8, width: '90%' }}>
          <TextInput
            style={{
              color: '#90A4AE',
              fontSize: 16,
              padding: 5,
              borderColor: '#278585',
              fontStyle: 'italic',
              borderWidth: 1,
            }}
            value="8674 Abdulrauf Albahrani st"
            editable={false}
          />
        </View>
        <View style={{ paddingVertical: 8, width: '90%' }}>
          <TextInput
            style={{
              color: '#90A4AE',
              fontSize: 16,
              padding: 5,
              borderColor: '#278585',
              fontStyle: 'italic',
              borderWidth: 1,
            }}
            value="31245"
            editable={false}
          />
        </View>
        <View style={{ paddingVertical: 8, width: '90%' }}>
          <TextInput
            style={{
              color: '#90A4AE',
              fontSize: 16,
              padding: 5,
              borderColor: '#278585',
              fontStyle: 'italic',
              borderWidth: 1,
            }}
            value="+966 53 865 4514"
            editable={false}
          />
        </View>
      </View>
      <Text
        style={{
          fontSize: 20,
          color: '#278585',
          paddingTop: 10,
          paddingLeft: 10,
          fontWeight: 'bold',
        }}
      >
        Order Summary
      </Text>
      <View style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
        <Text style={{ fontSize: 18, paddingHorizontal: 5, color: '#90A4AE' }}>
          Sub Total: {orderDetails.grand_total}{' '}
          <Text
            style={{ fontSize: 12, paddingHorizontal: 5, color: '#90A4AE' }}
          >
            SAR
          </Text>
        </Text>
        <Text style={{ fontSize: 18, paddingHorizontal: 5, color: '#90A4AE' }}>
          VAT {'(15%)'}: {orderDetails.tax_amount}{' '}
          <Text
            style={{ fontSize: 12, paddingHorizontal: 5, color: '#90A4AE' }}
          >
            SAR
          </Text>
        </Text>
        <Text style={{ fontSize: 18, paddingHorizontal: 5, color: '#90A4AE' }}>
          Nuhdeek Rewards: {orderDetails.nuhdeek}{' '}
          <Text
            style={{ fontSize: 12, paddingHorizontal: 5, color: '#90A4AE' }}
          >
            pts
          </Text>
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingHorizontal: 5,
            color: '#278585',
            fontWeight: 'bold',
          }}
        >
          Total: {orderDetails.base_grand_total}{' '}
          <Text
            style={{ fontSize: 14, paddingHorizontal: 5, color: '#278585' }}
          >
            SAR
          </Text>
        </Text>
      </View>
      <TouchableHighlight
        style={{
          width: '100%',
          height: 50,
          backgroundColor: '#278585',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
        }}
        underlayColor="#90A4AE"
        activeOpacity={0.6}
        onPress={() => {
          clearCart();
          navigation.navigate('OrderPlaced');
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Icon name="check" type="font-awesome" color="#fff" size={30} />
          <Text
            style={{
              color: '#fff',
              fontSize: 22,
              fontWeight: 'bold',
              paddingLeft: 15,
            }}
          >
            Place Order
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Wrap and export
export default function(props) {
  const navigation = useNavigation();

  return <CheckOutScreen {...props} navigation={navigation} />;
}
