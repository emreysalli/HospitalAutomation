import React from 'react';
import { Box, Stack, Text, HStack, Image } from 'native-base';

const PastAppointmentCard = ({ pastAppointment }) => {
  return (
    <Box rounded="lg" bg="#FAFAF9" shadow={2} w="100%">
      <HStack>
        <Box bg="#DCDEDD" w="4%" rounded="lg"></Box>

        <Stack py="4" pl="2" space={4} w="92%">
          <HStack
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
            bg="#DCDEDD"
            rounded="lg"
            w="100%"
            h="50px"
            px="2"
          >
            <HStack>
              <Image
                source={require('../assets/icons/calendar.png')}
                alt="takvim"
              />
              <Text
                pt={0.5}
                pl="2"
                color="black"
                fontSize="lg"
                fontWeight="bold"
              >
                {pastAppointment.appointmentDate}
              </Text>
            </HStack>

            <HStack>
              <Image
                source={require('../assets/icons/time.png')}
                alt="time"
                ml={2}
              />
              <Text
                pt={0.5}
                pl="2"
                color="black"
                fontSize="lg"
                fontWeight="bold"
              >
                {pastAppointment.appointmentHour}
              </Text>
            </HStack>
          </HStack>

          <HStack px="2">
            <Image
              source={require('../assets/icons/vials-outline.png')}
              alt="kisi"
            />
            <Text pt={0.5} pl="2" color="black" fontSize="md">
              {pastAppointment.polyclinicName}
            </Text>
          </HStack>

          <HStack px="2">
            <Image
              source={require('../assets/icons/person-outline.png')}
              alt="kisi"
            />
            <Text pt={0.5} pl="2" color="black" fontSize="md">
              {pastAppointment.doctor}
            </Text>
          </HStack>
          <HStack px="2">
            {pastAppointment.appointmentStatus === 0 ? (
              <Text
                pt={0.5}
                pl="2"
                fontSize="md"
                fontWeight="bold"
                color="success.700"
              >
                Geçmiş Randevu
              </Text>
            ) : (
              <Text
                pt={0.5}
                pl="2"
                fontSize="md"
                fontWeight="bold"
                color="error.700"
              >
                İptal Randevu
              </Text>
            )}
          </HStack>
        </Stack>
      </HStack>
    </Box>
  );
};

export default PastAppointmentCard;
