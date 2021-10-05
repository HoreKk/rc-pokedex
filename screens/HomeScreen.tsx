import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList, ActivityIndicator } from 'react-native';

import type { Pokemon, Pokemons } from '../types/pokemon'

import { PokemonCard } from '../components/PokemonCard'
import { RootTabScreenProps } from '../types/navigation';

export default function HomeScreen({ navigation } : RootTabScreenProps<'HomeScreen'>) {
  
  const [firstLoad, setFirstLoad] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(30);
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
        setOffset(Math.round(count / 30) * 30)
        break;
    }
  }

  useEffect(() => {

    setIsLoading(true)

    async function fetchData() {

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
      {isLoading ? <ActivityIndicator size={100} color="#0000ff" style={{ height: '91%' }} /> : (
        <FlatList
          style={{ width: '100%', paddingHorizontal: 10 }}
          columnWrapperStyle={{ alignItems: 'center', justifyContent: 'center' }}
          data={pokemons}
          initialNumToRender={30}
          numColumns={3}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PokemonCard key={item.id} id={item.id} name={item.name} url={item.url} imagePokemon={item.imagePokemon} />
          )}
        />
      )}
      {!firstLoad && (
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 15 }}>
           <Button
            disabled={offset < limit * 2}
            onPress={() => handleChangePage('start')}
            title="<<"
          />
          <Text style={{ marginHorizontal: 5 }} />
          <Button
            disabled={offset === 0}
            onPress={() => handleChangePage('back')}
            title="<"
          />
          <Text style={{ marginHorizontal: 15, fontSize: 18 }}>{ (offset + limit) / 30 }</Text>
          <Button
            disabled={offset === Math.round(count / limit) * limit}
            onPress={() => handleChangePage('next')}
            title=">"
          />
          <Text style={{ marginHorizontal: 5 }} />
          <Button
            disabled={offset > Math.round(count / limit) * limit - limit * 2}
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
    justifyContent: 'center',
    paddingTop: 45
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
  },
});
