import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
  } from 'react-native';
import styles from '../styles/OrphanagesMap'
import MapView,{Marker,PROVIDER_GOOGLE,Callout} from 'react-native-maps'
import mapMarker from '../images/map-marker.png'
import Feather from 'react-native-vector-icons/Feather'
import { useNavigation,useFocusEffect} from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';
interface Orphanage{
    id:number;
    name:string;
    latitude:number,
    longitude:number;  
}
function OrphanagesMap(){
    const [orphanages,setOrphanages]=useState<Orphanage[]>([])
    useFocusEffect(
      React.useCallback(() => {
        let isActive = true;
        const fetchOrphanages = async () => {
          try {
            const {data} = await api.get('orphanages')
            if (isActive) {
              setOrphanages(data);
            }
          } catch (e) {
            // Handle error
          }
        }
        fetchOrphanages();
        return () => {
          isActive = false;
        };
      }, [])
    );
    const navigation=useNavigation()
    function handleNavigation(id:number){
        navigation.navigate('orphanagesDetails',{id})
    }
    async function handleNavigateToCreate(){
        navigation.navigate('selectMapPosition')
    }
    return(
        <View>
      <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
          latitude: -19.9389022,
          longitude: -44.0304788,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
      }}
      >
        {orphanages.map(orphanage=><Marker 
            key={orphanage.id}
            icon={mapMarker} 
            calloutAnchor={{
            x:2.7,
            y:0.8
          }}
          coordinate={{
            latitude: orphanage.latitude,
            longitude: orphanage.longitude}}
        >
          <Callout tooltip
          onPress={()=>{handleNavigation(orphanage.id)}}
          >
            <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>{orphanage.name}</Text>
            </View>
          </Callout>
        </Marker>)}
      </MapView>
      <View style={styles.footer}>
            <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
            <RectButton 
            style={styles.createOrpghangeButton} 
            onPress={handleNavigateToCreate}>
              <Feather name="plus" size={20} color="#fff"/>
            </RectButton>
      </View>
    </View>
    )
}
export default OrphanagesMap