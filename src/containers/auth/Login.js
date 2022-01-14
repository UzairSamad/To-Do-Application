import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../../components/Header";
import { appBackground } from "../../constants/colors";
import { loginUser } from "../../constants/firebase";

const Login = ({ navigation }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    })
    const [loading, setLoading] = useState(false)

    const handleLogin = () => {
        const { email, password } = inputs
        setLoading(true)
        loginUser(email, password)
        setTimeout(function () {
            setLoading(false)
        }, 2000)
    };


    const renderButton = () => {
        if (loading) {
            return <ActivityIndicator size="large" color={"white"} />
        }
        else {
            return (
                <TouchableOpacity
                    onPress={handleLogin}
                    style={{ backgroundColor: "white", paddingVertical: 15, borderRadius: 5, justifyContent: "center", alignItems: "center" }}>
                    <Text style={{
                        fontSize: 16,
                        color: appBackground,
                        fontWeight: "bold"
                    }}>Login</Text>
                </TouchableOpacity>
            )
        }
    }

    return (
        <View style={styles.container} behavior="padding"
        >
            <Header title="Login" showLogout={false} />
            <View style={styles.innerContainer}>
                <Text style={styles.labelStyle}>E-mail</Text>
                <TextInput
                    textContentType="emailAddress"
                    style={{
                        color: "white",
                        borderBottomColor: "white",
                        borderBottomWidth: 1,
                        paddingTop: 5,
                        paddingBottom: 5,
                        marginBottom: 30,
                    }}
                    value={inputs.email}
                    onChangeText={(text) => { setInputs({ ...inputs, email: text }) }}
                />
                <Text style={styles.labelStyle}>Password</Text>
                <TextInput
                    secureTextEntry={true}
                    style={{
                        color: "white",
                        borderBottomColor: "white",
                        borderBottomWidth: 1,
                        paddingTop: 5,
                        paddingBottom: 5,
                        marginBottom: 30,
                    }}
                    value={inputs.password}
                    onChangeText={(text) => { setInputs({ ...inputs, password: text }) }}
                />

                {renderButton()}
            </View>
        </View>
    );
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appBackground
    },
    innerContainer: {
        marginTop: 70,
        marginHorizontal: 10
    },
    labelStyle: {
        fontWeight: "700",
        marginBottom: 10,
        fontSize: 14,
        color: "white",
    },

});
