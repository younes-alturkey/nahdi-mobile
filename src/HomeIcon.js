import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

class HomeIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // Get it from props
    const { navigation } = this.props;
    return (
      <TouchableOpacity
        style={{ paddingRight: 12 }}
        onPress={() => navigation.navigate('HomeScreen')}
      >
        <Image
          style={{ width: 35, height: 35 }}
          source={require('../assets/images/icon.png')}
        />
      </TouchableOpacity>
    );
  }
}

// Wrap and export
export default function(props) {
  const navigation = useNavigation();

  return <HomeIcon {...props} navigation={navigation} />;
}
