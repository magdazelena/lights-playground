import React, { useState, useEffect } from 'react'
import { Html } from '@react-three/drei'
import { ChromePicker } from 'react-color'
import color from '../../utils/colors.json'

export default function LightControls(props) {
  const { updateMainColor, updateGroundColor, updateIntensity, name, updatePosition, initialPosition } = props
  const [mainColor, setColor] = useState(color.powder)
  const [groundColor, setGroundColor] = useState(color.dark)
  const [intensity, setIntensity] = useState(100)
  const [position, setPosition] = useState([])

  useEffect(() => {
    if (mainColor) updateMainColor(mainColor)
  }, [mainColor, updateMainColor])

  useEffect(() => {
    if (!updateGroundColor) return
    if (groundColor) updateGroundColor(groundColor)
  }, [groundColor, updateGroundColor])

  useEffect(() => {
    if (intensity) updateIntensity(intensity)
  }, [intensity, updateIntensity])

  useEffect(() => {
    if (!initialPosition || !updatePosition) return
    if (!position.length) setPosition(initialPosition)
  }, [initialPosition])

  useEffect(() => {
    if (!updatePosition) return
    updatePosition(position)
  }, [position, updatePosition])

  const changePosition = (e, axis) => {
    const tmp_position = [...position]
    tmp_position[axis] = e.target.value / 2
    setPosition(tmp_position)
  }
  return <Html as='div' center className={`${name}light lightcolor`}>
    <p>{name} base color</p>
    <ChromePicker color={mainColor} onChange={color => setColor(color.hex)} />
    {updateGroundColor && (<>
      <p>{name} ground color</p>
      <ChromePicker color={groundColor} onChange={color => setGroundColor(color.hex)} />
    </>)}

    <p><label for="intensity">Intensity: {intensity / 100}</label></p>
    <input type="range" id="intensity" name="intensity"
      value={intensity}
      onChange={e => setIntensity(e.target.value)}
      min="0" max="100" />
    {updatePosition && <>
      <p>Position: {position.toString()}</p>
      <p><label for='x'>X: </label></p>
      <input type="range" id="x" name="x"
        value={position[0]}
        onChange={e => changePosition(e, 0)}
        min="-15" max="15" />
      <p><label for='y'>Y: </label></p>
      <input type="range" id="y" name="x"
        value={position[1]}
        onChange={e => changePosition(e, 1)}
        min="-15" max="15" />
      <p><label for='z'>Z: </label></p>
      <input type="range" id="z" name="z"
        value={position[2]}
        onChange={e => changePosition(e, 2)}
        min="-15" max="15" />
    </>}
  </Html>
}