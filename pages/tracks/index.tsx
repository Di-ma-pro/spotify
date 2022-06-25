/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import TrackList from '../../components/TrackList'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import MainLayout from '../../layouts/MainLayout'
import { Box, Button, Card, Grid } from '@mui/material'
import { useRouter } from 'next/router'
import { fetchTracks, searchTracks } from '../../store/actions-creators/track'
import { NextThunkDispatch, wrapper } from '../../store/index'
import { TextField } from '../../node_modules/@mui/material/index'
import { useDispatch } from 'react-redux'

const index = () => {
  const router = useRouter();
  const {tracks, error} = useTypedSelector(state => state.track)
  const [query, setQuery] = useState<string>('')
  const dispatch = useDispatch() as NextThunkDispatch
  const [timer, setTimer] = useState(null)

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value))
      }, 500)
    )
  }

  if (error) {
    return <MainLayout>
      <h1>{error}</h1>
    </MainLayout>
  }

  return (
    <>
      <MainLayout title={'Список треков'}>
        <Grid container justifyContent='center'>
          <Card style={{ width: 900 }}>
            <Box p={3}>
              <Grid container justifyContent='space-between'>
                <h1>Список треков</h1>
                <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
              </Grid>
            </Box>
            <TextField fullWidth value={query} onChange={search} placeholder="Поиск"/>
          </Card>
        </Grid>
        <TrackList tracks={tracks}/>
      </MainLayout>
    </>
  )
}

export default index;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch as NextThunkDispatch
  await dispatch(await fetchTracks())
  return {
    props: {}
  }
})