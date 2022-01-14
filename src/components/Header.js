import React from "react"
import { View, Text, Touchable, TouchableOpacity } from "react-native"
import firebase from "firebase"
import Entypo from "react-native-vector-icons/Entypo"

const Header = ({ title, showLogout }) => {

    const logOutUser = () => {
        firebase.auth().signOut()
    }

    return (
        <View style={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderBottomColor: "white"
        }}>
            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{title}</Text>
            {showLogout &&
                <View style={{ position: "absolute", right: 10 }}>
                    <TouchableOpacity onPress={logOutUser}>
                        <Entypo name="log-out" size={24} color={"white"} />
                    </TouchableOpacity>
                </View>}
        </View>
    )
}

export default Header
