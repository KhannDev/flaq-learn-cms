import React from 'react'
import * as solanaWeb3 from '@solana/web3.js'
import * as bip39 from 'bip39'
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Hide,
  Text,
} from '@chakra-ui/react'
import { useCreateWalletStore } from '../../../store/create-wallet'

function GenKeyPair() {
  const { Keypair } = solanaWeb3
  const userWalletDetails = useCreateWalletStore(
    (state) => state.userWalletDetails,
  )
  const setUserWalletDetails = useCreateWalletStore(
    (state) => state.setUserWalletDetails,
  )

  const generateKey = async () => {
    const mnemonic = bip39.generateMnemonic()
    const seed = bip39.mnemonicToSeedSync(mnemonic, '') // (mnemonic, password)
    const keypair = Keypair.fromSeed(seed.slice(0, 32))

    setUserWalletDetails({
      publicKey: keypair.publicKey.toString(),
      seedPhrase: mnemonic,
    })
  }

  const isUserDataAvailable = () => {
    return (
      userWalletDetails.publicKey.length !== 0 ||
      userWalletDetails.seedPhrase.length !== 0
    )
  }

  return (
    <Box>
      <Center my="8">
        <Button variant={'primarybtn'} onClick={generateKey}>
          Create New Wallet
        </Button>
      </Center>

      {isUserDataAvailable() && (
        <Flex
          borderWidth={'0.5px'}
          borderColor="whiteAlpha.200"
          borderRadius="2xl"
          p={2}
          mt={4}
          flexDirection={{ base: 'column', md: 'column', lg: 'row' }}
          gap={{ md: 4 }}
        >
          <Flex
            flexDirection={'column'}
            justifyContent="center"
            alignItems={{ lg: 'center', base: 'flex-start' }}
            gap={{ base: 2, md: 4 }}
          >
            <Box>
              <Text fontFamily={'Dela Gothic One'}>Secret Recovery Phrase</Text>
            </Box>
            <Box
              style={{
                borderImage: 'linear-gradient(60deg, #a6ebc9, #005704)',
                borderImageSlice: 1,
              }}
              borderRadius={'8px'}
              border="1px solid transparent"
              textAlign="center"
              as="samp"
              px="2"
              py="4"
            >
              {userWalletDetails.seedPhrase}
            </Box>
          </Flex>

          <Hide below="lg">
            <Divider orientation="vertical" height="23ex" m="4" />
          </Hide>
          <Hide above="md">
            <Divider orientation="horizontal" width={'90%'} m="4" />
          </Hide>
          <Flex
            flexDirection={'column'}
            justifyContent="center"
            alignItems={{ lg: 'center', base: 'flex-start' }}
            gap={{ base: 2, md: 4 }}
          >
            <Box>
              <Text fontFamily={'Dela Gothic One'}>Your Public Key</Text>
            </Box>
            <Box maxW={{ base: '70vw' }}>
              <Text as="samp" px="2">
                {userWalletDetails.publicKey}
              </Text>
            </Box>
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

export default GenKeyPair
