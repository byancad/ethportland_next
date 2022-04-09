import { Box, Button, Heading, Link } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Container } from '@chakra-ui/react'

const Landing: NextPage = () => {
  return (
    
    <div>
      <Box
    
  >
  <Head>
       
       </Head>
       <main>
      <Container centerContent marginTop={40} padding={20}>
        <Heading fontSize={90}  >
              STUB3
        </Heading>
          <div style={{ marginTop: "6px", fontWeight: "bold", fontSize: "20px"}}>A ticketing platform for the Web3 Community</div>
        <Button margin={6} opacity="100%" bgGradient='linear(to-l, #7928CA, #FF0080)' >
          <Link href="/home"  _focus={{ boxShadow: "none"  }} style={{ textDecoration: "none", fontSize: "20px" }}>
            Launch app
          </Link>
          </Button>
      </Container>
  
       
      </main>


  </Box>
 

    
    </div>
  )
}

export default Landing;
