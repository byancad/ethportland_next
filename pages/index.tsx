import { Box, Button, Heading, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Container } from '@chakra-ui/react'

const Landing: NextPage = () => {
  return (
    <div>
      <Head>
       
      </Head>

      <main>
      <Container centerContent>
        <Box>
          <Heading fontSize={52}>
              SkaleStub
          </Heading>
        
        </Box>
        <p>A ticketing platform for the Web3 Community</p>
        <Button colorScheme='blue'>
          
          <Link href="/home">go to dapp</Link>
          </Button>
      </Container>
  
       
      </main>

    
    </div>
  )
}

export default Landing;
