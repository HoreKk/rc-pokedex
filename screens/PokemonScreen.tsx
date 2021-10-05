import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { TYPE_COLORS } from '../config'

import type { RootStackScreenProps } from '../types/navigation'
import type { Pokemon } from '../types/pokemon';

export default function PokemonScreen({ route } : RootStackScreenProps<'PokemonModal'>) {

  const [isLoading, setIsLoading] = useState(true)
  const [pokemon, setPokemon] = useState<any>({})

  useEffect(() => {

    async function fetchPokemon() {
      const url = route.params?.url || ''
      const pokemon = await fetch(url).then(response => response.json())

      pokemon.sprite = pokemon.sprites.front_default

      setPokemon(pokemon)
      setIsLoading(false)
    }

    fetchPokemon()

  }, [])

  return (
    <View style={styles.container}>
      {!isLoading && (
        <>
          <View style={styles.card}>
            <Pressable onPress={() => setPokemon({ ...pokemon, 
              sprite: pokemon.sprite == pokemon.sprites.front_default ? pokemon.sprites.back_default : pokemon.sprites.front_default 
            })}
            onLongPress={() => setPokemon({ ...pokemon, sprite: pokemon.sprites.front_shiny })}
            >
              <Image style={styles.image} source={{ uri: pokemon.sprite }} />
            </Pressable>
            <Text style={styles.title} numberOfLines={1}>{ pokemon.name }</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  card: {
    flex: 1,
    maxHeight: 300,
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 25,
    borderRadius: 15
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  }
});
