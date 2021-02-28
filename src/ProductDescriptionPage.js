import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
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
} from 'react-native';

import { Icon, Overlay, Card } from 'react-native-elements';
import 'react-native-gesture-handler';
import Toast, { BaseToast } from 'react-native-toast-message';
import { WebView } from 'react-native-webview';
import { Rating } from 'react-native-ratings';

class ProductDescriptionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      webViewUrl: '',
      sku: this.props.route.params.sku,
      imageUrl: this.props.route.params.imageUrl,
      key_url: this.props.route.params.url,
      productData: {},
    };
  }

  fetchProducts = async sku => {
    await fetch(
      `https://mcstaging.nahdionline.com/en/rest/V1/products/${sku}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + '5q3e4j4y8uue11kkax14m3axz4ugj1x1',
        },
      }
    )
      .then(response => response.json())
      .then(jsonResponse => {
        if (!this.state.productData.name) {
          let customAttributes = {
            description: '',
            image: '',
            url_key: '',
            gift_wrapping_available: '',
            manufacturer: '',
            is_returnable: '',
            dc_only: '',
            safety_stock_level: '',
            alternative_product: '',
            relatedProducts: [],
            nahdi_rewards_factor: 0,
            updated_at: '',
          };

          jsonResponse.custom_attributes.filter(function(item) {
            if (item.attribute_code === 'description')
              customAttributes.description = item.value;

            if (item.attribute_code === 'image')
              customAttributes.image = item.value;

            if (item.attribute_code === 'url_key')
              customAttributes.url_key = item.value;

            if (item.attribute_code === 'gift_wrapping_available')
              customAttributes.gift_wrapping_available = item.value;

            if (item.attribute_code === 'manufacturer')
              customAttributes.manufacturer = item.value;

            if (item.attribute_code === 'is_returnable')
              customAttributes.is_returnable = item.value;

            if (item.attribute_code === 'dc_only')
              customAttributes.dc_only = item.value;

            if (item.attribute_code === 'safety_stock_level')
              customAttributes.safety_stock_level = item.value;

            if (item.attribute_code === 'alternative_product')
              customAttributes.alternative_product = item.value;

            if (item.attribute_code === 'nahdi_rewards_factor')
              customAttributes.nahdi_rewards_factor = item.value;
            return;
          });

          let arAlternativeProducts = customAttributes.alternative_product.split(
            ','
          );

          //Limiting related products to only two
          if (arAlternativeProducts.length > 2)
            arAlternativeProducts = arAlternativeProducts.slice(0, 2);

          if (arAlternativeProducts[0] === '') arAlternativeProducts = null;

          if (arAlternativeProducts !== null) {
            if (arAlternativeProducts[1] === '')
              arAlternativeProducts = arAlternativeProducts.slice(0, 1);

            console.log(`Related ${jsonResponse.sku} SKUs`);
            console.log(arAlternativeProducts);

            for (let i = 0; i < arAlternativeProducts.length; i++) {
              fetch(
                `https://mcstaging.nahdionline.com/en/rest/V1/products/${arAlternativeProducts[i]}`,
                {
                  headers: {
                    Accept: 'application/json',
                    Authorization:
                      'Bearer ' + '5q3e4j4y8uue11kkax14m3axz4ugj1x1',
                  },
                }
              )
                .then(response => response.json())
                .then(jsonRelatedResponse => {
                  let customAlternativeAttributes = {
                    name: '',
                    price: '',
                    image: '',
                    url_key: '',
                  };

                  jsonRelatedResponse.custom_attributes.filter(function(item) {
                    if (item.attribute_code === 'image')
                      customAlternativeAttributes.image = item.value;

                    if (item.attribute_code === 'url_key')
                      customAlternativeAttributes.url_key = item.value;
                    return;
                  });

                  customAttributes.relatedProducts.push({
                    name: jsonRelatedResponse.name,
                    price: jsonRelatedResponse.price,
                    image: customAlternativeAttributes.image,
                    url_key: customAlternativeAttributes.url_key,
                  });

                  this.setState({
                    productData: {
                      name: jsonResponse.name,
                      price: jsonResponse.price,
                      sku: jsonResponse.sku,
                      status: jsonResponse.status,
                      updated_at: jsonResponse.updated_at,
                      description: customAttributes.description,
                      image: customAttributes.image,
                      url_key: customAttributes.url_key,
                      gift_wrapping_available:
                        customAttributes.gift_wrapping_available,
                      manufacturer: customAttributes.manufacturer,
                      is_returnable: customAttributes.is_returnable,
                      dc_only: customAttributes.dc_only,
                      safety_stock_level: customAttributes.safety_stock_level,
                      alternative_product: customAttributes.alternative_product,
                      relatedProducts: customAttributes.relatedProducts,
                      nahdi_rewards_factor:
                        customAttributes.nahdi_rewards_factor,
                    },
                  });
                });
            }
          } else {
            this.setState({
              productData: {
                name: jsonResponse.name,
                price: jsonResponse.price,
                sku: jsonResponse.sku,
                status: jsonResponse.status,
                updated_at: jsonResponse.updated_at,
                description: customAttributes.description,
                image: customAttributes.image,
                url_key: customAttributes.url_key,
                gift_wrapping_available:
                  customAttributes.gift_wrapping_available,
                manufacturer: customAttributes.manufacturer,
                is_returnable: customAttributes.is_returnable,
                dc_only: customAttributes.dc_only,
                safety_stock_level: customAttributes.safety_stock_level,
                alternative_product: customAttributes.alternative_product,
                relatedProducts: customAttributes.relatedProducts,
                nahdi_rewards_factor: customAttributes.nahdi_rewards_factor,
              },
            });
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    this.fetchProducts(this.state.sku);

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
    console.log(productData);

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
          <TouchableOpacity style={{ padding: 20 }}>
            <Image
              source={{
                uri: this.state.imageUrl,
              }}
              resizeMode={'contain'}
              style={{ width: 256, height: 256 }}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ width: 50, height: 50 }}>
              <Icon
                reverse
                name="truck"
                type="font-awesome"
                color="#278585"
                size={16}
                onPress={() => {
                  Toast.show({
                    text1: 'Same Day Delivery',
                    text2: 'Order now and get it today 👌.',
                    // type: 'info',
                    position: 'bottom',
                    bottomOffset: 60,
                  });
                }}
              />
            </View>
            <View style={{ width: 50, height: 50 }}>
              <Icon
                reverse
                name="shopping-bag"
                type="font-awesome"
                color="#278585"
                size={16}
                onPress={() => {
                  Toast.show({
                    text1: 'Available for Store Pickup',
                    text2: 'Order now and pickup from any store anytime 👍.',
                    // type: 'info',
                    position: 'bottom',
                    bottomOffset: 60,
                  });
                }}
              />
            </View>
            <View style={{ width: 50, height: 50 }}>
              <Icon
                reverse
                name="check-square"
                type="font-awesome"
                color="#278585"
                size={16}
                onPress={() => {
                  Toast.show({
                    text1: 'Stock Availability',
                    text2: `There are ${1} units of this product in-stock.`,
                    position: 'bottom',
                    bottomOffset: 60,
                  });
                }}
              />
            </View>
            <View style={{ width: 50, height: 50 }}>
              <Icon
                reverse
                name="gift"
                type="font-awesome"
                color="#278585"
                size={16}
                onPress={() => {
                  Toast.show({
                    text1: 'Nudeek Rewards',
                    text2: 'Order now and receive 258 Nuhdeek points 🤩.',
                    position: 'bottom',
                    bottomOffset: 60,
                  });
                }}
              />
            </View>
            <View style={{ width: 50, height: 50, marginHorizontal: 7 }}>
              <TouchableOpacity
                onPress={() => {
                  setWebViewUrl(this.state.key_url);
                  toggleOverlay();
                }}
              >
                <Image
                  source={require('../assets/images/icon.png')}
                  style={{ width: 30, height: 30, marginTop: 10 }}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                textAlign: 'center',
                color: '#278585',
                fontSize: 18,
                paddingVertical: 15,
              }}
            >
              {productData.name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                color: '#90A4AE',
              }}
            >
              {productData.price} SAR
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
              Rating
            </Text>
            <View>
              <Rating
                type="custom"
                ratingColor="#278585"
                ratingBackgroundColor="#fff"
                ratingCount={5}
                imageSize={40}
                showRating
                onFinishRating={() => {
                  Toast.show({
                    text1: 'Pseudo Rating Received',
                    text2: 'Thank you for rating this product 😘.',
                    position: 'bottom',
                    bottomOffset: 60,
                  });
                }}
              />
            </View>
            <Text
              style={{
                textAlign: 'justify',
                color: '#278585',
                fontSize: 20,
                paddingVertical: 5,
              }}
            >
              Review
            </Text>
            <TouchableOpacity
              onPress={() => {
                Toast.show({
                  text1: 'Review Not Available',
                  text2: 'This feature is not currently implemented.',
                  position: 'bottom',
                  bottomOffset: 60,
                });
              }}
            >
              <TextInput
                editable={false}
                placeholder={'Write a review...'}
                style={{
                  borderWidth: 1,
                  borderColor: '#278585',
                  lineHeight: 40,
                  padding: 20,
                  width: '95%',
                }}
              />
            </TouchableOpacity>
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
            {productData.relatedProducts.length === 2 ? (
              <View>
                <View>
                  {
                    <View
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                    >
                      <TouchableOpacity
                        style={{ width: 180 }}
                        onPress={() => {
                          setWebViewUrl(`https://mcstaging.nahdionline.com/en/${productData.relatedProducts[0].url_key}`);
                          toggleOverlay();
                        }}
                      >
                        <Card>
                          <Card.Title
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              color: '#278585',
                              fontSize: 10,
                            }}
                          >
                            {productData.relatedProducts[0].name}
                          </Card.Title>
                          <Card.Divider />
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              source={{
                                uri:
                                  `https://nahdionline.com/media/catalog/product${productData.relatedProducts[0].image}`,
                              }}
                              style={{ width: 92, height: 92 }}
                              resizeMode={'contain'}
                            />
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 12,
                                paddingVertical: 15,
                                color: '#90A4AE',
                              }}
                            >
                              {productData.relatedProducts[0].price} SAR
                            </Text>
                          </View>
                        </Card>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ width: 180 }}
                        onPress={() => {
                          setWebViewUrl(`https://mcstaging.nahdionline.com/en/${productData.relatedProducts[1].url_key}`);
                          toggleOverlay();
                        }}
                      >
                        <Card>
                          <Card.Title
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={{
                              color: '#278585',
                              fontSize: 10,
                            }}
                          >
                            {productData.relatedProducts[1].name}
                          </Card.Title>
                          <Card.Divider />
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              source={{
                                uri:
                                `https://nahdionline.com/media/catalog/product${productData.relatedProducts[1].image}`,
                              }}
                              style={{ width: 92, height: 92 }}
                              resizeMode={'contain'}
                            />
                            <Text
                              style={{
                                textAlign: 'center',
                                fontSize: 12,
                                paddingVertical: 15,
                                color: '#90A4AE',
                              }}
                            >
                              {productData.relatedProducts[1].price} SAR
                            </Text>
                          </View>
                        </Card>
                      </TouchableOpacity>
                    </View>
                  }
                </View>
              </View>
            ) : productData.relatedProducts.length === 1 ? (
              <TouchableOpacity
                style={{ width: 180 }}
                onPress={() => {
                  setWebViewUrl(`https://mcstaging.nahdionline.com/en/${productData.relatedProducts[0].url_key}`);
                  toggleOverlay();
                }}
              >
                <Card>
                  <Card.Title
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      color: '#278585',
                      fontSize: 10,
                    }}
                  >
                    {productData.relatedProducts[0].name}
                  </Card.Title>
                  <Card.Divider />
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image
                      source={{
                        uri:
                        `https://nahdionline.com/media/catalog/product${productData.relatedProducts[0].image}`,
                      }}
                      style={{ width: 92, height: 92 }}
                      resizeMode={'contain'}
                    />
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        paddingVertical: 15,
                        color: '#90A4AE',
                      }}
                    >
                      {productData.relatedProducts[0].price} SAR
                    </Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ) : (
              <Text
                style={{
                  textAlign: 'justify',
                  color: '#90A4AE',
                  fontSize: 12,
                  paddingVertical: 20,
                  paddingHorizontal: 5
                }}
              >
                No related products found.
              </Text>
            )}
          </View>
          <View style={{ paddingBottom: 30 }} />
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: 50,
            paddingTop: 25,
            width: '100%',
            backgroundColor: '#fff',
          }}
        >
          <View style={{ width: 50, height: 50, marginTop: 10 }}>
            <Icon
              name="minus"
              type="font-awesome"
              color="#278585"
              size={20}
              // onPress={() => setQuantity(quantity - 1)}
            />
          </View>
          <View style={{ width: 50, height: 50 }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                color: '#278585',
                fontWeight: 'bold',
                borderColor: '#90A4AE',
                borderWidth: 1,
              }}
            >
              1
            </Text>
          </View>
          <View style={{ width: 50, height: 50, marginTop: 10 }}>
            <Icon
              name="plus"
              type="font-awesome"
              color="#278585"
              size={20}
              // onPress={() => setQuantity(quantity + 1)}
            />
          </View>
        </View>
        <TouchableHighlight
          style={{ width: '100%', backgroundColor: '#278585' }}
          underlayColor="#90A4AE"
          activeOpacity={0.6}
        >
          <View style={{ padding: 5 }}>
            <Icon
              name="cart-plus"
              type="font-awesome"
              color="#fff"
              size={30}
              onPress={() => console.log('clicked ')}
            />
          </View>
        </TouchableHighlight>
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

export default ProductDescriptionPage;
