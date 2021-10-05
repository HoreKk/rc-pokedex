import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList, ActivityIndicator } from 'react-native';

import type { Pokemon, Pokemons } from '../types/pokemon'

import { PokemonCard } from '../components/PokemonCard'
import { RootTabScreenProps } from '../types/navigation';

export default function HomeScreen({ navigation } : RootTabScreenProps<'HomeScreen'>) {
  
  const [firstLoad, setFirstLoad] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(15);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  
  const [pokemons, setPokemons] = useState<Pokemons>([])

  const handleChangePage = (state: 'start' | 'back' | 'next' | 'end' ) => {
    switch (state) {
      case 'start':
        setOffset(0)
        break;
      case 'back':
        if (offset !== 0) setOffset(offset - limit)
        break;
      case 'next':
        setOffset(offset + limit)
        break;
      case 'end':
        setOffset(Math.ceil(count / limit) * limit - limit)
        break;
    }
  }

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)

      const { results, count } = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`).then(response => response.json())

      results.map((item: Pokemon) => {
        let splitUrl = item.url.split('/')
        item.id = splitUrl[splitUrl.length - 2]
        item.imagePokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`
      })      

      setPokemons(results)
      setIsLoading(false)
      if (firstLoad) {
        setFirstLoad(false)
        setCount(count)
      }
    }
    fetchData()
  }, [offset])

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: '100%', paddingHorizontal: 5, paddingTop: 15, paddingBottom: 5, flexGrow: 0 }}
        columnWrapperStyle={{ alignItems: 'center', justifyContent: 'center' }}
        data={pokemons}
        initialNumToRender={limit}
        numColumns={3}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PokemonCard 
            key={item.id} 
            name={item.name} 
            imagePokemon={item.imagePokemon} 
            handlePokemonModal={() => navigation.navigate('PokemonModal', { title: item.name, url: item.url })} 
          />
        )}
      />
      {!firstLoad && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
           <Button
            disabled={offset <= limit * 2}
            onPress={() => handleChangePage('start')}
            title="<<"
          />
          <Text style={{ marginHorizontal: 5 }} />
          <Button
            disabled={offset === 0}
            onPress={() => handleChangePage('back')}
            title="<"
          />
          <Text style={{ marginHorizontal: 15, fontSize: 18 }}>{ (offset + limit) / limit }</Text>
          <Button
            disabled={offset === Math.ceil(count / limit) * limit - limit}
            onPress={() => handleChangePage('next')}
            title=">"
          />
          <Text style={{ marginHorizontal: 5 }} />
          <Button
            disabled={offset >= Math.ceil(count / limit) * limit - limit * 2}
            onPress={() => handleChangePage('end')}
            title=">>"
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'flex-end'
  }
});
