import React, { useState } from "react"
import { View, ScrollView, Image, ToastAndroid, TextInput, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from "react-native"
import Button from "../../components/Button"
import Header from "../../components/Header"
import { appBackground } from "../../constants/colors"
import { Picker } from '@react-native-picker/picker';
import { submitTask } from "../../constants/firebase"
import AddImageModal from "../../components/AddImageModal"

const CreateTask = ({ navigation }) => {

    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsloading] = useState(false)

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        priority: "",
        imageUrl: null
    })

    const createTask = () => {
        const { title, description, priority, imageUrl } = inputs
        if (isLoading) {
            ToastAndroid.showWithGravity("Please Wait Image is Uploading", ToastAndroid.LONG, ToastAndroid.BOTTOM)
        }
        else if (title == "" || description == "" || priority == "" || !imageUrl) {
            ToastAndroid.showWithGravity("Please Fill Complete Form", ToastAndroid.LONG, ToastAndroid.BOTTOM)
        }

        else {
            let params = {
                title,
                description,
                priority,
                imageUrl,
                createdDate: new Date().toLocaleString(),
                status: "Incomplete"
            }
            submitTask(params)
            setTimeout(() => {
                navigation.goBack()
            }, 2000);
        }
    }



    const renderTextFields = (placeholder, numberOfLines, type) => {

        return (
            <View style={styles.textFieldStyles}>
                <TextInput
                    style={{
                        textAlignVertical: 'top',
                        color: "white"
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={"white"}
                    numberOfLines={numberOfLines}
                    multiline={true}
                    onChangeText={(text) => setInputs({ ...inputs, [type]: text })}
                />
            </View>

        )
    }


    const renderButton = () => {
        if (inputs.imageUrl) {
            return (
                <>
                    <Image
                        source={{ uri: inputs.imageUrl }}
                        style={styles.imageStyle}
                        resizeMode="contain"
                    />
                    <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                        <Button
                            onPress={() =>
                                setInputs({ ...inputs, imageUrl: null })
                            }
                            title="Remove Image" />
                    </View>
                </>
            )
        }
        else if (isLoading) {
            return (
                <ActivityIndicator style={{ marginTop: 10 }} size="large" color={"white"} />
            )
        }
        else {
            return (
                <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                    <Button onPress={() => setModalVisible(!isModalVisible)} title="Choose Image" />
                </View>
            )
        }
    }

    return (
        <>
            <AddImageModal
                isModalVisible={isModalVisible}
                setIsloading={setIsloading}
                setInputs={setInputs}
                inputs={inputs}
                setModalVisible={setModalVisible}
            />
            <View style={styles.container}>
                <Header title="Create Task" showLogout={true} />
                <ScrollView contentContainerStyle={{ paddingVertical: 15 }}>
                    {renderTextFields("Title", 1, "title")}
                    {renderTextFields("Description", 6, "description")}

                    <View style={{ borderWidth: 1, marginHorizontal: 10, borderColor: "white" }}>
                        <Picker
                            selectedValue={inputs.priority}
                            onValueChange={(itemValue, itemIndex) =>
                                setInputs({ ...inputs, priority: itemValue })
                            }
                            style={{ color: "white" }}
                        >
                            <Picker.Item label="Priority" value="" />
                            <Picker.Item label="Low" value="Low" />
                            <Picker.Item label="Medium" value="Medium" />
                            <Picker.Item label="High" value="High" />
                        </Picker>
                    </View>
                    {renderButton()}
                    <View style={styles.buttonContainer}>
                        <Button onPress={createTask} title="Create Task" />
                    </View>
                </ScrollView>

            </View>
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appBackground
    },
    buttonContainer: {
        flex: 1,
        justifyContent: "flex-end",
        marginHorizontal: 10
    },
    textFieldStyles: {
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: "white",
        paddingLeft: 5,
    },
    imageStyle: {
        height: 300,
        width: null,
        marginHorizontal: 10
    }
})

export default CreateTask