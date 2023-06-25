import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, TextInput, StyleSheet, Alert } from "react-native";
import { StatusBar } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconEntypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { useNotes } from "../ConText/MyNote";
const BookTicket = ({ route }: any) => {
    const ChuyenDi = firestore().collection('ChuyenDi');
    const DatVeXe = firestore().collection('DatVeXe');
    const navigation = useNavigation()
    const [DiemDi, setDiemDi] = useState('')
    const [DiemTra, setDiemTra] = useState('')
    const { IsNote, SetNote, getNote }: any = useNotes()
    const { maGheXe, maChuyenDi } = route.params
    const [check, setcheck] = useState(false);
    const collectionDatVeXe: any = {};
    const book = async () => {

        DatVeXe.onSnapshot((veXe) => {
            if (veXe != null) {
                veXe.forEach(data => {
                    collectionDatVeXe[data.data().MaGheXe + data.data().MaChuyenDi] = 1
                })
            }
        })
        if (DiemDi == '' || DiemTra == '') {
            Alert.alert('Thông Báo', 'Nhận điểm đón điểm trả')
        } else {
            
            
            if (collectionDatVeXe[maGheXe + maChuyenDi] == undefined) {
                await DatVeXe.add({
                    DiemDon: DiemDi,
                    DiemTra: DiemTra,
                    MaChuyenDi: maChuyenDi,
                    MaGheXe: maGheXe,
                    MaHanhKhach: IsNote.id,
                    TrangThai: 1
                })

                ChuyenDi.doc(maChuyenDi).get().then((chuyendi) =>{
                    ChuyenDi.doc(maChuyenDi).update({
                       SoGheTrong: chuyendi.data().SoGheTrong - 1
                    })
                })
                
                Alert.alert('Thông Báo', 'Đặt vé thành công')

                navigation.navigate('Home')
            } else {
                Alert.alert('Thông Báo', 'Chố ngồi đá bị đặt')
                navigation.goBack();
            }

        }
    }
    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
            <View style={{ height: 38, backgroundColor: '#FF6600' }}></View>
            <View style={{ justifyContent: "space-between", flexDirection: 'row', padding: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}><IconIonicons name="chevron-back" size={28} color="black" /></TouchableOpacity>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Chọn điểm đón và trả</Text>
                <Text>      </Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#dee3e0' }}></View>
            <View style={{ padding: 15 }}>
                <TextInput multiline={true} onChangeText={(value) => setDiemDi(value)} style={[styles.btnPhone]} placeholder="Nhập điểm đón " />
                <TextInput multiline={true} onChangeText={(value) => setDiemTra(value)} style={[styles.btnPhone]} placeholder="Nhập điểm trả " />
                <TouchableOpacity onPress={() => book()} style={{ width: '100%', backgroundColor: '#FF6600', borderRadius: 15, marginTop: 35 }}><Text style={{ alignSelf: 'center', padding: 15, fontSize: 16, color: 'white' }}>Tiếp tục</Text></TouchableOpacity>
            </View>

        </>
    )
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: '#FF6600',
        height: 80
    },
    phone: {
        top: -30,
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20
    },
    btnPhone: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#FF6600',
        borderRadius: 15,
        height: 100,
        marginTop: 35,
        fontSize: 16
    }

})
export default BookTicket