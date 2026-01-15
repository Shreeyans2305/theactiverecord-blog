import FlowingMenu from './FlowingMenu'

const Categories = () => {
  const demoItems = [
  { link: '/category/tech', text: 'Tech', image: '/tech.jpg' },
  { link: '/category/literature', text: 'Literature', image: '/literature1.jpg' },
  { link: '/category/research', text: 'Research', image: '/research1.jpg' },
  { link: '/category/misc', text: 'Miscellaneous', image: '/miscellaneous.jpg' }
];
  return (
    <>
    <h1 className="subsection">Browse Categories</h1>
    <div style={{ height: '600px', position: 'relative'}}>
        <FlowingMenu items={demoItems} />
    </div>
    </>
  )
}

export default Categories