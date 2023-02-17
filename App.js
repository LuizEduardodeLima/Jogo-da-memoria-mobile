import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, Button } from 'react-native';
import { useState, useCallback, useEffect } from 'react';
import { meuArray } from './Card'
import { useFonts, CourierPrime_400Regular_Italic } from '@expo-google-fonts/courier-prime';

export default function App() {

  let [fontsLoaded] = useFonts({
    CourierPrime_400Regular_Italic
  });
  


  const [iniciar, setIniciar] = useState(false) 
  useEffect(() => {
    setCarta(...carta)
    setIniciar(false)
  }, []);

  const imagens = [
    { id: 1, source: require('./assets/tenis.png'), status:null },
    { id: 2, source: require('./assets/01.png'), status:null },
    { id: 3, source: require('./assets/03.png'), status:null },
    { id: 4, source: require('./assets/04.png'), status:null },
    { id: 5, source: require('./assets/05.png'), status:null },
    { id: 6, source: require('./assets/06.png'), status:null },
    { id: 7, source: require('./assets/07.png'), status:null },
    { id: 8, source: require('./assets/08.png'), status:null },
    { id: 9, source: require('./assets/09.png'), status:null },
    { id: 10, source: require('./assets/00.png'), status:null },
    { id: 11, source: require('./assets/01.png'), status:null },
    { id: 12, source: require('./assets/03.png'), status:null },
    { id: 13, source: require('./assets/04.png'), status:null },
    { id: 14, source: require('./assets/05.png'), status:null },
    { id: 15, source: require('./assets/06.png'), status:null },
    { id: 16, source: require('./assets/07.png'), status:null },
    { id: 17, source: require('./assets/08.png'), status:null },
    { id: 18, source: require('./assets/09.png'), status:null },
    { id: 19, source: require('./assets/tenis.png'), status:null },
    { id: 11, source: require('./assets/00.png'), status:null },
  ];

  function start(){
    let imagensEmbaralhadas = imagens.sort(() => Math.random() - 0.5)
    setCarta(imagensEmbaralhadas)
    setIniciar(true)
    setState(estados)
    setContador(0)
  }
  
  //Array responsavel por guarda o estado de cada card, virado = 0 -
  const estados = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  const [carta, setCarta] = useState([])
  //Estado salva como o card está 0 para não virado e 1 para virar a carta:
  const [state, setState] = useState(estados)
  //Estado salva primeira carta escolhida para depois comparamos:
  const [selects, setSelects] = useState(null)
  //Estado evita que mais de duas cartas sejam viradas:
  const [count, setCount] = useState(0)
  //Estado server para desativar botão temporariamente:
  const [control, setControl] = useState(false)
  //Mostrar placar de assertos:
  const [contador, setContador] =  useState(0)

  let url = require('./assets/card.png')

  function handlerPress(name, id){
    
    let copia = [...state]
    setCount(count + 1)

    if (count == 0){
      //Virando card:
      copia[id] = true
      setState(copia)
      setSelects(id)  
    }else if (count == 1){
      setControl(id)
      //Virando card:
      copia[id] = true
      setState(copia)
      //Verificando se jogador assertou:
      if(carta[selects].source === carta[id].source){
        copia[selects] = 1
        copia[id] = 1
        setCount(0)
        if(contador === 10){
          setContador(0)
        }
        setContador(contador + 1)
      }else{
        copia[selects] = 0
        copia[id] = 0
        setCount(0)
      }
    }
  }

  return (
    <SafeAreaView style={{height: '100%'}}>
      <View  style={styles.container}>
        <View style={styles.placar}>
          <Text style={{fontSize: 18, fontWeight: 'bold', 
              fontFamily: 'CourierPrime_700Bold_Italic'}}>Pontuação {contador}</Text>
        </View>
        
        <View style={{width: '60%', height: 60, marginTop:20 }}>
          <Button
              title='INICIAR'
              onPress={start}
            />
        </View>
        
        <View style={styles.box}>
          <View style={styles.tamanho}>
        {iniciar ? carta.map((item, index) => (
            <TouchableOpacity key={index} style={{width: '20%' }}
              disabled={state[index] ? true : false}
              onPress={() => handlerPress(item.source, index)}>
              { state[index] ? <Image source={item.source} style={styles.cards} /> : <Image source={url} style={styles.cards} /> }
            </TouchableOpacity>
        )) : console.log('Aperte Iniciar para começar o jogo...')}
            
          </View>
          
        </View>
      </View>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(31, 64, 118)',
    alignItems: 'center',
  },

  box: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgb(31, 64, 118)',
  },

  tamanho: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: 70,
  },

  cards: {
    width: '100%',
    height: 110,
    resizeMode: 'contain'
  },

  placar: {
    width: '80%',
    height: 60,
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: 20,
    backgroundColor: 'white',
    paddingTop: 15,
    alignItems: 'center',
    fontFamily: 'CourierPrime_700Bold_Italic',
  },
});
