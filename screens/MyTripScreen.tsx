import React, { useEffect, useState } from 'react';
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList, Alert } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontisto from "react-native-vector-icons/Fontisto";
import firestore from "@react-native-firebase/firestore";
import { useNotes } from '../ConText/MyNote';

const MyTripScreen = ({ navigation }: any) => {
    const { IsNote, SetNote, getNote }: any = useNotes()
    const DatVeXe = firestore().collection('DatVeXe');
    const ChuyenDi = firestore().collection('ChuyenDi');
    const LoTrinh = firestore().collection('LoTrinh');
    const Xe = firestore().collection('XeKhach');
    const GheXe = firestore().collection('GheXe');
    const [VeXe, SetVeXe] = useState([])
    const collectionNgayDiChuyenDi: any = {};
    const collectionGioDiChuyenDi: any = {};
    const collectionGheXe: any = {};

    const Delete = async (idVexe: any,maChuyenDi:any) => {
        navigation.navigate('DeleteMyTrip', { id: idVexe ,machuyenDi:maChuyenDi})
    }

    const Get = () => {

        ChuyenDi.onSnapshot((chuyenDi) => {
            chuyenDi.forEach(data => {
                collectionNgayDiChuyenDi[data.id] = data.data().NgayDi,
                    collectionGioDiChuyenDi[data.id] = data.data().GioDi
            })
        })
        GheXe.onSnapshot((gheXe) => {
            gheXe.forEach(data => {
                collectionGheXe[data.id] = data.data().ViTri
            })
        })     
        DatVeXe
            .where('MaHanhKhach', '==', IsNote.id)
            .onSnapshot((dataVeXe) => {
                if (dataVeXe != null) {
                    const List: any = []

                    dataVeXe.forEach(data => {
                        List.push({
                            id: data.id,
                            MaChuyenDi: data.data().MaChuyenDi,
                            ngayDi: collectionNgayDiChuyenDi[data.data().MaChuyenDi],
                            gioDi: collectionGioDiChuyenDi[data.data().MaChuyenDi],
                            GheXe: collectionGheXe[data.data().MaGheXe],
                            MaHanhKhach: data.data().MaHanhKhach,
                            TrangThai: data.data().TrangThai
                        })
                    })
                    SetVeXe(List)
                }

               
            })
    }

    useEffect(() => {
        Get()
    }, [])
    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
            <View style={styles.header}>
                <Text style={styles.txtHeader}>Chuyến của tôi</Text>
            </View>
            <View style={{ backgroundColor: '#FF6600' }}>
                <View style={{ backgroundColor: 'white', height: '100%', borderRadius: 30, padding: 15 }}>
                    <View style={styles.status}>
                        <Text></Text>
                        <Text style={styles.text}>Hiện tại</Text>
                        <Text></Text>
                    </View>

                    <FlatList data={VeXe}
                        renderItem={({ item }: any) =>
                            <TouchableOpacity onPress={() => Delete(item.id,item.MaChuyenDi)}>
                                <View style={styles.trip}>
                                    <View style={{ flexDirection: 'row', borderRadius: 20, backgroundColor: 'white' }}>
                                        <View style={{ paddingVertical: 15 }}>
                                            <Text style={styles.text1}>Khởi hành</Text>
                                            <Text style={styles.text2}>{item.gioDi}</Text>
                                            <Text style={styles.text1}>{item.ngayDi}</Text>
                                            <Text style={styles.text1}>Trạng thái</Text>
                                            <Text style={styles.text1}>Chưa thanh toán</Text>
                                        </View>
                                        <View style={{ paddingVertical: 15 }}>
                                            <Text style={styles.text1}>Biển số xe</Text>
                                            <Text style={styles.text2}>37B9-99-99</Text>
                                            <Text style={styles.text1}>Ghế :{item.GheXe}</Text>
                                            {/* <Text style={styles.text1}>Lộ trình</Text>
                                            <Text style={styles.text1}>Nghệ An - Hà Nội</Text> */}
                                        </View>
                                    </View>
                                    <View>
                                        {/* <TouchableOpacity onPress={() => Delete(item.id)}>
                                        <Text style={{ padding: 10, fontSize: 18 }}>Đã hủy</Text>
                                    </TouchableOpacity> */}

                                    </View>
                                </View>
                            </TouchableOpacity>
                        }
                    />

                    <View style={{ marginTop: 100 }}></View>


                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: '#FF6600',
        height: 100
    },
    txtHeader: {
        marginTop: 50,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    status: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#FFCCCC',
        marginTop: 10,
        elevation: 4,
        shadowColor: '#555555',
        alignItems: 'center'
    },

    trip: {
        backgroundColor: '#FFCCCC',
        borderRadius: 20,
        elevation: 4,
        shadowColor: '#555555',
        marginTop: 30,
        paddingHorizontal: 1
    },
    text: {
        backgroundColor: 'black',
        borderRadius: 10,
        fontSize: 15,
        paddingHorizontal: 25,
        paddingVertical: 6,
        color: '#FF6600',
        alignSelf: 'center',
    },
    text1: {
        fontSize: 16,
        color: 'black',
        paddingHorizontal: 22,

    },
    text2: {
        fontSize: 25,
        color: 'black',
        paddingHorizontal: 22,
        paddingVertical: 12,
        fontWeight: 'bold',
    }


})

export default MyTripScreen;