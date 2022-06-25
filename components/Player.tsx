import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import styles from '../styles/Player.module.scss'
import TrackProgress from './TrackProgress'
import axios from '../node_modules/axios/index'
import {URL} from '../pars/server'

let audio;

const Player: React.FC = () => {
    const {pause, volume, active, duration, currentTime} = useTypedSelector(state => state.player);
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions();

    useEffect(() => {
        if (!audio) {
            audio = new Audio()

            audio.addEventListener('pause', () => {
                pauseTrack()
            })
            audio.addEventListener('play', () => {
                playTrack()
            })
        } else {
            setAudio()
            audio.play()
        }

        return () => {
            audio.removeEventListener('pause', () => {
                pauseTrack()
            })
            audio.removeEventListener('play', () => {
                playTrack()
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active])

    const setAudio = () => {
        if (active) {
            audio.src = URL + active.audio
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    const play = () => {
        if (pause) {
            audio.play()
        } else {
            audio.pause()
        }
    }

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value))
    }

    const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value)
        setCurrentTime(Number(e.target.value))
    }

    const addListen = async () => {
        await axios.post('http://localhost:5000/listen/' + active._id)
    }

    if (currentTime === duration && active) {
        addListen()
    }

    if (!active) {
        return null;
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {!pause
                    ? <Pause />
                    : <PlayArrow />
                }
            </IconButton>
            <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
                <div>{active?.name}</div>
                <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
            </Grid>
            <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}}/>
            <TrackProgress left={volume} right={100} onChange={changeVolume}/>
        </div>
    )
}

export default Player