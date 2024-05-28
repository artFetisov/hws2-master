import React from 'react'

// добавить в проект иконки и импортировать
const downIcon = '[\\/]'
const upIcon = '[/\\]'
const noneIcon = '[--]'

export type SuperSortPropsType = {
  id?: string
  sort: string
  value: string
  onChange: (newSort: string) => void
}

export const pureChange = (sort: string, down: string, up: string) => {
  console.log(sort, down, up)
  // пишет студент, sort: (click) => down (click) => up (click) => '' (click) => down ...
  return sort === '' ? down : sort === down ? up : ''
}

const SuperSort: React.FC<SuperSortPropsType> = ({ sort, value, onChange, id = 'hw15' }) => {
  const up = '0' + value
  const down = '1' + value

  const onChangeCallback = () => {
    onChange(pureChange(sort, down, up))
  }

  const icon = sort === down ? downIcon : sort === up ? upIcon : noneIcon

  return (
    <span id={id + '-sort-' + value} onClick={onChangeCallback}>
      <span id={id + '-icon-' + sort}>{icon}</span>

      {/*    src={icon}*/}
      {/*/>*/}
    </span>
  )
}

export default SuperSort
