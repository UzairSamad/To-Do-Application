import React, { useState } from "react"
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native"
import { appBackground } from "../constants/colors"
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from "react-native-modal";
import Entypo from "react-native-vector-icons/Entypo"
import axios from "axios";

const AddImageModal = ({ isModalVisible, setIsloading, setInputs, inputs, setModalVisible }) => {
    const isCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, response => {
            setModalVisible(!isModalVisible)
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
                alert(response.customButton);
            } else {
                const uri = response.assets[0].uri;
                const type = response.assets[0].type;
                const name = response.assets[0].fileName

                const imageData = {
                    uri,
                    type,
                    name
                }
                setFilePath(imageData)
            }
        })
    }

    const isGallery = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, response => {
            setModalVisible(!isModalVisible)

            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
                alert(response.customButton);
            } else {
                const uri = response.assets[0].uri;
                const type = response.assets[0].type;
                const name = response.assets[0].fileName

                const imageData = {
                    uri,
                    type,
                    name
                }
                setFilePath(imageData)
            }
        })
    }

    const setFilePath = async (e) => {
        setIsloading(true);
        const form = new FormData();
        form.append("file", e);
        form.append("upload_preset", "f23ifw8c");
        try {
            let res = await axios.post(
                "https://api.cloudinary.com/v1_1/dfukqukou/upload",
                form
            );
            if (res) {
                setIsloading(false);
                setInputs({ ...inputs, imageUrl: res.data.secure_url })
            }
        } catch (error) {
            setIsloading(false);
            alert("something went wrong");
        }
    }

    return (
        <Modal isVisible={isModalVisible}>
            <View style={{ backgroundColor: appBackground, height: 100 }}>
                <View style={{
                    alignItems: 'center'
                }}>
                    <Text style={styles.chooseOptionText}>Choose Any One Option</Text>
                    <View style={{ position: "absolute", right: 10, top: 10 }}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(!isModalVisible)}
                        >
                            <Entypo name="cross" color={"white"} size={20} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.galleryButtonParent}>
                    <TouchableOpacity
                        onPress={isGallery}
                        style={styles.galleryButton}>
                        <Text style={styles.galleryButtonText}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={isCamera}
                        style={styles.galleryButton}>
                        <Text style={styles.galleryButtonText}>Camera</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default AddImageModal

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
    galleryButton: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    galleryButtonText: {
        color: appBackground,
        fontWeight: "bold"
    },
    galleryButtonParent: {
        flex: 1,
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 10
    },
    chooseOptionText: {
        textAlign: "center",
        marginTop: 5,
        color: "white",
        fontSize: 16
    },
    textFieldStyles: {
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: "white",
        paddingLeft: 5,
    }
})