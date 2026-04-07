'use client'

import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'

export function Earth() {
  const group = useRef<Group>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { nodes, materials } = useGLTF('/models/planet/scene-transformed.glb') as any

  return (
    <group ref={group} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-1.54, -0.06, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Clouds_1">
                <mesh
                  name="Object_4"
                  geometry={nodes.Object_4?.geometry}
                  material={materials.Clouds}
                />
              </group>
              <group name="Planet_2">
                <mesh
                  name="Object_6"
                  geometry={nodes.Object_6?.geometry}
                  material={materials.Planet}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

// Preload the model
useGLTF.preload('/models/planet/scene-transformed.glb')
