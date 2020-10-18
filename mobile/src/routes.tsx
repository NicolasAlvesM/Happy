import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import OrphanagesMap from './pages/OrphanagesMap'
import OrphanageDetails from './pages/OrphanageDetails'
import OrphanageData from './pages/CreateOrphanage/OrphanageData'
import SelectMapPosition from './pages/CreateOrphanage/SelectMapPosition'
import Header from './components/Header'
const Stack = createStackNavigator()
function Routes(){
    return(
        <NavigationContainer>
           <Stack.Navigator screenOptions={{headerShown:false,cardStyle:{backgroundColor:"#f2f3f5"}}}>
                <Stack.Screen name="orphanagesMap" component={OrphanagesMap}/>
                <Stack.Screen 
                name="orphanagesDetails" 
                component={OrphanageDetails}
                options={{
                    headerShown:true,
                    header:()=><Header showCancel={false} title="Orphanage Details"/>
                }}
                />
                <Stack.Screen 
                name="selectMapPosition" 
                component={SelectMapPosition}
                options={{
                    headerShown:true,
                    header:()=><Header showCancel={false} title="Selecione no mapa"/>
                }}/>
                <Stack.Screen 
                name="orphanageData" 
                component={OrphanageData}
                options={{
                    headerShown:true,
                    header:()=><Header showCancel={true} title="Informe os dados"/>
                }}
                />
           </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Routes