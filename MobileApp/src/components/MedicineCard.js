import React from 'react';
import { Box, Stack, Text, HStack, Image } from 'native-base';

const MedicineCard = ({ medicine }) => {
  return (
    <Box rounded="lg" bg="#FAFAF9" shadow={2} w="100%">
      <HStack>
        <Box
          w="8%"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            top: 20,
            left: 10,
          }}
        >
          <Image
            source={require('../assets/icons/medicine.png')}
            alt="medicine"
            height={10}
            widht={10}
            p={5}
          />
        </Box>
        <Stack py="4" pl="2" space={4} w="88%">
          <HStack px="2">
            <Text pt={0.5} pl="2" color="black" fontSize="2xl">
              {medicine.medicineName}
            </Text>
          </HStack>

          <HStack px="2" style={{ justifyContent: 'space-evenly' }} ml="-12">
            <Text pl="2" fontSize="md" fontWeight="light">
              Kullanım Şekli
            </Text>
            <Text pl="2" fontSize="md" fontWeight="light" style={{ right: 30 }}>
              Periyot
            </Text>
          </HStack>
          <HStack px="2" style={{ justifyContent: 'space-evenly' }} ml="-12">
            <Text pl="2" color="black" fontSize="md" fontWeight="semibold">
              {medicine.medicineUsage}
            </Text>
            <Text pl="2" color="black" fontSize="md" fontWeight="semibold">
              {medicine.period}
            </Text>
          </HStack>
          <HStack px="2" style={{ justifyContent: 'space-evenly' }} ml="-12">
            <Text pl="2" fontSize="md" fontWeight="light">
              Kullanım Sayısı
            </Text>
            <Text pl="2" fontSize="md" fontWeight="light" style={{ right: 44 }}>
              Doz
            </Text>
          </HStack>
          <HStack px="2" style={{ justifyContent: 'space-evenly' }} ml="-12">
            <Text pl="2" color="black" fontSize="md" fontWeight="semibold">
              {medicine.numberOfUses}
            </Text>
            <Text pl="2" color="black" fontSize="md" fontWeight="semibold">
              {medicine.dose}
            </Text>
          </HStack>
        </Stack>
      </HStack>
    </Box>
  );
};

export default MedicineCard;
