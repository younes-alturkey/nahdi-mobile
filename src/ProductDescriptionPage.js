import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  FlatList,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  LogBox,
  ActivityIndicator,
  useEffect,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, Overlay, Card } from 'react-native-elements';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

class ProductDescriptionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      favClicked: false,
      shareClicked: false,
      quantity: 1,
      webViewUrl: '',
      sku: this.props.route.params.sku,
      manufacturer: this.props.route.params.manufacturer,
      imageUrl: this.props.route.params.imageUrl,
      key_url: this.props.route.params.url,
      productData: {},
    };
  }

  fetchProducts = async () => {
    // const authToken = await axios
    //   .post(
    //     'https://mcstaging.nahdionline.com/en/rest/V1/integration/admin/token',
    //     {
    //       username: 'younes',
    //       password: 'Nahdi@123',
    //     }
    //   )
    //   .then(tokenRes => {
    //     return tokenRes.data;
    //   })
    //   .catch(err => console.log);
    const authToken = 'oxd6s6qrkxt8vbktl0n3g1l3fwoewvna';

    const { sku, imageUrl, key_url, manufacturer } = this.state;
    console.log('Authentication Token: ', authToken);
    const productRes = await axios
      .get(`https://mcstaging.nahdionline.com/en/rest/V1/products/${sku}`, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + authToken,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log(error);
      });

    let productData = {
      name: productRes.name,
      sku: sku,
      manufacturer: manufacturer,
      price: productRes.price,
      updated_at: productRes.updated_at,
      description: '',
      image: imageUrl,
      url_key: key_url,
      store_pickup_available: '',
      manufacturerId: '',
      is_returnable: '',
      dc_only: '',
      safety_stock_level: '',
      nahdi_rewards_factor: 0,
    };

    productRes.custom_attributes.filter(function(item) {
      if (item.attribute_code === 'description')
        productData.description = item.value;

      if (item.attribute_code === 'store_pickup_available')
        productData.store_pickup_available = item.value;

      if (item.attribute_code === 'manufacturer')
        productData.manufacturerId = item.value;

      if (item.attribute_code === 'is_returnable')
        productData.is_returnable = item.value;

      if (item.attribute_code === 'dc_only') productData.dc_only = item.value;

      if (item.attribute_code === 'safety_stock_level')
        productData.safety_stock_level = item.value;

      if (item.attribute_code === 'nahdi_rewards_factor')
        productData.nahdi_rewards_factor = item.value;
      return;
    });

    this.setState({ productData: productData });
  };

  setQty = val => {
    this.props.route.params.cart.qty = this.props.route.params.cart.qty + val;
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

  componentDidMount = async () => {
    this.fetchProducts();
  };

  render() {
    const { navigation } = this.props;

    const toggleOverlay = () => {
      this.setState({
        visible: !this.state.visible,
      });
    };

    const setWebViewUrl = url => {
      this.setState({
        webViewUrl: url,
      });
    };

    if (this.state.visible) {
      return (
        <View>
          <Overlay
            fullScreen
            isVisible={this.state.visible}
            onBackdropPress={toggleOverlay}
          >
            <WebView
              source={{ uri: this.state.webViewUrl }}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#278585" />
                </View>
              )}
            />
          </Overlay>
        </View>
      );
    }

    const productData = this.state.productData;
    // console.log(productData);

    if (!productData.name)
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#278585" />
        </View>
      );

    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ScrollView
          style={{ marginHorizontal: 20 }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'flex-end',
              position: 'absolute',
              top: 0,
              left: 330,
              right: 0,
              bottom: 400,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ width: 50, height: 50 }}>
              <Icon
                name="heart"
                type="font-awesome"
                color={this.state.favClicked ? '#278585' : '#90A4AE'}
                size={25}
                onPress={() => {
                  this.setState({ favClicked: !this.state.favClicked });
                }}
              />
            </View>
            <View style={{ width: 50, height: 50 }}>
              <Icon
                name="share-alt"
                type="font-awesome"
                color={this.state.shareClicked ? '#278585' : '#90A4AE'}
                size={25}
                onPress={() => {
                  this.setState({ shareClicked: !this.state.shareClicked });
                  setWebViewUrl(this.state.key_url);
                  toggleOverlay();
                }}
              />
            </View>
            <View style={{ width: 50, height: 50, marginLeft: 18 }}></View>
          </View>
          <TouchableOpacity style={{ padding: 20 }}>
            <Image
              source={{
                uri: this.state.imageUrl,
              }}
              resizeMode={'contain'}
              style={{ width: 256, height: 400 }}
            />
          </TouchableOpacity>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                textAlign: 'justify',
                color: '#278585',
                fontSize: 12,
              }}
            >
              {productData.manufacturer}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                textAlign: 'justify',
                color: '#278585',
                fontSize: 18,
                paddingVertical: 15,
              }}
            >
              {productData.name}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                fontSize: 16,
                color: '#90A4AE',
              }}
            >
              SAR{'  '}
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: '#000',
                }}
              >
                {productData.price.toFixed(2)}
              </Text>
              {'   '}
              <Text
                style={{
                  fontSize: 8,
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid',
                  color: '#90A4AE',
                }}
              >
                SAR{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  textDecorationLine: 'line-through',
                  textDecorationStyle: 'solid',
                  color: '#90A4AE',
                }}
              >
                {productData.price.toFixed(2)}
              </Text>
              {'                        '}
              <Text
                style={{
                  fontSize: 14,
                  color: '#90A4AE',
                }}
              >
                {`(Inclusive of VAT)`}
              </Text>
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                color: '#278585',
                fontSize: 20,
                paddingVertical: 15,
              }}
            >
              {'Product Description'}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                color: '#90A4AE',
                fontSize: 12,
                lineHeight: 20,
              }}
              numberOfLines={5}
              ellipsizeMode="tail"
            >
              {productData.description
                .replace(/<[^>]*>/g, '')
                .replace(/[^a-zA-Z ]/g, '')}
              .
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                color: '#278585',
                fontSize: 20,
                paddingVertical: 15,
              }}
            >
              Product Info
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                color: '#90A4AE',
                fontSize: 12,
              }}
            >
              This product is{' '}
              {productData.is_returnable === '2'
                ? 'not returnable'
                : 'returnable'}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                color: '#90A4AE',
                fontSize: 12,
              }}
            >
              Updated on {productData.updated_at}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                color: '#90A4AE',
                fontSize: 12,
              }}
            >
              Manufacturer id {productData.manufacturer}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                color: '#90A4AE',
                fontSize: 12,
              }}
            >
              Supplied by{' '}
              {productData.dc_only === '0'
                ? 'Distribution Center only'
                : 'Distribution Center and others'}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                color: '#90A4AE',
                fontSize: 12,
              }}
            >
              SKU {productData.sku}
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                color: '#278585',
                fontSize: 20,
                paddingTop: 15,
              }}
            >
              Related Products
            </Text>
            <Text
              style={{
                textAlign: 'justify',
                color: '#90A4AE',
                fontSize: 12,
              }}
            >
              No related products found
            </Text>
          </View>
          <View style={{ paddingBottom: 30 }} />
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={{
              width: '15%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderColor: '#278585',
              borderWidth: 2,
              height: 50,
            }}
            onPress={this.incrementQuantity.bind(this)}
            onLongPress={() => this.resetQuantity()}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
                color: '#278585',
              }}
            >
              Qty
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: '#278585',
                fontWeight: 'bold',
              }}
            >
              {this.state.quantity}
            </Text>
          </TouchableOpacity>
          <TouchableHighlight
            style={{
              width: '85%',
              height: 50,
              backgroundColor: '#278585',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            underlayColor="#90A4AE"
            activeOpacity={0.6}
            onPress={() => {
              this.setQty(this.state.quantity);
              this.props.route.params.cart.products.push({
                sku: this.state.sku,
                name: productData.name,
                price: `${productData.price.toFixed(2)} SAR`,
                imageUrl: this.state.imageUrl,
                url: this.state.key_url,
                qty: this.state.quantity,
                index: this.props.route.params.cart.indices++,
              });
              this.props.route.params.cart.total =
                this.props.route.params.cart.total +
                productData.price * this.state.quantity;
              console.log(this.props.route.params.cart);
              this.resetQuantity();
              navigation.navigate('ProductDescriptionPage');
            }}
          >
            <Icon name="cart-plus" type="font-awesome" color="#fff" size={30} />
          </TouchableHighlight>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    justifyContent: 'space-around',
    paddingBottom: 350,
  },
  column: {
    flexShrink: 1,
  },
  card: {
    width: (Dimensions.get('window').width - 4 * 10) / 2,
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  iconcontainer: {
    paddingRight: 15,
  },
  searchcontainer: {
    backgroundColor: '#fff',
  },
  searchinput: {
    color: '#278585',
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

  return <ProductDescriptionPage {...props} navigation={navigation} />;
}
