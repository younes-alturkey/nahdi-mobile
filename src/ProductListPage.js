import React from 'react';
import { Button } from 'react-native';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import algoliasearch from 'algoliasearch/reactnative';
import { InstantSearch, Configure, SortBy } from 'react-instantsearch-native';
import SearchBox from './SearchBox';
import InfiniteHits from './InfiniteHits';
import Stats from './Stats';

const searchClient = algoliasearch(
  'H9X4IH7M99',
  '2bbce1340a1cab2ccebe0307b1310881'
);

class ProductListPage extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
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
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <InstantSearch
            searchClient={searchClient}
            indexName="magento2_staging_ksa_en_products"
            root={this.root}
          >
            <SearchBox />
            <Stats />
            <Configure hitsPerPage={6} />
            <InfiniteHits cart={this.props.cart} />
          </InstantSearch>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
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

export default ProductListPage;
