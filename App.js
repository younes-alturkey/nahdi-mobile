import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  LogBox,
} from "react-native";
import { Icon } from "react-native-elements";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Toast, { BaseToast } from "react-native-toast-message";
import ProductListPage from './src/ProductListPage';
import ProductDescriptionPage from './src/ProductDescriptionPage';
import HomeScreen from './src/HomeScreen';
import SearchHeader from './src/SearchHeader';

LogBox.ignoreLogs(["Setting a timer"]);

const Stack = createStackNavigator();

const toastConfig = {
  success: ({ text1, text2, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: "#278585" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        color: "#278585",
      }}
      text1={text1}
      text2={text2}
      leadingIcon={require("./assets/images/icon.png")}
    />
  ),
};

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen}
            options={{
              headerTitleStyle: {
              },
              headerStyle: {
                backgroundColor: "#278585",
              },
              headerTintColor: "#fff",
              headerRight: () => (
                <TouchableOpacity>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        textAlign: "center",
                        color: "#fff",
                        backgroundColor: "#ff6900",
                        width: 15,
                        height: 15,
                        borderRadius: 15 / 2,
                      }}
                    >
                      {1}
                    </Text>
                    <View>
                      <Icon
                        name="shopping-basket"
                        type="font-awesome"
                        color="#fff"
                        size={23}
                        style={{ paddingRight: 15, paddingBottom: 20 }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity>
                  <Image
                    style={{ width: 30, height: 30, marginLeft: 15 }}
                    source={require("./assets/images/icon.png")}
                  />
                </TouchableOpacity>
              ),
              headerTitle: () => (
                <SearchHeader />
              )
            }} />
          <Stack.Screen name="ProductListPage" component={ProductListPage}
            options={{
              title: 'Search Nahdi Products',
              headerTitleStyle: {
              },
              headerStyle: {
                backgroundColor: "#278585",
              },
              headerTintColor: "#fff",
              headerRight: () => (
                <TouchableOpacity>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <Text
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 10,
                        textAlign: "center",
                        color: "#fff",
                        backgroundColor: "#ff6900",
                        width: 15,
                        height: 15,
                        borderRadius: 15 / 2,
                      }}
                    >
                      {1}
                    </Text>
                    <View>
                      <Icon
                        name="shopping-basket"
                        type="font-awesome"
                        color="#fff"
                        size={23}
                        style={{ paddingRight: 15, paddingBottom: 20 }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              ),
            }} />

          <Stack.Screen name="ProductDescriptionPage" component={ProductDescriptionPage} options={({ route }) => ({
            title: route.params.name,
            headerTintColor: "#278585",
            headerTitleStyle: {
            },
            headerStyle: {
              backgroundColor: "#278585",
            },
            headerTintColor: "#fff",
            headerRight: () => (
              <TouchableOpacity>
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  <Text
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      textAlign: "center",
                      color: "#fff",
                      backgroundColor: "#ff6900",
                      width: 15,
                      height: 15,
                      borderRadius: 15 / 2,
                    }}
                  >
                    {1}
                  </Text>
                  <View>
                    <Icon
                      name="shopping-basket"
                      type="font-awesome"
                      color="#fff"
                      size={25}
                      style={{ paddingRight: 15, paddingBottom: 3 }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ),
          })}
          />
        </Stack.Navigator>
        <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
      </NavigationContainer>
    )
  }
}


const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    width: 280,
    borderRadius: 20
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
    color: '#424242',
  },
  safe: {
    flex: 1,
    backgroundColor: '#252b33',
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    justifyContent: "space-around",
    paddingBottom: 350,
  },
  column: {
    flexShrink: 1,
  },
  card: {
    width: (Dimensions.get("window").width - 4 * 10) / 2,
    margin: 10,
  },
  text: {
    fontSize: 18,
    color: "#fff",
  },
  iconcontainer: {
    paddingRight: 15,
  },
  searchcontainer: {
    backgroundColor: "#fff",
  },
  searchinput: {
    color: "#278585",
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
