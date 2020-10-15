import React, { useEffect, useState } from 'react'
import mapMarkerImg from '../images/map-marker.svg'
import '../styles/pages/OrphanagesMap.css'
import {Link} from 'react-router-dom'
import {FiPlus,FiArrowRight} from 'react-icons/fi'
import {Map,TileLayer,Marker,Popup} from 'react-leaflet'
import Leaflet from 'leaflet'
import api from '../services/api'
const mapIcon=Leaflet.icon({
    iconUrl:mapMarkerImg,
    iconSize:[58,68],
    iconAnchor:[29,68],
    popupAnchor:[170,2]
})
interface Orphanage{
    id:number,
    name:string,
    latitude:number,
    longitude:number
}

function OrphanagesMap(){

    const [orphanages,setOrphanages]=useState<Orphanage[]>([])
    useEffect(()=>{
        api.get('/orphanages').then(res=>setOrphanages(res.data))
    },[])
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Map Marker"/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
                <footer>
                    <strong>Contagem</strong>
                    <span>Minas Gerais</span>
                </footer>
            </aside>
            <Map center={[-19.8910492,-44.1539687]}
                zoom={12}
                style={{width:"100%",height:"100%"}}
            >
                {/* <TileLayer url={`http://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/> */}
                <TileLayer url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}/>
               {orphanages.map(orphanage=><Marker key={orphanage.id} icon={mapIcon} position={[orphanage.latitude,orphanage.longitude]}>
                    <Popup className="map-popup" closeButton={false} minWidth={240} maxWidth={240} >
                        {orphanage.name}
                        <Link to={`/orphanage/${orphanage.id}`}>
                            <FiArrowRight size={20} color="#fff"/>
                        </Link>
                    </Popup>
                </Marker>)}
            </Map>
            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#ffffff"/>
            </Link>

        </div>
    )
}
export default OrphanagesMap