import React, { DetailedHTMLProps, InputHTMLAttributes, ReactNode, useRef, useState } from 'react'
import SuperInputText from '../../../hw04/common/c1-SuperInputText/SuperInputText'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
export type SuperDebouncedInputPropsType = Omit<DefaultInputPropsType, 'type'> & {
  // и + ещё пропсы которых нет в стандартном инпуте
  onChangeText?: (value: string) => void
  onEnter?: () => void
  error?: ReactNode
  spanClassName?: string
} & {
  // илм экспортировать тип SuperInputTextPropsType
  // плюс специальный пропс SuperPagination
  onDebouncedChange?: (value: string) => void
}

const SuperDebouncedInput: React.FC<SuperDebouncedInputPropsType> = ({
  onChangeText,
  onDebouncedChange,

  ...restProps
}) => {
  const debRef = useRef<ReturnType<typeof setTimeout>>()

  const onChangeTextCallback = (value: string) => {
    onChangeText?.(value)

    if (onDebouncedChange) {
      clearTimeout(debRef.current)
      debRef.current = setTimeout(() => {
        onDebouncedChange(value)
      }, 1500)
    }
  }

  return <SuperInputText onChangeText={onChangeTextCallback} {...restProps} />
}

export default SuperDebouncedInput
