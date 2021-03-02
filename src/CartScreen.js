import React from 'react';
import { Text, StyleSheet, View, Image, FlatList, TouchableHighlight } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

class CartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Get it from props
    const { navigation, cart } = this.props;
    console.log(cart.products.length);

    if (cart.qty === 0)
      return (
        <View style={styles.container}>
          <Image
            style={{ width: 250, height: 250 }}
            resizeMode={'contain'}
            source={require('../assets/images/empty_cart.png')}
          />
        </View>
      );

    return (
      <View style={styles.container}>
        <FlatList
          data={cart.products}
          keyExtractor={(item) => item.sku}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item }) => <Text>{item.name}</Text>}
        />
        <TouchableHighlight
          style={{ width: '100%', backgroundColor: '#278585' }}
          underlayColor="#90A4AE"
          activeOpacity={0.6}
          onPress={() => {
            Toast.show({
              text1: 'Success',
              text2: `You have checkedout the order.`,
              visibilityTime: 1500,
              position: 'bottom',
              bottomOffset: 60,
            });
          }}
        >
          <View style={{ padding: 5 }}>
            <Icon name="credit-card" type="font-awesome" color="#fff" size={30} />
          </View>
        </TouchableHighlight>
      </View>
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
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    width: 270,
    borderRadius: 20,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    paddingRight: 20,
    backgroundColor: '#fff',
    color: '#278585',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
});

// Wrap and export
export default function(props) {
  const navigation = useNavigation();

  return <CartScreen {...props} navigation={navigation} />;
}
