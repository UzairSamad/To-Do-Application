import { StyleSheet } from "react-native"
import { appBackground } from "../constants/colors"

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appBackground
    },
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
})

export default globalStyles