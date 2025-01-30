import './App.css'
import Header from '@components/Header'
import Footer from '@components/Footer'
import SieveForm from '@components/SieveForm'

function App() {
  return (
    <div className="">
      <Header />
      <main className='w-full md:w-11/12 mx-auto'>
        <SieveForm />
      </main>
      <Footer />
    </div>
  )
}

export default App
