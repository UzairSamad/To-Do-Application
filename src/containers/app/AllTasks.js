import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { appBackground } from "../../constants/colors"
import { useNavigation } from "@react-navigation/native"

const AllTask = ({ data, id }) => {
    const navigation = useNavigation()
    const TaskDetail = () => {
        navigation.navigate("TaskDetail", {
            data,
            key: id
        })
    }

    const renderData = (heading, value) => {
        return (
            <View style={styles.fieldStyle}
            >
                <Text style={{
                    color: appBackground,
                    fontSize: 18,
                }}>{heading} : </Text>
                <Text style={{
                    color: appBackground
                }}>{value}</Text>
            </View>
        )
    }

    return (
        <View
            style={styles.container}
        >
            <TouchableOpacity
                onPress={TaskDetail}
            >
                {renderData("Title", data.title)}
                {renderData("Description", data.description)}
                {renderData("Priority", data.priority)}
                {renderData("Status", data.status)}

            </TouchableOpacity>

        </View>
    )
}

export default AllTask

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingVertical: 10,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 5
    },
    fieldStyle: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        paddingHorizontal: 5
    }
})