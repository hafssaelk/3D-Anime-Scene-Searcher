/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
 

import {useEffect, useRef} from 'react'
import  {useAnimations, useGLTF}  from '@react-three/drei';

import planedScene from '../assets/3d/plaine.glb';


const Plane = ({isRotating, ...props}) => {
  const ref = useRef();
  const {scene, animations } = useGLTF (planedScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    console.log({isRotating});
    if(isRotating){
      actions["Take 001"].play();
    } else{
      actions["Take 001"].play();
    }

  }, [actions, isRotating]);
  return (
	<mesh {...props}  ref ={ref}>
    <primitive object={scene} />

  </mesh>
  )
}

export default Plane