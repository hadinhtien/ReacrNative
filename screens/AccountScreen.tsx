import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, Text, ScrollView, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-modern-datepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../ConText/MyNote";
const AccountScreen = ({ navigation }: any) => {
    const {IsNote,SetNote,getNote}:any = useNotes()
    const login = ()=>{
        SetNote({})
        AsyncStorage.clear()
        navigation.replace('LoginPhone')
    }
    return (
        <>
            <View>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
            </View>
            <View style={styles.header}>
                <View style={{ padding: 23 }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>{IsNote.TenHanhKhach}</Text>
                    <Text style={{ fontSize: 17, color: 'white' }}>{IsNote.SDT}</Text>
                </View>
                <View style={{ padding: 23 }}>
                    <Image style={{ width: 60, height: 60, borderRadius: 12 }} source={require('../assets/Images/avatar.jpg')}></Image>
                </View>
            </View>

            <ScrollView>
                <TouchableOpacity style={styles.menu}>
                    <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
                        <Icon name="info" size={22} color="red" />
                        <Text style={{ fontSize: 18, paddingLeft: 13 }}>Giới thiệu nhà xe</Text>
                    </View>
                    <View>
                        <Icon name="chevron-right" size={23} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menu}>
                    <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
                        <Icon name="info" size={22} color="red" />
                        <Text style={{ fontSize: 18, paddingLeft: 13 }}>Quy chế hoạt động</Text>
                    </View>
                    <View>
                        <Icon name="chevron-right" size={23} color="black" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menu} onPress={()=>login()}>
                    <View style={{ flexDirection: 'row', paddingVertical: 15 }}>
                        <Icon name="info" size={22} color="red" />
                        <Text style={{ fontSize: 18, paddingLeft: 13 }}>đăng xuất</Text>
                    </View>
                    <View>
                        <Icon name="chevron-right" size={23} color="black" />
                    </View>
                </TouchableOpacity>

                <View style={{ padding: 25 }}>
                    <Text style={{ paddingBottom: 5, color: 'black', fontSize: 19 }}>Công ty TNHH vận tải và du lịch An Phú Qúy</Text>
                    <Text style={{ fontSize: 16 }}>Người đại diện: Lê Dũng Thái</Text>
                    <Text style={{ fontSize: 16 }}>Số ĐKKD 2901884414 do Sở KHĐT Nghệ An</Text>
                    <Text style={{ fontSize: 16 }}>cấp ngày 25/12/2017</Text>
                    <Text style={{ fontSize: 16, marginTop: 6 }}>Địa chỉ : Thanh Chương, Nghệ An, Việt Nam</Text>
                    <Text style={{ fontSize: 16 , marginTop: 6}}>Sđt : 099998888</Text>
                    <Text style={{ fontSize: 16 , marginTop: 6}}>Sđt : 099778823</Text>
                    <Text style={{ fontSize: 16 , marginTop: 6}}>Email : xekhachanphuquy@gmail.com</Text>
                    <Text style={{ fontSize: 16 }}>Web : htt://xekhachanphuquy.vn</Text>
                    <Text style={{ fontSize: 16 }}>Fb : https://www.facebook.com/xekhachanphuquy</Text>
                    <Text style={{ fontSize: 16 }}>Zalo : https://zalo.me/099998888</Text>

                </View>
            </ScrollView>


        </>
    )
}


const styles = StyleSheet.create({
    header: {
        paddingTop:40,
        flexDirection: 'row',
        justifyContent: "space-between",
        backgroundColor: '#FF6600',
    },
    menu: {
        backgroundColor: '#EEEEEE',
        flexDirection: 'row',
        justifyContent: "space-between",
        marginLeft: 28,
        paddingHorizontal: 10,
        width: '85%',
        alignItems: "center",
        marginTop: 25,
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#555555',

    }
})
export default AccountScreen;