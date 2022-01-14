import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import Button from "../../components/Button"
import { appBackground } from "../../constants/colors"
import firebase from "firebase"
import Header from "../../components/Header"
import AllTask from "./AllTasks"

const TodoList = ({ navigation }) => {

    const [allTask, setAllTask] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        allTasks()
        setTimeout(() => {
            setLoading(false)
        }, 3000);
    }, [])



    const allTasks = async () => {
        firebase
            .database()
            .ref("tasks")
            .on("value", snapshot => {
                let data = snapshot.val() ? snapshot.val() : {}
                setLoading(false)
                setAllTask(data)
            })
    }

    const createTask = () => {
        navigation.navigate("CreateTask")
    }

    const Data = Object.keys(allTask)

    return (
        <View style={styles.container}>
            <Header title="All Tasks" showLogout={true} />
            <ScrollView style={{ flex: 1 }}>
                {loading ?
                    <ActivityIndicator size={"large"} color={"white"} />
                    :
                    Data.length > 0 ?
                        Data.map((values, index) => {
                            return (
                                <AllTask
                                    data={allTask[values]}
                                    id={values}
                                />
                            )
                        })
                        :
                        <View
                            style={styles.noRecord}
                        >
                            <Text style={styles.noRecordTextStyle}>
                                No Record Found</Text>
                        </View>
                }
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button onPress={createTask} title="Add Task" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appBackground,
        paddingVertical: 5
    },
    buttonContainer: {
        flex: 0.1,
        justifyContent: "flex-end",
        marginHorizontal: 10
    },
    noRecord: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    noRecordTextStyle: {
        fontSize: 20,
        color: "white"
    }
})

export default TodoList