import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList, ActivityIndicator } from 'react-native';

import { PokemonCard } from '../components/PokemonCard'
import { RootTabScreenProps } from '../types';

export type Pokemon = {
  id: string,
  name: string,
  url: string,
  imagePokemon: string,
}

type Pokemons = Pokemon[]

export default function HomeScreen({ navigation } : RootTabScreenProps<'HomeScreen'>) {

  const [pokemons, setPokemons] = useState<Pokemons>([])
  const [isLoading, setIsLoading] = useState(false);

  let [currentPage, setCurrentPage] = useState('https://pokeapi.co/api/v2/pokemon/?limit=30')
  let [nextPage, setNextPage] = useState<string | null>(null)
  let [previousPage, setPreviousPage] = useState<string | null>(null)

  useEffect(() => {

    async function fetchData() {
      setIsLoading(true)

      const response = await fetch(currentPage)
      const json = await response.json()

      json.results.map((item: Pokemon) => {
        let splitUrl = item.url.split('/')
        item.id = splitUrl[splitUrl.length - 2]
        item.imagePokemon = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`
      })      

      setPokemons(json.results)
      setNextPage(json.next)
      setPreviousPage(json.previous)
      setIsLoading(false)
    }

    fetchData()

  }, [])

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size="large" /> : (
        <FlatList
          style={{ width: '100%', paddingHorizontal: 10 }}
          columnWrapperStyle={{ alignItems: 'center', justifyContent: 'center' }}
          data={pokemons}
          numColumns={3}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <PokemonCard key={item.id} id={item.id} name={item.name} url={item.url} imagePokemon={item.imagePokemon} />
          )}
        />
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
