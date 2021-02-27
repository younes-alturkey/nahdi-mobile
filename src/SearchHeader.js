import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { Icon, Overlay } from "react-native-elements";
import Toast from "react-native-toast-message";
import { useNavigation } from '@react-navigation/native';
import algoliasearch from 'algoliasearch/reactnative';
import SearchBox from './SearchBox';
import InfiniteHits from './InfiniteHits';
import { InstantSearch } from 'react-instantsearch-native';

const searchClient = algoliasearch(
  'H9X4IH7M99',
  '2bbce1340a1cab2ccebe0307b1310881'
);

class SearchHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: false,
      keywords: ''
    };
  }

  root = {
    Root: View,
    props: {
      style: {
        flex: 1,
      },
    },
  };
  render() {
    // Get it from props
    const { navigation } = this.props;

    const toggleOverlay = () => {
      this.setState({ visible: !this.state.visible })
    };

    const setKeywords = (keywords) => {
      this.setState({ keywords: keywords })
    };

    return (
      <View>
        <View style={styles.searchSection}>
          <Icon style={styles.searchIcon, {paddingHorizontal: 0}} name="search" type="font-awesome" color="#90A4AE" />
          <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('ProductListPage')}>
            <TextInput
              style={styles.input}
              placeholder="What are you looking for?"
              value={this.state.keywords}
              onChangeText={() => navigation.navigate('ProductListPage')}
              onFocus={() => setKeywords('')}
              onBlur={() => setKeywords('')}
              editable={false}
            />
          </TouchableOpacity>
          <Icon style={styles.searchIcon} name="barcode-scan" type="material-community" color="#90A4AE" onPress={() => {
            Toast.show({
              text1: "Barcode Scanner",
              text2: "This feature is not currently implemented.",
              visibilityTime: 1000,
              position: "bottom",
              bottomOffset: 60,
            });
          }} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    width: 270,
    borderRadius: 20
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
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

// Wrap and export
export default function (props) {
  const navigation = useNavigation();

  return <SearchHeader {...props} navigation={navigation} />;
}