import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import ImagePicker,{ImagePickerOptions} from 'react-native-image-picker'
import api from '../../services/api';
interface OrphanageData{
  latitude:number;
  longitude:number
}

export default function OrphanageData() {
  const {params}=useRoute()
  const {latitude,longitude}=params as OrphanageData
  const [name,setName]=useState('')
  const [opening_hours,setOpening_hours]=useState('')
  const [about,setAbout]=useState('')
  const [instructions,setInstructions]=useState('')
  const [open_on_weekends,setOpen_on_weekends]=useState(false)
  const [images,setImages]=useState<string[]>([])
  const navigation=useNavigation()
  async function handleSubmit(){
    console.log({
      name,about,instructions,open_on_weekends,opening_hours,latitude,longitude
    })
    const data=new FormData()
    data.append('name',name)
    data.append('about',about)
    data.append('latitude',String(latitude))
    data.append('longitude',String(longitude))
    console.log(instructions)
    data.append('instructions',instructions)
    console.log(instructions)
    data.append('opening_hours',opening_hours)
    data.append('open_on_weekends',String(open_on_weekends))
    images.forEach((image,i)=>{
      data.append('images',{
        name:`image_${i}.jpg`,
        type:"image/jpg",
        uri:image,
      })
    })
    await api.post('orphanages',data).then(res=>console.log(res.data)).catch(err=>console.log(err))
    navigation.navigate("orphanagesMap")
  }
  function handleSelectImages(){
    ImagePicker.launchImageLibrary({
      allowsEditing:true,
      quality:1,
      mediaType:'photo',
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const uri=response.uri
        setImages([...images,uri])
      }
    });
    }
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        value={about}
        onChangeText={setAbout}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Fotos</Text>
      <View style={styles.uploadsImagesContainer}>
        {images.map((image,i)=>{
          return <Image key={i} style={styles.uploadedImage} source={{uri:image}} />
        })}
      </View>
      <TouchableOpacity style={styles.imagesInput} onPress={handleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        value={instructions}
        onChangeText={setInstructions}
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        value={opening_hours}
        onChangeText={setOpening_hours}
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          onValueChange={setOpen_on_weekends}
          value={open_on_weekends}
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  uploadsImagesContainer:{
    flexDirection:'row'
  },
  uploadedImage:{
    width:64,
    height:64,
    borderRadius:20,
    marginBottom:32,
    marginRight:8,
  },
  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
 
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})