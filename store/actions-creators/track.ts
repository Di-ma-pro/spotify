import { Dispatch } from "react"
import axios from "axios"
import { TrackAction, TrackActionTypes } from "../../types/track"
import { URL } from '../../pars/server'

export const fetchTracks = () => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const responce = await axios.get(`${URL}tracks`)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: responce.data})
        } catch (e) {
            dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Произошла ошибка при загрузке треков'})
        }
    }
}


export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            const responce = await axios.get(`${URL}tracks/search?query=` + query)
            dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: responce.data })
        } catch (e) {
            dispatch({ type: TrackActionTypes.FETCH_TRACKS_ERROR, payload: 'Произошла ошибка при загрузке треков' })
        }
    }
}