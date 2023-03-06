<script lang="ts">
    import { GLTF } from '@threlte/extras'
    import { Canvas, InteractiveObject, OrbitControls, T } from '@threlte/core'
    import { spring } from 'svelte/motion'
    import { degToRad } from 'three/src/math/MathUtils'

    const scale = spring(0.015)
</script>
<T.PerspectiveCamera makeDefault position={[-10, 0, 10]} fov={35}>
    <OrbitControls maxPolarAngle={degToRad(75)} enableZoom={false} target={{ y: 0.5 }} autoRotate autoRotateSpeed=0.5/>
</T.PerspectiveCamera>

<T.DirectionalLight castShadow position={[3, 10, 10]} />
<T.DirectionalLight position={[-3, 10, -10]} intensity={3} />
<T.AmbientLight color="white" intensity="{1.5}"/>

<T.Mesh receiveShadow rotation.x={degToRad(-90)}>
    <T.CircleGeometry args={[2, 72]} />
    <T.MeshStandardMaterial color="yellow" />
</T.Mesh>

<GLTF
    castShadow receiveShadow url={'/TaxiBeepBeep.glb'} position={{ y: 0 }} scale={$scale} useDraco
<InteractiveObject
            interactive
            on:pointerenter={() => ($scale = 0.019)}
            on:pointerleave={() => ($scale = 0.015)}
    />
/>
