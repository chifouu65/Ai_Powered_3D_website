
import React from 'react'
import { useSnapshot } from 'valtio'
import state from '../store'

const Button = ({
  title,
  type,
  customStyles,
  handleClick
}) => {

  const snap = useSnapshot(state)
  const generateStyle = (type) => {
    switch (type) {
      case 'filled':
        return {
          backgroundColor: snap.color,
          color: '#fff'
        }
      case 'outlined':
        return {
          backgroundColor: '#fff',
          color: '#000',
          border: '1px solid #000'
        }
      default:
        return {}
    }
  }

  return (
    <button
      className={`button px-2 py-1.5 flex-1 rounded-md ${customStyles}`}
      style={generateStyle(type)}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}

export default Button