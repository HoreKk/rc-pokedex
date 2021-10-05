import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ListRenderItem } from 'react-native';

import type { Pokemon } from '../screens/HomeScreen'

export const PokemonCard = ({ name, imagePokemon }: Pokemon) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: imagePokemon }} />
      <Text>{ name }</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    paddingBottom: 5,
    marginHorizontal: 5,
    marginBottom: 15
  },
  image: {
    width: 60,
    height: 60
  }
});

export default PokemonCard