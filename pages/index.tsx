import { Box, Button, Heading, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Container } from '@chakra-ui/react'

const Landing: NextPage = () => {
  return (
    <div 	>
    
      <Box
  backgroundImage="/small_portland.jpg"
  backgroundRepeat="no-repeat"
  backgroundSize="cover">
  <Head>
       
       </Head>
       <main>
      <Container centerContent marginTop={40} padding={20}>
        
          <Heading fontSize={52}  >
              SkaleStub
          </Heading>
        
        <div>A ticketing platform for the Web3 Community</div>
        <Button margin={10}>
          <Link href="/home">go to dapp</Link>
          </Button>
      </Container>
  
       
      </main>


  </Box>
 

    
    </div>
  )
}

export default Landing;
