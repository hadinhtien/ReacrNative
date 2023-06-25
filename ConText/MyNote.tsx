import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState ,useContext} from "react";

const NoteContext = createContext<any>('')

const MyNote = ({children}:any) => {
    const [IsNote,SetNote] = useState({})
    const [ischuyenDi,SetchuyenDi] = useState([])
    const getNote = async () => {
        const result = await AsyncStorage.getItem('Account')
        if(result !== null) {
            SetNote(JSON.parse(result)) 
        }    
    }
    const getChuyenDi = async () => {
        const result = await AsyncStorage.getItem('ChuyenDi')
        if(result !== null) {
            SetchuyenDi(JSON.parse(result))
        }
    }
    useEffect(()=>{ 
        getChuyenDi();   
        getNote()      
    },[])
    return(
        <NoteContext.Provider value={{IsNote,SetNote,getNote,getChuyenDi,ischuyenDi,SetchuyenDi}} >
            {children}
        </NoteContext.Provider>
    )
}
export const useNotes =()=> useContext(NoteContext);
export default MyNote
