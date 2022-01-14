import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { appBackground } from "../constants/colors"

const Button = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.buttonStyles}>
            <Text style={styles.buttonText}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = {
    buttonStyles: {
        backgroundColor: "white",
        paddingVertical: 15,
    },
    buttonText: {
        fontSize: 16,
        color: appBackground,
        textAlign: "center",
        fontWeight: "bold"
    }
}

export default Button

