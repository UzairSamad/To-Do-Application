import React from "react"
import { View, Text } from "react-native"
import { appBackground } from "../constants/colors"
const Loader = () => {

    return (
        <View style={{ backgroundColor: appBackground, flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{
                fontSize: 20,
                color: "white"
            }}>Welcome To To-Do Application</Text>
            <Text style={{
                fontSize: 20,
                color: "white"
            }}>Loading</Text>
        </View>
    )
}

export default Loader
