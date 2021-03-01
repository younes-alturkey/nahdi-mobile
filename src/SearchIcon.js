import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

class SearchIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Get it from props
    const { navigation } = this.props;
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductListPage')}>
        <Icon
          style={{ paddingRight: 15, paddingBottom: 10 }}
          name="search"
          type="font-awesome"
          color="#fff"
        />
      </TouchableOpacity>
    );
  }
}

// Wrap and export
export default function(props) {
  const navigation = useNavigation();

  return <SearchIcon {...props} navigation={navigation} />;
}
