import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View, TextInput, StyleSheet, Alert } from "react-native";
import { StatusBar } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconEntypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import { useNotes } from "../ConText/MyNote";

const DeleteMyTrip = ({ route }: any) => {
    const navigation = useNavigation()
    const { IsNote, SetNote, getNote }: any = useNotes()
    const { id ,machuyenDi} = route.params
   
    const collectionNgayDiChuyenDi: any = {};
    const collectionGioDiChuyenDi: any = {};
    const collectionGheXe: any = {};
    const DatVeXe = firestore().collection('DatVeXe');
    const ChuyenDi = firestore().collection('ChuyenDi');
    const GheXe = firestore().collection('GheXe');
    const [List, setList] = useState({})
    const [DiemDon , setDiemDon] = useState('')
    const Delete = async (idVexe:any) => {
        const de = DatVeXe.doc(idVexe)
        ChuyenDi.doc(machuyenDi).get().then((chuyendi) =>{
            ChuyenDi.doc(machuyenDi).update({
               SoGheTrong: chuyendi.data().SoGheTrong + 1
            })
        })
        await de.delete().then((res) => {
            
            Alert.alert('Thông báo', 'Xóa thành công chuyến đi')
        })
        navigation.navigate('MyTric')
    }

    const Get = () => {

        console.log(id);
        // console.log(maChuyenDi);
        
        
        ChuyenDi.onSnapshot((chuyenDi) => {
            if (chuyenDi != null) {


                chuyenDi.forEach(data => {
                    collectionNgayDiChuyenDi[data.id] = data.data().NgayDi,
                        collectionGioDiChuyenDi[data.id] = data.data().GioDi
                })
            }
        })
        GheXe.onSnapshot((gheXe) => {
            if(gheXe != null) {

           
            gheXe.forEach(data => {
                collectionGheXe[data.id] = data.data().ViTri
            })
        }
        })
        
        
        

        DatVeXe.doc(id).get().then((data) => {
            
            if (data != null) {
                console.log(data);
                const vexe: any = {
                    id:data.id,
                    DiemDon: data.data().DiemDon,
                    DiemTra: data.data().DiemTra,
                    GheXe: collectionGheXe[data.data().MaGheXe],
                    GioDi: collectionGioDiChuyenDi[data.data().MaChuyenDi],
                    NgayDi: collectionNgayDiChuyenDi[data.data().MaChuyenDi],
                    MaChuyenDi: data.data().MaChuyenDi
                }
                setList(vexe)
            }


        })

    }

    useEffect(() => {
        Get()
    }, [])
    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
            <View style={{ height: 38, backgroundColor: '#FF6600' }}></View>
            <View style={{ justifyContent: "space-between", flexDirection: 'row', padding: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}><IconIonicons name="chevron-back" size={28} color="black" /></TouchableOpacity>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Thông tin vé xe</Text>
                <Text>      </Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#dee3e0' }}></View>
            <View style={{ padding: 15 }}>
              
                    <View>
                         <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, paddingBottom: 12 }}>Thông tin chuyến</Text>
                        <Text>xuất phát : {List.GioDi}</Text>
                        <Text>Ngày : {List.NgayDi}</Text>
                        <Text>Số vé : 1</Text>
                        <Text>Tổng tiền : 250.000 đ</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, paddingBottom: 12 }}>Điểm đón</Text>
                        <Text>{List.DiemDon}</Text>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, paddingBottom: 12 }}>Điểm trả</Text>
                        <Text>{List.DiemTra}</Text>

                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20, paddingBottom: 12 }}>Thông tin hành khách</Text>
                        <Text>Họ và tên : {IsNote.TenHanhKhach}</Text>
                        <Text>Số điện thoại : {IsNote.SDT}</Text> 
                        <TouchableOpacity onPress={() => Delete(List.id)} style={{ width: '100%', backgroundColor: '#FF6600', borderRadius: 15, marginTop: 35 }}><Text style={{ alignSelf: 'center', padding: 15, fontSize: 16, color: 'white' }}>Hủy vé</Text></TouchableOpacity>
                    </View>
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
export default DeleteMyTrip