import Bar from '@/components/Bar'

function Home () {

  return (
    <div>
      <Bar
        title='aaa'
        xData={['react', 'vue', 'angular']}
        yData={[30, 40, 50]}
        styler={{ width: '500px', height: '400px' }}
      />
      <Bar
        title='aaa'
        xData={['react', 'vue', 'angular']}
        yData={[30, 40, 50]}
        styler={{ width: '600px', height: '200px' }}
      />
    </div>
  )
}

export default Home