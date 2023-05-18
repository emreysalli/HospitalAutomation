import React from 'react';
import { Box, Stack, Text, HStack, Image, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';

const PrescriptionCard = ({ prescription }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate({
          name: 'MedicinesScreen',
          params: { prescriptionId: prescription.id },
        })
      }
    >
      <Box rounded="lg" bg="#FAFAF9" shadow={2} w="100%">
        <HStack>
          <Stack py="4" pl="2" space={4} w="92%">
            <HStack px="2">
              <Image
                source={require('../assets/icons/person-outline.png')}
                alt="person"
              />
              <Text pt={0.5} pl="2" color="black" fontSize="md">
                {prescription.doctor}
              </Text>
            </HStack>
            <HStack px="2">
              <Image
                source={require('../assets/icons/calendar-outline.png')}
                alt="calendar"
              />
              <Text pt={0.5} pl="2" color="black" fontSize="md">
                {prescription.date}
              </Text>
            </HStack>
            <HStack px="2">
              <Image
                source={require('../assets/icons/document-outline.png')}
                alt="document"
              />
              <Text pt={0.5} pl="2" color="black" fontSize="md">
                {prescription.prescriptionNo}
              </Text>
            </HStack>
          </Stack>
          <Box
            w="8%"
            rounded="lg"
            style={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../assets/icons/arrow.png')}
              alt="arrow"
              mr={4}
            />
          </Box>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default PrescriptionCard;
