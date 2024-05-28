import React, { useEffect, useState } from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW14.module.css'
import axios, { AxiosResponse } from 'axios'
import SuperDebouncedInput from './common/c8-SuperDebouncedInput/SuperDebouncedInput'
import { useSearchParams } from 'react-router-dom'

export interface IAxiosResp {
  techs: string[]
}

const getTechs = (find: string) => {
  return axios
    .get<IAxiosResp>('https://samurai.it-incubator.io/api/3.0/homework/test2', { params: { find } })

    .catch((e) => {
      alert(e.response?.data?.errorText || e.message)
    })
}

const HW14 = () => {
  const [find, setFind] = useState('')
  const [isLoading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const [techs, setTechs] = useState<string[]>([])

  const sendQuery = (value: string) => {
    setLoading(true)
    getTechs(value).then((res) => {
      setTechs(res?.data?.techs as string[])
    })
  }

  const onChangeText = (value: string) => {
    setFind(value)
    setSearchParams({ find: value })
  }

  useEffect(() => {
    const params = Object.fromEntries(searchParams)
    sendQuery(params.find || '')
    setFind(params.find || '')
  }, [])

  const mappedTechs = techs.map((t) => (
    <div key={t} id={'hw14-tech-' + t} className={s.tech}>
      {t}
    </div>
  ))

  return (
    <div id={'hw14'}>
      <div className={s2.hwTitle}>Homework #14</div>

      <div className={s2.hw}>
        <SuperDebouncedInput id={'hw14-super-debounced-input'} value={find} onChangeText={onChangeText} onDebouncedChange={sendQuery} />

        <div id={'hw14-loading'} className={s.loading}>
          {isLoading ? '...ищем' : <br />}
        </div>

        {mappedTechs}
      </div>
    </div>
  )
}

export default HW14
