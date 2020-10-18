import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StyleSheet, Text, View } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import Feather from 'react-native-vector-icons/Feather'
interface HeaderProps{
    title:string,
    showCancel:boolean
}
export default function Header(props:HeaderProps){
    const {goBack,navigate}=useNavigation()
    return(
        <View style={styles.container}>
            <BorderlessButton onPress={goBack}>
                <Feather name="arrow-left" size={24} color="#15b5d6"/>
            </BorderlessButton>
            <Text style={styles.title}>{props.title}</Text>
            {props.showCancel?<BorderlessButton onPress={()=>navigate('orphanagesMap')}>
                <Feather name="x" size={24} color="#ff669d"/>
            </BorderlessButton>:<View/>}
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        padding:24,
        backgroundColor:"#f9fafc",
        borderBottomWidth:1,
        borderColor:"#dde3f0",
        paddingTop:44,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        color:"#8fa7b3",
        fontSize:16
    }
})