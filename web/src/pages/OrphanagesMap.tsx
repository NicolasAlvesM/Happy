import React from 'react'
import mapMarkerImg from '../images/map-marker.svg'
import '../styles/pages/OrphanagesMap.css'
import {Link} from 'react-router-dom'
import {FiPlus} from 'react-icons/fi'
import {Map,TileLayer} from 'react-leaflet'
function OrphanagesMap(){
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
            <Map center={[-19.9129242,-44.1367639]}
                zoom={15}
                style={{width:"100%",height:"100%"}}
            >
                <TileLayer url={`http://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#ffffff"/>
            </Link>

        </div>
    )
}
export default OrphanagesMap