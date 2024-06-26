import React, { useEffect, useState } from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import { useSearchParams } from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'

type TechType = {
  id: number
  tech: string
  developer: string
}

type ParamsType = {
  sort: string
  page: number
  count: number
}

const getTechs = (params: ParamsType) => {
  return axios.get<{ techs: TechType[]; totalCount: number }>('https://samurai.it-incubator.io/api/3.0/homework/test3', { params }).catch((e) => {
    alert(e.response?.data?.errorText || e.message)
  })
}

const HW15 = () => {
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(4)
  const [idLoading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(100)
  const [searchParams, setSearchParams] = useSearchParams()
  const [techs, setTechs] = useState<TechType[]>([])

  const sendQuery = (params: ParamsType) => {
    console.log(params)
    setLoading(true)
    getTechs(params).then((res) => {
      setTechs(res?.data?.techs as TechType[])
      setTotalCount(res?.data?.totalCount as number)
      const newParams = new URLSearchParams({ page: String(params.page), count: String(params.count) })
      setSearchParams(newParams)
    })
  }

  const onChangePagination = (newPage: number, newCount: number) => {
    setCount(newCount)
    setPage(newPage)

    sendQuery({ page: newPage, count: newCount, sort: sort })
  }

  const onChangeSort = (newSort: string) => {
    setSort(newSort)
    setPage(1)
    sendQuery({ page, count, sort: newSort })
  }

  useEffect(() => {
    const params = Object.fromEntries(searchParams)
    console.log(params)
    setPage(+params.page || 1)
    setCount(+params.count || 4)

    sendQuery({ page: +params.page || page, count: +params.count || count, sort: sort })
  }, [])

  const mappedTechs = techs.map((t) => (
    <div key={t.id} className={s.row}>
      <div id={'hw15-tech-' + t.id} className={s.tech}>
        {t.tech}
      </div>

      <div id={'hw15-developer-' + t.id} className={s.developer}>
        {t.developer}
      </div>
    </div>
  ))

  return (
    <div id={'hw15'}>
      <div className={s2.hwTitle}>Homework #15</div>

      <div className={s2.hw}>
        {idLoading && (
          <div id={'hw15-loading'} className={s.loading}>
            Loading...
          </div>
        )}

        <SuperPagination page={page} itemsCountForPage={count} totalCount={totalCount} onChange={onChangePagination} />

        <div className={s.rowHeader}>
          <div className={s.techHeader}>
            tech
            <SuperSort sort={sort} value={'tech'} onChange={onChangeSort} />
          </div>

          <div className={s.developerHeader}>
            developer
            <SuperSort sort={sort} value={'developer'} onChange={onChangeSort} />
          </div>
        </div>

        {mappedTechs}
      </div>
    </div>
  )
}

export default HW15
