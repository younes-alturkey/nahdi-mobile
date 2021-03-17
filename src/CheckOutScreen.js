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
import axios from 'axios';
import CountDown from 'react-native-countdown-component';
import Toast from 'react-native-toast-message';

export const CheckOutScreen = props => {
  const [grandTotal, setGrandTotal] = useState(0);
  const [baseGrandTotal, setBaseGrandTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [nuhdeekPoints, setNuhdeekPoints] = useState(0);

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
              console.log(i, ': ', productRes.data);
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

        axios
          .get(
            `https://mcstaging.nahdionline.com/en/rest/all/V1/guest-carts/${cartId}/totals`
          )
          .then(totalsRes => {
            setGrandTotal(totalsRes.data.grand_total);
            setBaseGrandTotal(totalsRes.data.base_grand_total);
            setTaxAmount(totalsRes.data.tax_amount);
            setNuhdeekPoints(totalsRes.data.total_segments[5].value);
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
        return;
      })
      .catch(error => {
        Toast.show({
          text1: 'Denied',
          text2: 'Could not create a cart Id',
          visibilityTime: 1000,
          position: 'bottom',
          bottomOffset: 60,
        });
        console.log(error);
      });
  };

  if (grandTotal === 0) postProducts();

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
        <Image
          style={{ width: 150, height: 150 }}
          resizeMode={'contain'}
          source={require('../assets/images/guaranteed-delivery.png')}
        />
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
          Sub Total: {grandTotal === 0 ? 'calculating...' : 'SAR ' + grandTotal}
        </Text>
        <Text style={{ fontSize: 18, paddingHorizontal: 5, color: '#90A4AE' }}>
          VAT {'(15%)'}:{' '}
          {taxAmount === 0 ? 'calculating...' : 'SAR ' + taxAmount}
        </Text>
        <Text style={{ fontSize: 18, paddingHorizontal: 5, color: '#90A4AE' }}>
          Nuhdeek Points:{' '}
          {nuhdeekPoints === 0
            ? 'calculating...'
            : nuhdeekPoints === null
            ? 0
            : nuhdeekPoints}
        </Text>
        <Text
          style={{
            fontSize: 20,
            paddingHorizontal: 5,
            color: '#278585',
            fontWeight: 'bold',
          }}
        >
          Total:{' '}
          {baseGrandTotal === 0 ? 'calculating...' : 'SAR ' + baseGrandTotal}
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
          <Text
            style={{
              color: '#fff',
              fontSize: 22,
              fontWeight: 'bold',
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
