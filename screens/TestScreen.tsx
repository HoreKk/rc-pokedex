import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const TestScreen = ({ route }) => {
  return (
    <Text>{ route.params }</Text>
  )
}

export default TestScreen