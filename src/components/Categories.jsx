import FlowingMenu from './FlowingMenu'

const Categories = () => {
  const demoItems = [
  { link: '#', text: 'Tech', image: '/tech.jpg' },
  { link: '#', text: 'Literature', image: '/literature1.jpg' },
  { link: '#', text: 'Research', image: '/research1.jpg' },
  { link: '#', text: 'Miscellaneous', image: '/miscellaneous.jpg' }
];
  return (
    <>
    <h2 className="subsection">Browse Categories</h2>
    <div style={{ height: '600px', position: 'relative'}}>
        <FlowingMenu items={demoItems} />
    </div>
    </>
  )
}

export default Categories