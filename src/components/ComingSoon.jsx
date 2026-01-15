import Beams from './Beams';

const ComingSoon = () => {
  return (
    <>
    <h2 className="subsection">Shop</h2>
    <div style={{ width: '100%', height: '600px', position: 'relative' }} className='bg-soon'>
    <Beams
        beamWidth={2}
        beamHeight={15}
        beamNumber={12}
        lightColor="#ffffff"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={0}
    >
        <h1 className='soon' id='Shop'>The Active Record Shop?? </h1>
        <h2 className='soon'>Work in Progress! Stay Tuned...</h2>
    </Beams>
    </div>
    </>
  )
}

export default ComingSoon