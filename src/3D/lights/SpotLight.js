import React, { useRef, useState } from 'react'
import THREE from '../three'
import { useHelper } from '@react-three/drei'
import color from '../../utils/colors.json'
import LightControls from './LightControls'

const SpotLight = (props) => {
  const { enableHelper, modify } = props
  const [mainColor, setColor] = useState(color.lavender)
  const [intensity, setIntensity] = useState(100)
  const [position, setPosition] = useState([0, 3, 0])
  const light = useRef()
  useHelper(enableHelper ? light : {}, THREE.SpotLightHelper, 'cyan')
  return (<>
    <spotLight ref={light} color={mainColor} intensity={intensity / 100} position={position} castShadow />
    {modify && <LightControls
      name='spot'
      updateMainColor={setColor}
      updateIntensity={setIntensity}
      updatePosition={setPosition}
      initialPosition={[0, 3, 0]}
    />}
  </>)
}

export default SpotLight
