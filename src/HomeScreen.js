import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import { Overlay } from 'react-native-elements';
import 'react-native-gesture-handler';
import { SliderBox } from 'react-native-image-slider-box';
import Toast, { BaseToast } from 'react-native-toast-message';
import { WebView } from 'react-native-webview';
import { Rating } from 'react-native-ratings';
import { useNavigation } from '@react-navigation/native';
import SearchHeader from './SearchHeader';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      webViewUrl: 'https://www.nahdionline.com/en/',
      images: [
        require('../assets/images/featured1.jpg'),
        require('../assets/images/featured2.jpg'),
        require('../assets/images/featured3.jpg'),
        require('../assets/images/featured4.jpg'),
        require('../assets/images/featured5.jpg'),
        require('../assets/images/featured6.jpg'),
        require('../assets/images/featured7.jpg'),
      ],
    };
  }

  toggleOverlay = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  setWebViewUrl = url => {
    this.setState({
      webViewUrl: url,
    });
  };

  render() {
    const { navigation } = this.props;

    if (this.state.visible) {
      return (
        <View>
          <Overlay
            fullScreen
            isVisible={this.state.visible}
            onBackdropPress={this.toggleOverlay}
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

    return (
      <View style={{ backgroundColor: '#fff', flex: 1 }}>
        <SliderBox
          images={this.state.images}
          resizeMethod={'resize'}
          resizeMode={'cover'}
          sliderBoxHeight={230}
          dotColor="#278585"
          inactiveDotColor="#90A4AE"
          imageLoadingColor="#278585"
          ImageComponentStyle={{
            backgroundColor: '#fff',
          }}
          autoplay
          circleLoop
          onCurrentImagePressed={() => {
            this.setWebViewUrl(
              'https://www.nahdionline.com/en/promotions/28-february-promo/pants-super-offer'
            );
            this.toggleOverlay();
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            margin: 20,
            paddingLeft: 38,
            alignContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setWebViewUrl(
                'https://nahdicareclinics.sa/index.php/ar/e-doctors-ar'
              );
              this.toggleOverlay();
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              source={require('../assets/images/E-doct.jpg')}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setWebViewUrl('https://eprescription.nahdionline.com/#/');
              this.toggleOverlay();
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              source={require('../assets/images/website-icons-2-new.jpg')}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.setWebViewUrl('https://m.nahdi.sa/LX');
              this.toggleOverlay();
            }}
          >
            <Image
              style={{ width: 100, height: 100 }}
              source={require('../assets/images/EPharm.jpg')}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.setWebViewUrl(
                'https://www.nahdionline.com/en/promotions/28-february-promo/beauty-strip-1-1'
              );
              this.toggleOverlay();
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 5,
              paddingTop: 45,
            }}
          >
            <Image
              source={require('../assets/images/PinkMobAr.jpg')}
              style={{ width: '95%', height: 180, borderRadius: 10 }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingTop: 70,
            paddingLeft: 12,
            justifyContent: 'space-evenly',
            alignItems: 'center',
            width: '95%',
          }}
        >
          <TouchableOpacity
            style={{ width: '50%' }}
            onPress={() => {
              this.setWebViewUrl(
                'https://www.nahdionline.com/en/promotions/28-february-promo/beauty-hair-care'
              );
              this.toggleOverlay();
            }}
          >
            <Image
              source={require('../assets/images/Hairdeskar.jpg')}
              style={{ width: 200, height: 220, borderRadius: 10 }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '50%' }}
            onPress={() => {
              this.setWebViewUrl(
                'https://www.nahdionline.com/en/promotions/28-february-promo/beauty-make-up-acc'
              );
              this.toggleOverlay();
            }}
          >
            <Image
              source={require('../assets/images/Makupacdeskar.jpg')}
              style={{ width: 200, height: 220, borderRadius: 10 }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            color: '#278585',
            fontWeight: 'bold',
            paddingVertical: 15,
            textAlign: 'center',
            fontSize: 10,
          }}
        >
          Nahdi React Native PoC Build: V1.0.5
        </Text>
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

export default function(props) {
  const navigation = useNavigation();

  return <HomeScreen {...props} navigation={navigation} />;
}
