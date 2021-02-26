import React from 'react';
import { StyleSheet, View, SafeAreaView, StatusBar } from 'react-native';
import algoliasearch from 'algoliasearch/reactnative';
import { InstantSearch } from 'react-instantsearch-native';
import SearchBox from './src/SearchBox';
import InfiniteHits from './src/InfiniteHits';

const searchClient = algoliasearch(
  'H9X4IH7M99',
  '2bbce1340a1cab2ccebe0307b1310881'
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

class App extends React.Component {
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
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <InstantSearch
            searchClient={searchClient}
            indexName="magento2_staging_ksa_en_products"
            root={this.root}
          >
            <SearchBox />
            <InfiniteHits />
          </InstantSearch>
        </View>
      </SafeAreaView>
    );
  }
}

export default App;
