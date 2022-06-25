/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import FileUpload from '../../components/FileUpload'
import StepWrapper from '../../components/StepWrapper'
import MainLayout from '../../layouts/MainLayout'
import { Button, Grid, TextField } from '@mui/material'
import { useInput } from '../../hooks/useInput'
import axios from '../../node_modules/axios/index'
import { useRouter } from '../../node_modules/next/router'
import { URL } from '../../pars/server'

const create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput('')
  const artist = useInput('')
  const text = useInput('')
  const router = useRouter()

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1);
    } else {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('artist', artist.value)
      formData.append('text', text.value)
      formData.append('picture', picture)
      formData.append('audio', audio)
      axios.post(`${URL}tracks`, formData)
        .then(resp => router.push('/tracks'))
        .catch(e => console.log(e))
    }
  }

  const back = () => {
    setActiveStep(prev => prev - 1);
  }

  return (
    <MainLayout title='Загрузка трека'>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 &&
          <Grid container direction={"column"} style={{ padding: 20 }}>
            <TextField style={{ marginTop: 10 }} label={"Название трека"} {...name}/>
            <TextField style={{ marginTop: 10 }} label={"Имя исполнителя"} {...artist}/>
            <TextField style={{ marginTop: 10 }} label={"Слова к треку"} multiline rows={3} {...text}/>
          </Grid>
        }
        {activeStep === 1 &&
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Загрузить изображение</Button>
          </FileUpload>
        }
        {activeStep === 2 &&
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Загрузить трек</Button>
          </FileUpload>
        }
      </StepWrapper>
      <Grid container justifyContent='space-between'>
        <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
        <Button onClick={next}>Далее</Button>
      </Grid>
    </MainLayout>
  )
}

export default create