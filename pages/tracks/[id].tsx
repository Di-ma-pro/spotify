import React, { useState } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Button, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import { ITrack } from '../../types/track'
import axios from 'axios'
import { useInput } from '../../hooks/useInput'
import { URL } from '../../pars/server'

const TrackPage = ({ serverTrack }) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter();
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post(`${URL}tracks/comment`, {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({...track, comments: [...track.comments, response.data]})
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <MainLayout title={'Spotify - ' + track.name + ' - ' + track.artist} keywords={`${track.name}, ${track.artist}`}>
            <Button onClick={() => router.push('/tracks')} variant={"outlined"} style={{ fontSize: 32 }}>
                К списку
            </Button>
            <Grid container style={{ margin: 30 }}>
                <img src={URL + track.picture} width={200} height={200} />
                <div style={{ margin: '20px 0' }}>
                    <h1>Название трека - {track.name}</h1>
                    <h1>Исполнитель - {track.artist}</h1>
                    <h1>Прослушиваний - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Слова</h1>
            <p>{track.text}</p>
            <h1>Комментарий</h1>
            <Grid container>
                <TextField label="Ваше имя" fullWidth {...username}/>
                <TextField multiline rows={4} label="Комментарий" fullWidth {...text}/>
                <Button onClick={addComment}>Отправить</Button>
            </Grid>
            <div>
                {track.comments.map(comment =>
                    <div key={comment._id}>
                        <div>Автор - {comment.username}</div>
                        <div>Комментарий - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    )
}

export default TrackPage

export const getServerSideProps = async ({params}) => {
    const response = await axios.get(`${URL}tracks/` + params.id)
    
    return {
        props: {
            serverTrack: response.data
        }
    }
}