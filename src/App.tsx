import './App.css'
import Header from '@components/Header'
import SieveForm from '@components/SieveForm'

function App() {
  return (
    <div className='w-full md:w-11/12 mx-auto p-6 md:px-16 pt-16 h-screen'>
      <Header />
      <SieveForm />
    </div>
  )
}

export default App
