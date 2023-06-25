import React, { useEffect, useState } from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import IconFontisto from "react-native-vector-icons/Fontisto";
import { useNavigation } from '@react-navigation/native';
import firestore from "@react-native-firebase/firestore";
const FindTicker = ({ route }: any) => {
    const navigation = useNavigation()
    const ChuyenDi = firestore().collection('ChuyenDi');
    const LoTrinh = firestore().collection('LoTrinh');
    const Xe = firestore().collection('XeKhach');
    const TaiXe = firestore().collection('TaiXe');
    const NhanVien = firestore().collection('NhanVien');
    const { date, idLotrinh, fromaddress, toaddress } = route.params;
    const [listChuyenDi, SetchuyenDi] = useState([])
    const collectionLoTrinh: any = {};
    const collectionXe: any = {};
    useEffect(() => {

        // console.log(date);
        // console.log(idLotrinh);
        // console.log(fromaddress);
        // console.log(toaddress);
        
        LoTrinh.onSnapshot(lotrinh => {
            if (lotrinh != null) {
                lotrinh.forEach(item => {
                    collectionLoTrinh[item.id] = item.data().TenLoTrinh
                })
            }
        })
        
        Xe.onSnapshot(xe => {
                if(xe != null) {
                    xe.forEach(item => {
                    collectionXe[item.id] = item.data().LoaiXe
                })
            }
            
        })
        ChuyenDi
        .where('MaLoTrinh', '==', idLotrinh)
        .where('NgayDi', '==', date)
        .where('TrangThai' , '==' , true)
        .onSnapshot(chuyenDi => {
            const List: any = []
            if (chuyenDi != null) {
                chuyenDi.forEach((data) => {
                    List.push({
                        id: data.id,
                        GiaVeXe: data.data().GiaVeXe,
                        TenLoTrinh: collectionLoTrinh[data.data().MaLoTrinh],
                        LoaiXe: collectionXe[data.data().MaXe],
                        MaXe: data.data().MaXe,
                        GioDen: data.data().GioDen,
                        TongThoiGian: data.data().TongThoiGian,
                        GioDi: data.data().GioDi,
                        GheTrong: data.data().SoGheTrong
                    })
                });
                SetchuyenDi(List)
            }
        })
    }, [])
    return (
        <>
            <View style={styles.header}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
                <Image style={{ width: '100%', height: 200 }} source={require('../assets/Images/Ticker.jpg')}></Image>
                <View style={styles.headerName}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: -10 }} ><Icon style={{ backgroundColor: 'white', padding: 12, borderRadius: 10 }} name="arrow-back" size={20} color="red" /></TouchableOpacity>
                    <Text style={{ fontSize: 20, color: 'white' }}>{toaddress}</Text>
                    <Icon name="arrow-forward" size={26} color="white" />
                    <Text style={{ fontSize: 20, color: 'white' }}>{fromaddress}</Text>
                </View>
            </View>
            <View style={styles.date}>
                <TouchableOpacity>
                    <IconFontisto name="date" size={20} color='white'></IconFontisto>
                </TouchableOpacity>
                <View>
                    <Text style={{ color: 'white' }}>     Khởi hành</Text>
                    <Text style={{ color: 'white', fontSize: 17 }}> {date}</Text>
                </View>
                <IconFontisto name="nav-icon-list-a" size={20} color='white'></IconFontisto>
            </View>
            <View style={{ backgroundColor: '#DDDDDD', flex: 1, height: '100%' }}>
                {listChuyenDi.length == 0 &&  <View>
                <Text style={{marginTop:90,alignSelf:'center',fontSize:24,color:'black',fontWeight: 'bold'}}>Không tìm thấy chuyến xe </Text>
                <Text style={{alignSelf:'center',fontSize:16,color:'black',}}>các chuyến xe trong ngày tạm hết vé.</Text>
                <Text style={{alignSelf:'center',fontSize:16,color:'black',}}>quý khách vui lòng thử lại sau hoặc chọn </Text>
                <Text style={{alignSelf:'center',fontSize:16,color:'black',}}>ngày khởi hành khác</Text>
                </View>}
                
                <FlatList data={listChuyenDi}
                    renderItem={({ item }: any) =>
                        <TouchableOpacity onPress={() => navigation.navigate('ChooseSeat', { MaXe: item.MaXe, MaChuyenDi: item.id })}>
                            <View style={{ padding: 10, backgroundColor: 'white', width: '95%', alignSelf: 'center', marginTop: 12, borderRadius: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
                                    <Text style={{ fontSize: 16, color: 'black' }}>{item.LoaiXe}</Text>
                                    <Text>Còn {item.GheTrong} chố trống</Text>
                                </View>
                                <View style={{ height: 1, backgroundColor: '#C0C0C0' }}></View>
                                <View style={{ flexDirection: 'row', alignSelf: 'center', paddingVertical: 12 }}>
                                    <Text style={{ fontSize: 25, color: '#3366CC', fontWeight: 'bold' }}>{item.GioDi}</Text>
                                    <Text>       --------------------- {item.TongThoiGian}h -------------------       </Text>
                                    <Text style={{ fontSize: 25, color: '#3366CC', fontWeight: 'bold' }}>{item.GioDen}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', paddingVertical: 5 }}>
                                    <Text style={{ fontSize: 16, color: 'black', }}>{item.TenLoTrinh}</Text>

                                </View>
                                <View style={{ height: 1, backgroundColor: '#C0C0C0' }}></View>
                                <Text style={{ fontSize: 20, color: 'black', paddingTop: 12, fontWeight: 'bold' }}>{item.GiaVeXe}.000đ</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />



                {/* <TouchableOpacity>
                        <View style={{ padding: 10, backgroundColor: 'white', width: '95%', alignSelf: 'center', marginTop: 12, borderRadius: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
                                <Text style={{ fontSize: 16, color: 'black' }}>Giường nằm 34 chố</Text>
                                <Text>Còn 34 chố trống</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#C0C0C0' }}></View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', paddingVertical: 12 }}>
                                <Text style={{ fontSize: 25, color: '#3366CC',fontWeight: 'bold' }}>8:30</Text>
                                <Text>       ---------------------- 8h --------------------       </Text>
                                <Text style={{ fontSize: 25, color: '#3366CC', fontWeight: 'bold' }}>16:30</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                                <Text style={{ fontSize: 16, color: 'black', }}>Bến xe Bắc Vinh</Text>
                                <Text style={{ fontSize: 16, color: 'black' }}>Bến xe nước ngầm</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#C0C0C0' }}></View>
                            <Text style={{ fontSize: 20, color: 'black',paddingTop:12,fontWeight:'bold'}}>250.000đ</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ padding: 10, backgroundColor: 'white', width: '95%', alignSelf: 'center', marginTop: 12, borderRadius: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
                                <Text style={{ fontSize: 16, color: 'black' }}>Giường nằm 34 chố</Text>
                                <Text>Còn 34 chố trống</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#C0C0C0' }}></View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', paddingVertical: 12 }}>
                                <Text style={{ fontSize: 25, color: '#3366CC',fontWeight: 'bold' }}>10:00</Text>
                                <Text>       ---------------------- 8h --------------------       </Text>
                                <Text style={{ fontSize: 25, color: '#3366CC', fontWeight: 'bold' }}>14:30</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                                <Text style={{ fontSize: 16, color: 'black', }}>Bến xe Bắc Vinh</Text>
                                <Text style={{ fontSize: 16, color: 'black' }}>Bến xe nước ngầm</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#C0C0C0' }}></View>
                            <Text style={{ fontSize: 20, color: 'black',paddingTop:12,fontWeight:'bold'}}>250.000đ</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={{ padding: 10, backgroundColor: 'white', width: '95%', alignSelf: 'center', marginTop: 12, borderRadius: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 }}>
                                <Text style={{ fontSize: 16, color: 'black' }}>Giường nằm 34 chố</Text>
                                <Text>Còn 34 chố trống</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#C0C0C0' }}></View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', paddingVertical: 12 }}>
                                <Text style={{ fontSize: 25, color: '#3366CC',fontWeight: 'bold' }}>6:30</Text>
                                <Text>       ---------------------- 8h --------------------       </Text>
                                <Text style={{ fontSize: 25, color: '#3366CC', fontWeight: 'bold' }}>14:30</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 }}>
                                <Text style={{ fontSize: 16, color: 'black', }}>Bến xe Bắc Vinh</Text>
                                <Text style={{ fontSize: 16, color: 'black' }}>Bến xe nước ngầm</Text>
                            </View>
                            <View style={{ height: 1, backgroundColor: '#C0C0C0' }}></View>
                            <Text style={{ fontSize: 20, color: 'black',paddingTop:12,fontWeight:'bold'}}>250.000đ</Text>
                        </View>
                    </TouchableOpacity> */}
                <View style={{ marginBottom: 12 }}></View>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: 'red',
        height: 170
    },
    headerName: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12,
        top: -120

    },
    date: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#FF6600',
        borderTopEndRadius: 25,
        borderTopStartRadius: 25
    }

})

export default FindTicker;