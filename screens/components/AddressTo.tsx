import React, { useState, useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/EvilIcons';
import firestore from "@react-native-firebase/firestore";
const AddressTo = ({ route, navigation }: any) => {
    const [diaDiem, setdiaDiem] = useState([])
    const DiaDiem = firestore().collection('DiaDiem');
    const { to } = route.params;
    const check = (name: string) => {
        if (to == 'to') {
            navigation.navigate('Home', { toaddress: name });
        } else {
            navigation.navigate('Home', { fromaddress: name });
        }
    }

    useEffect(() => {
        DiaDiem.onSnapshot(diaDiem => {
            const List: any = [];
            diaDiem.forEach((data) => {
                List.push({
                    id: data.id,
                    TenDiaDiem: data.data().TenDiaDiem,
                    TrangThai: data.data().TrangThai
                });
            })
            setdiaDiem(List);
        })

    }, [])
    return (
        <>
            <StatusBar backgroundColor="#f28780" barStyle="dark-content"></StatusBar>
            <Text style={styles.datePicker}>
                Chọn nơi bạn muốn đi
            </Text>
            <View>
                <TouchableOpacity style={styles.Icons} onPress={() => navigation.goBack()}>
                    <Icon style={styles.Icon} name="close" size={20} color="red" />
                </TouchableOpacity>
                <View style={{ height: 159, width: "100%", backgroundColor: '#FF5722', }}>
                    <Text style={{ padding: 14, backgroundColor: 'white', marginTop: 43, marginLeft: 23, width: "90%", borderRadius: 12, fontSize: 16 }}> Tỉnh / Thành, Quận / Huyện </Text>
                </View>
            </View>

            <View style={styles.address}>
                <Text style={{ fontSize: 19, color: 'black', alignSelf: 'center' }}>Tỉnh thành</Text>
                {/* <Text style={{ fontSize: 19, color: 'black', }}>Quận huyện </Text> */}
            </View>
            <View style={{
                height: 1,
                backgroundColor: "#C0C0C0",
            }}></View>
            <View style={{ flexDirection: 'row' }}>

                <FlatList data={diaDiem}
                    renderItem={({item}:any) =>
                        <View style={{ width: '50%' }}>
                            <TouchableOpacity onPress={() => check(item.id)}>
                                <Text style={styles.addresname}>{item.TenDiaDiem}</Text>
                            </TouchableOpacity>
                        </View>
                    }
                />



                {/* <View style={{ height:300,width:1,backgroundColor: '#C0C0C0'}}></View>
                <View style={{ width:'50%' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.addresname}>Nước ngầm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.addresname}>Mỹ Đình</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.addresname}>Vinh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.addresname}>Thanh Chương</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.addresname}>Yên Xuân</Text>
                    </TouchableOpacity>
                </View> */}

            </View>

        </>
    )
}


const styles = StyleSheet.create({
    datePicker: {
        marginTop: 23,
        backgroundColor: "#f28780",
        paddingHorizontal: 16,
        paddingVertical: 60,
        fontSize: 29,
        color: "white",
    },
    Icons: {
        top: -20,
        left: 40,
        position: 'absolute',
        zIndex: 9999,
    },
    Icon: {
        padding: 12,
        width: 42,

        zIndex: 9000,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
        shadowColor: 'red',

    },
    text: {
        padding: 23,
        fontSize: 18,
        fontWeight: 'bold',
    },
    address: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
        paddingHorizontal: 44
    },
    addresname: {
        fontSize: 18,
        padding: 20,

    }
})
export default AddressTo;