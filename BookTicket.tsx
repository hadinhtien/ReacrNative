import React from "react";
import { ScrollView, Text, TouchableOpacity, View, TextInput } from "react-native";
import { StatusBar } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconEntypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
const BookTicket = () => {
    // const navigation = useNavigation()
    return (
        <>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="dark-content"></StatusBar>
            <View style={{ height: 32, backgroundColor: '#FF6600' }}></View>
            <View style={{ justifyContent: "space-between", flexDirection: 'row', padding: 15 }}>
                <TouchableOpacity><IconIonicons name="chevron-back" size={28} color="black" /></TouchableOpacity>
                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Chọn điểm đón và trả</Text>
                <Text>      </Text>
            </View>
            <View style={{ height: 1, backgroundColor: '#dee3e0' }}></View>
            <TextInput />
        </>
    )
}
export default BookTicket