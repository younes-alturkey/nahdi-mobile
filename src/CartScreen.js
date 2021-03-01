import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
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
    const { navigation } = this.props;

    return (
      <View>
        <Text>Cart Scrren</Text>
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
});

// Wrap and export
export default function(props) {
  const navigation = useNavigation();

  return <CartScreen {...props} navigation={navigation} />;
}
