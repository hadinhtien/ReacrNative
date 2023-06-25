import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity, ScrollView, StatusBar, Alert } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconFeather from "react-native-vector-icons/Feather";
import IconFontisto from "react-native-vector-icons/Fontisto";
import { useNotes } from "../ConText/MyNote";
import firestore from "@react-native-firebase/firestore";
import { toFormData } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = ({ route, navigation }: any) => {
    const DiaDiem = firestore().collection('DiaDiem');
    const curentday = new Date().toJSON().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(curentday)
    const [istoAddressId, setistoAddressId] = useState('')
    const [isfromAddressId, setisfromAddressId] = useState('')
    const [istoAddress, setistoAddress] = useState('Nơi khởi hành')
    const [isfromAddress, setisfromAddress] = useState('Bạn muốn đi đâu?')
    const { IsNote, SetNote, getNote, SetchuyenDi }: any = useNotes()
    let getYear = selectedDate.slice(0, 4)
    let getMonth = selectedDate.slice(5, 7)
    let getDate = selectedDate.slice(8, 10)
    let date = getDate + '-' + getMonth + '-' + getYear
    const [isDate, setDate] = useState(date)
    const LoTrinh = firestore().collection('LoTrinh');
    const GheXe = firestore().collection('GheXe');
    const address = () => {
        let addressId = istoAddressId
        let address = istoAddress
        if (istoAddressId != '' && isfromAddressId != '') {
            setistoAddressId(isfromAddressId)
            setisfromAddressId(addressId)
            setistoAddress(isfromAddress)
            setisfromAddress(address)
        }
       
        
        // GheXe.add({
        //     MaXe: '2KghnOD80WKAUKkp3j7u',
        //     Tang: '2',
        //     TrangThai: true,
        //     ViTri: "C1-T2"
        // })
        // GheXe.add({
        //     MaXe: '2KghnOD80WKAUKkp3j7u',
        //     Tang: '2',
        //     TrangThai: true,
        //     ViTri: "C2-T2"
        // })
        // GheXe.add({
        //     MaXe: '2KghnOD80WKAUKkp3j7u',
        //     Tang: '2',
        //     TrangThai: true,
        //     ViTri: "C3-T2"
        // })
        // GheXe.add({
        //     MaXe: '2KghnOD80WKAUKkp3j7u',
        //     Tang: '2',
        //     TrangThai: true,
        //     ViTri: "C4-T2"
        // })
        // GheXe.add({
        //     MaXe: '2KghnOD80WKAUKkp3j7u',
        //     Tang: '2',
        //     TrangThai: true,
        //     ViTri: "C5-T2"
        // })
        // GheXe.add({
        //     MaXe: '2KghnOD80WKAUKkp3j7u',
        //     Tang: '2',
        //     TrangThai: true,
        //     ViTri: "B6-T1"
        // })
       
       
        // console.log('dfdf');

    }
    if (route.params != undefined) {
        const { datetime } = route.params;
        const { toaddress } = route.params;
        const { fromaddress } = route.params;
        if (datetime != undefined) {
            setSelectedDate(datetime);
            let getYear = datetime.slice(0, 4)
            let getMonth = datetime.slice(5, 7)
            let getDate = datetime.slice(8, 10)
            let date = getDate + '-' + getMonth + '-' + getYear
            setDate(date)
            route.params = undefined
        } else if (toaddress != undefined) {
            setistoAddressId(toaddress)
            DiaDiem.doc(toaddress).get().then((data) => {
                setistoAddress(data.data().TenDiaDiem)
            })
            route.params = undefined
        } else if (fromaddress != undefined) {
            setisfromAddressId(fromaddress)
            DiaDiem.doc(fromaddress).get().then((data) => {
                setisfromAddress(data.data().TenDiaDiem)
            })
            route.params = undefined
        }
    }
    const FindTiket = () => {
        LoTrinh.onSnapshot(lotrinh => {
            if (lotrinh != null) {
                lotrinh.forEach(data => {
                    if (istoAddressId != '' && isfromAddressId != '') {
                        if(istoAddressId == isfromAddressId){
                            Alert.alert('Thông báo','Không có tuyến xe này')
                        }else{
                            if (data.data().DiemDi == istoAddressId && data.data().DiemDen == isfromAddressId) {
                                navigation.navigate("FindTicker", { date: isDate, idLotrinh: data.id, toaddress: istoAddress, fromaddress: isfromAddress })
                            }
                        }
                        
                    } else {
                        Alert.alert('Thông báo', 'Mời chọn điểm đi điểm đến')
                    }
                })
            }
        })
    }

    useEffect(() => {
       
    }, [])

    return (
        <ScrollView>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
            <View style={styles.banner}>
                <Image style={styles.bannerImg} source={require("../assets/Images/banner1.jpg")} />
                <View style={styles.bannerText}>
                    <Text style={styles.bannerText1}>Xin chào {IsNote.TenHanhKhach}</Text>
                    <Text style={{ color: "black" }}>Bạn đã sẵn sàng cho chuyến </Text>
                    <Text style={{ color: "black" }}>hành trình của riêng mình?</Text>
                </View>
            </View>

            <View style={styles.search}>
                <View style={styles.searchAddress}>
                    <View style={styles.searchAddressTo}>
                        <IconIonicons name="md-checkmark-done-circle-outline" size={20} color="red" />
                        <View style={styles.searchAddressName}>
                            <Text>Nơi đi</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("AddresTo", { to: 'to' })}>
                                <Text style={{ fontWeight: "bold", color: 'black', fontSize: 20 }}>{istoAddress}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.line}></View>
                    <View style={styles.searchAddressTo}>
                        <IconFeather name="map-pin" size={20} color="red" />
                        <View style={styles.searchAddressName}>
                            <Text>Nơi đến</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("AddresTo", { to: 'from' })}>
                                <Text style={{ fontWeight: "bold", color: 'black', fontSize: 20 }}>{isfromAddress}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.Icon} onPress={() => address()}><IconIonicons name="swap-vertical-sharp" size={20} color="red" /></TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.searchDate} onPress={() => navigation.navigate("DateStack", { datetime: selectedDate })}>
                    <View>
                        <Text>Ngày khởi hành</Text>
                        <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{isDate}</Text>
                    </View>
                    <IconFontisto name="date" size={20} color='red'></IconFontisto>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => FindTiket()}>
                    <View style={styles.BtnSearch}>
                        <Text style={{ alignSelf: "center", color: "white", fontSize: 15 }}>Tìm chuyến đi</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 190, padding: 25 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>Tin tức</Text>
                <ScrollView horizontal>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <TouchableOpacity>
                            <View style={styles.News}>
                                <Image style={styles.ImageNews} source={require('../assets/Images/banner1.jpg')} />
                                <Text style={styles.NameNews}>Hệ thống phòng vé An Phú Qúy </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 23 }}>
                        <TouchableOpacity>
                            <View style={styles.News}>
                                <Image style={styles.ImageNews} source={require('../assets/Images/banner1.jpg')} />
                                <Text style={styles.NameNews}>Hệ thống phòng vé An Phú Qúy </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF"
    },
    banner: {
        width: "100%",
        height: 260,
    },
    bannerImg: {
        width: "100%",
        height: 260,
    },
    bannerText: {
        position: "absolute",
        padding: 25,
        marginTop: 32,
    },
    bannerText1: {
        fontWeight: "bold",
        fontSize: 25,
        color: "black",
    },
    search: {
        width: "100%",
        padding: 25,
        position: "absolute",
        top: 174
    },
    searchAddress: {
        paddingHorizontal: 10,
        borderRadius: 15,
        elevation: 4,
        shadowColor: '#555555',
        backgroundColor: '#FFFFFF',
    },
    searchAddressTo: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,

    },
    searchAddressName: {
        paddingHorizontal: 10,
    },
    line: {
        height: 1,
        marginLeft: 30,
        backgroundColor: "#C0C0C0",
    },
    searchDate: {
        paddingHorizontal: 37,
        borderRadius: 15,
        elevation: 4,
        shadowColor: '#555555',
        backgroundColor: '#FFFFFF',
        marginVertical: 14,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
    },
    BtnSearch: {
        borderRadius: 15,
        elevation: 2,
        shadowColor: '#555555',
        backgroundColor: '#ff6400',
        padding: 15,
    },
    News: {
        backgroundColor: 'white',
        borderRadius: 15,
        width: 300,
        height: 320,
        overflow: 'hidden',
        marginRight: 12,
        elevation: 2,
        shadowColor: '#555555',
    },
    ImageNews: {
        width: '100%',
        height: 260,
    },
    NameNews: {
        fontWeight: 'bold',
        fontSize: 18,
        overflow: 'hidden',
        padding: 8,
        color: 'black'
    },
    Icon: {
        padding: 12,
        width: 42,
        top: 35,
        left: 250,
        zIndex: 9000,
        backgroundColor: '#E6E6FA',
        borderRadius: 10,
        position: 'absolute',
        elevation: 4,
        shadowColor: '#555555',
    }

})
export default HomeScreen;