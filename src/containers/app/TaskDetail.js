import React, { useEffect, useState } from "react"
import { View, Text, Alert, ScrollView, StyleSheet, ToastAndroid, TextInput, TouchableOpacity, Image, ActivityIndicator } from "react-native"
import Header from "../../components/Header"
import { appBackground } from "../../constants/colors"
import { deleteTask, editTask, markAsCompleted, markAsInCompleted } from "../../constants/firebase"
import { Picker } from '@react-native-picker/picker';
import Button from "../../components/Button"
import Modal from "react-native-modal";
import Entypo from "react-native-vector-icons/Entypo"
import AddImageModal from "../../components/AddImageModal"

const TaskDetail = ({ route, navigation }) => {
    const { data, key } = route.params

    const [isModalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsloading] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [inputs, setInputs] = useState({
        title: data.title,
        description: data.description,
        priority: data.priority,
        imageUrl: data.imageUrl
    })

    const renderTextFields = (placeholder, numberOfLines, type) => {
        return (
            <View style={{
                borderWidth: 1,
                marginHorizontal: 10,
                marginVertical: 10,
                borderColor: "white",
                paddingLeft: 5,
            }}>
                <TextInput
                    style={{
                        textAlignVertical: 'top',
                        color: "white"
                    }}
                    placeholder={placeholder}
                    placeholderTextColor={"white"}
                    numberOfLines={numberOfLines}
                    multiline={true}
                    value={inputs[type]}
                    onChangeText={(text) => setInputs({ ...inputs, [type]: text })}
                />
            </View>

        )
    }
    const renderButton = () => {
        if (inputs.imageUrl) {
            return (
                <>
                    <Image source={{ uri: inputs.imageUrl }} style={{
                        height: 300,
                        marginHorizontal: 10,
                        width: null,
                    }}
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
                <View style={{ marginHorizontal: 10, marginTop: 20 }}>
                    <Button onPress={() => setModalVisible(!isModalVisible)} title="Choose Image" />
                </View>
            )
        }
    }






    const edit = () => {
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
            editTask(params, key)
            setEditModal(!editModal)
            setTimeout(() => {
                navigation.goBack()
            }, 2000);
        }
    }

    const completed = () => {
        navigation.goBack()
        markAsCompleted(key)
    }

    const notCompleted = () => {
        navigation.goBack()
        markAsInCompleted(key)
    }

    const RemoveTask = () => {
        Alert.alert(
            "Delete Confirmation",
            "Are You sure You Want To Delete?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "OK", onPress: () => {
                        navigation.goBack()
                        deleteTask(key)
                    }
                }
            ]
        );
    }

    const renderData = (heading, value) => {
        return (
            <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", paddingHorizontal: 5 }}>
                <Text style={{
                    color: "white",
                    fontSize: 18
                }}>{heading}: </Text>
                <Text style={{
                    color: "white"
                }}>{value}</Text>
            </View>
        )
    }

    return (
        <>
            <Modal isVisible={editModal}>
                <View style={{ backgroundColor: appBackground }}>
                    <View style={{ position: "absolute", right: 10, top: 10 }}>
                        <TouchableOpacity
                            onPress={() => setEditModal(!editModal)}
                        >
                            <Entypo name="cross" color={"white"} size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 30 }}>
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
                        <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                            <Button title={"Edit Data"} onPress={edit} />
                        </View>
                    </View>
                </View>

            </Modal>

            <AddImageModal
                isModalVisible={isModalVisible}
                setIsloading={setIsloading}
                setInputs={setInputs}
                inputs={inputs}
                setModalVisible={setModalVisible}
            />

            <View style={styles.container}>
                <Header title={data.title} showLogout={true} />
                <ScrollView>

                    {renderData("Title", data.title)}
                    {renderData("Description", data.description)}
                    {renderData("Priority", data.priority)}
                    {renderData("Status", data.status)}

                    {renderButton()}
                    <View style={{ flex: 1, justifyContent: "flex-end", marginHorizontal: 10 }}>
                        {data.status != "Completed" ?
                            <View style={{ marginVertical: 8 }}>
                                <Button onPress={completed} title="Mark as Completed" />
                            </View>
                            :
                            <View style={{ marginVertical: 8 }}>
                                <Button onPress={notCompleted} title="Mark as inComplete" />
                            </View>
                        }
                        <View
                            style={styles.buttonStyles}
                        >
                            <TouchableOpacity
                                onPress={() => setEditModal(!editModal)}
                                style={styles.innerButtonStyle}
                            >
                                <Text style={{ color: appBackground, fontSize: 14, fontWeight: "bold" }}>Edit Task</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={RemoveTask}
                                style={styles.innerButtonStyle}
                            >
                                <Text style={{ color: appBackground, fontSize: 14, fontWeight: "bold" }}>Delete Task</Text>
                            </TouchableOpacity>
                        </View>
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
    buttonStyles: {
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    innerButtonStyle: {
        paddingVertical: 10,
        backgroundColor: "white",
        width: "45%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    }
})


export default TaskDetail