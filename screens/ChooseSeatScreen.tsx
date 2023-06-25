import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconEntypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
const ChooseSeatScreen = ({ route }: any) => {
    const { MaXe } = route.params;
    const { MaChuyenDi } = route.params;
    const navigation = useNavigation()
    const [listGheXeT1, SetGheXeT1] = useState([])
    const [listGheXeT2, SetGheXeT2] = useState([])
    const GheXe = firestore().collection('GheXe');
    const LoTrinh = firestore().collection('LoTrinh');
    const DatVeXe = firestore().collection('DatVeXe');
    const Xe = firestore().collection('XeKhach');
    const collectionDatVeXe: any = {};
    const loadGheXe = () => {
       
        DatVeXe.onSnapshot(datVeXe => {
            if (datVeXe != null) {
                datVeXe.forEach(item => {
                    collectionDatVeXe[item.data().MaGheXe + item.data().MaChuyenDi] = 1
                })
            }
        })
        console.log(MaXe);
        
        GheXe
        .where('Tang', '==', '1')
        .where('MaXe', '==', MaXe)
        .orderBy('ViTri', 'asc')
        .onSnapshot((data) => {
            const List: any = [];
            if (data != null) {
                data.forEach((gheXe) => {
                    List.push({
                        id: gheXe.id,
                        viTri: gheXe.data().ViTri,
                        maXe: gheXe.data().MaXe,
                        trangThai: collectionDatVeXe[gheXe.id + MaChuyenDi] == undefined ? '1' : '0',
                    });
                })
                SetGheXeT1(List);
            }
        })

        GheXe.where('Tang', '==', '2').where('MaXe', '==', MaXe).orderBy('ViTri', 'asc').onSnapshot((data) => {
            const List: any = [];
            if (data != null) {
                data.forEach((gheXe) => {
                    List.push({
                        id: gheXe.id,
                        viTri: gheXe.data().ViTri,
                        maXe: gheXe.data().MaXe,
                        trangThai: collectionDatVeXe[gheXe.id + MaChuyenDi] == undefined ? '1' : '0',
                    });
                })
                SetGheXeT2(List);
            }
        })
    }

    const datvexe = async (id: any) => {
        if(collectionDatVeXe[id + MaChuyenDi] == undefined){
            navigation.navigate('BookTicket', {maGheXe:id,maChuyenDi: MaChuyenDi});
        }
    }

    useEffect(() => {
        loadGheXe()
    }, [])
    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
            <View style={{ height: 42, backgroundColor: '#FF6600' }}></View>
            <View style={{ backgroundColor: '#FFFFFF', justifyContent: "space-between", flexDirection: 'row', padding: 15 }}>
                <TouchableOpacity onPress={() => navigation.goBack()}><IconIonicons name="chevron-back" size={28} color="black" /></TouchableOpacity>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Chọn ghế</Text>
                <Text>      </Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#dee3e0' }}></View>

            <View style={{ padding: 15, flexDirection: 'row', backgroundColor: '#FFFFFF', }}>
                <View style={{ width: '50%' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
                        <IconEntypo name="squared-cross" size={38} color="#DDDDDD" />
                        <Text>   Đã bán</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <IconIonicons name="md-square" size={38} color="#00CCFF" />
                        <Text>   Đang chọn</Text>
                    </View>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
                        <IconIonicons name="md-square-outline" size={38} color="black" />
                        <Text>   Chưa đặt</Text>
                    </View>
                </View>
            </View>
            <ScrollView>
                <View style={{ backgroundColor: '#FFFFFF' }}>
                    <View style={{ backgroundColor: '#f2f0f0', borderRadius: 30, padding: 15 }}>
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginBottom: 12 }}>Tầng 1</Text>
                        <View style={{ backgroundColor: '#CCCCCC', height: 1, marginBottom: 12 }}>
                        </View>
                        <View style={{ alignContent: 'center', alignSelf: 'center', width: '90%', height: 330, flexWrap: 'wrap' }}>
                            {listGheXeT1.map((item: any) => {
                                return <View key={item.id}>
                                {item.trangThai == '1' ?
                                    <TouchableOpacity onPress={() => datvexe(item.id)} style={{ paddingHorizontal: 34 }}><IconIonicons name="md-square-outline" size={50} color="black" /></TouchableOpacity>
                                    
                                    :
                                    <Text style={{ paddingHorizontal: 34 }}><IconEntypo name="squared-cross" size={50} color="#DDDDDD" /></Text>
                                }
                            </View>
                            })}
                        </View>
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold', alignSelf: 'center', marginVertical: 12 }}>Tầng 2</Text>
                        <View style={{ backgroundColor: '#CCCCCC', height: 1, marginBottom: 12 }}></View>
                        <View style={{ alignContent: 'center', alignSelf: 'center', width: '90%', height: 330, flexWrap: 'wrap' }}>
                            {listGheXeT2.map((item: any) => {
                                return <View key={item.id}>
                                {item.trangThai == '1' ?
                                    <TouchableOpacity onPress={() => datvexe(item.id)} style={{ paddingHorizontal: 35 }}><IconIonicons name="md-square-outline" size={50} color="black" /></TouchableOpacity>
                                    :
                                    <Text style={{ paddingHorizontal: 34 }}><IconEntypo name="squared-cross" size={50} color="#DDDDDD" /></Text>
                                }
                            </View>
                            })}
                        </View>
                    </View>
                    <View style={{ marginBottom: 200 }}></View>
                </View>
            </ScrollView>
        </>
    )
}
export default ChooseSeatScreen