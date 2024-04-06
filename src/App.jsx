import ChatUI from './components/ChatUI'
import DatabaseUi from './components/DatabaseUi'



function App() {
  return (
    <>
    <div className='w-full h-full flex justify-center items-center bg-gradient-to-b from-blue-400 to-emerald-200'>
      <ChatUI />
    </div>
    <DatabaseUi />
    </>
  )
}

export default App
