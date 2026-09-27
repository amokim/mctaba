import JokeDisplay from './components/JokeDisplay'
import UserSearch from './components/UserSearch'
import CryptoTracker from './components/CryptoTracker'

import './App.css'

function App() {
  return (
    <>
      <section id="joke">
        <JokeDisplay />
      </section>
      <section id="search">
        <UserSearch />
      </section>
      <section id="tracker">
        <CryptoTracker />
      </section>
    </>
  )
}

export default App
