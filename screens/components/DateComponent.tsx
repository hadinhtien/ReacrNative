import React, { useEffect, useState } from "react";
import { Image, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/EvilIcons';
import DatePicker from 'react-native-modern-datepicker';
const DateComponent = ({route,navigation}:any) => {
    const curentday = new Date().toJSON().slice(0, 10);
    const [selectedDate, setSelectedDate] = useState(curentday);
    if(route.params != undefined){
        const {datetime} = route.params;
        setSelectedDate(datetime);
        route.params = undefined
    }
    const GetDate =(Date: any) =>{         
        navigation.navigate('Home',{datetime: Date})
    }



   
  
    return (
        <>
            <StatusBar translucent={true} backgroundColor="#FF7256" barStyle="dark-content"></StatusBar>
            <Text style={styles.datePicker}>
                Chọn ngày khởi hành thôi
            </Text>
            <View >
                
                <TouchableOpacity style={styles.Icon} onPress={()=> navigation.goBack()}><Icon  name="close" size={20} color="red" /></TouchableOpacity>
                <DatePicker
                    options={{
                        backgroundColor: '#f7f5f5',
                        textHeaderColor: 'black',
                        textDefaultColor: 'black',
                        selectedTextColor: '#fff',
                        mainColor: '#F4722B',
                        textSecondaryColor: 'black',
                        borderColor: 'rgba(122, 146, 165, 0.1)',
                    }}
                    current={selectedDate}
                    selected={selectedDate}
                    mode="calendar"
                    minuteInterval={30}
                    style={{ borderRadius: 10 }}
                    onDateChange={date => { setSelectedDate(date),GetDate(date)}}
                />
            </View>

        </>
    )
}


const styles = StyleSheet.create({
    datePicker: {
        marginTop: 23,
        backgroundColor: "#FF7256",
        paddingHorizontal: 16,
        paddingVertical: 60,
        fontSize: 25,
        color: "white",
    },
    Icon:{
      padding:12,
      width:42,
      top:-20,
      left:40,
      zIndex:9000,
      backgroundColor:'#E6E6FA',
      borderRadius:10,
      position: 'absolute',
      elevation: 4,
      shadowColor: '#555555',
    }
})
export default DateComponent;