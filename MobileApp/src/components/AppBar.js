import { StatusBar, Box, HStack, Text, Image } from 'native-base';

// The app bar at the top shows the brand
const AppBar = () => {
  return (
    <>
      <StatusBar bg="#3700B3" barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" />
      <HStack
        bg="#0891B3"
        px="1"
        py="3"
        w="100%"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Image
          source={require('../assets/logos/saglik-bakanligi-logo.png')}
          resizeMode="contain"
          size="xl"
          style={{
            width: 40,
            height: 40,
            marginLeft: 10,
          }}
          alt="saglik-bakanligi-logo"
        />
        <Text color="white" fontSize="25" fontWeight="bold">
          HBYS
        </Text>

        <Image
          source={require('../assets/logos/hospital.png')}
          resizeMode="contain"
          size="xl"
          style={{
            width: 40,
            height: 40,
            marginLeft: 10,
          }}
          alt="hospital"
        />
      </HStack>
    </>
  );
};

export default AppBar;
