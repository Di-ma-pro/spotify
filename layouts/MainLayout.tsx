import React from 'react'
import Navbar from '../components/Navbar'
import Player from '../components/Player';
import { Container } from '@mui/material'
import Head from 'next/head';

interface MainL {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainL> = ({ children, title, description, keywords }) => {
  return (
    <>
      {/* Header */}
      <Head>
        <title>{title || 'Spotify'}</title>
        <meta name='description' content={'Музыкальная площадка стань музыкантом :) ' + description}/>
        <meta name='robots' content='index, follow' />
        <meta name='keywords' content={'Spotify, test, music, testMusic, ' + keywords} />
        <meta name='viewport' content='width=device-width, initial-scale=1'/>
      </Head>


      <Navbar />
      <Container style={{ margin: '90px auto' }}>
        {children}
      </Container>
      <Player />
    </>
  )
}

export default MainLayout