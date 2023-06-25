
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StatusBar, StyleSheet, Text, View, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNotes } from "../ConText/MyNote";
const LoginNameScreen = ({ route }: any) => {
    const navigation = useNavigation()
    const [isName, setName] = useState('')
    const [ischeckName, setcheckName] = useState(false)
    const { phone } = route.params;
    const HanhKhach = firestore().collection('HanhKhach');
    const { isNote, SetNote, getNote }: any = useNotes()
    const login = () => {
        
        if (isName != '') {
           
            HanhKhach.add({
                TenHanhKhach: isName,
                SDT: phone,
            })

            HanhKhach.onSnapshot(hanhkhach => {
                hanhkhach.forEach(data => {
                    if (data.data().SDT == phone) {
                        let Data = {
                            id: data.id,
                            TenHanhKhach: data.data().TenHanhKhach,
                            SDT: data.data().SDT,
                        }
                        SetNote(Data);
                        AsyncStorage.setItem('Account', JSON.stringify(Data));
                        console.log(Data);
                        // setName('')
                        navigation.navigate("App")
                    }
                })
                
            })
           
        } else {
            setcheckName(true);
        }
    }
    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
            <View style={styles.header}>
            </View>
            <View style={styles.phone}>
                <View style={{ padding: 30 }}>
                    <Text style={{ color: 'black', fontSize: 23, fontWeight: 'bold', marginTop: 30 }}>Họ và tên của bạn!</Text>
                    <Text style={{ paddingRight: 12, fontSize: 15, paddingTop: 8 }}>Cập nhật thông tin để sẵng sàng cho chuyến hành trình sắp tới</Text>
                    <TextInput  onChangeText={(value) => setName(value)} style={{ padding: 10, borderWidth: 1, borderColor: '#d9dedb', borderRadius: 15, marginTop: 35, fontSize: 16 }} placeholder="Nhập họ và tên " />
                    {
                        ischeckName ? (
                            <Text style={{ color: 'red', marginTop: 2 }}>Không được để rỗng</Text>
                        ) : (
                            ''
                        )
                    }
                    <TouchableOpacity onPress={() => login()} style={{ width: '100%', backgroundColor: '#FF6600', borderRadius: 15, marginTop: 35 }}><Text style={{ alignSelf: 'center', padding: 15, fontSize: 16, color: 'white' }}>Cập nhật</Text></TouchableOpacity>
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
    }
})
export default LoginNameScreen; 