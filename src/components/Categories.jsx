import FlowingMenu from './FlowingMenu'

const Categories = () => {
  const demoItems = [
  { link: '#', text: 'Tech', image: 'https://picsum.photos/600/400?random=1' },
  { link: '#', text: 'Literature', image: 'https://picsum.photos/600/400?random=2' },
  { link: '#', text: 'Research', image: 'https://picsum.photos/600/400?random=3' },
  { link: '#', text: 'Miscellaneous', image: 'https://picsum.photos/600/400?random=4' }
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