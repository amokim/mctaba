import Counter from './components/counter'
import TodoApp from './components/todoApp'
import SignupForm from './components/Signup'
import './App.css'

function App() {
  return (
    <>
      <section id="counter">
        <Counter />
      </section>
      <section id="todoapp">
        <TodoApp />
      </section>
      <section id="signupform">
        <SignupForm />
      </section>
    </>
  )
}

export default App
