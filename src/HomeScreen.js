import React from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import "react-native-gesture-handler";
import Toast, { BaseToast } from "react-native-toast-message";
import { WebView } from "react-native-webview";
import { Rating } from "react-native-ratings";
import { useNavigation } from '@react-navigation/native';

import SearchHeader from './SearchHeader';


class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { navigation } = this.props;

        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                    <Text>Home Screen</Text>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default function (props) {
    const navigation = useNavigation();

    return <HomeScreen {...props} navigation={navigation} />;
}
