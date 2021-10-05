import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image, ListRenderItem } from 'react-native';

import type { Pokemon } from '../types/pokemon'

export const PokemonCard = ({ name, imagePokemon }: Pokemon) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.6}>
      <Image style={styles.image} source={{ uri: imagePokemon }} />
      <Text numberOfLines={1}>{ name }</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cabbe9',
    paddingBottom: 5,
    marginHorizontal: 5,
    marginBottom: 15,
    borderRadius: 10
  },
  image: {
    width: 80,
    height: 80
  }
});

export default PokemonCard