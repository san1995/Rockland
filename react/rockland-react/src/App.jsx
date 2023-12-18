
const App = () => {

  const btnClick = () => {
    console.log("clicked")
  }

  return (
    <div>
      <button onClick={() => {btnClick()}}>Click me</button>
    </div>
  )
}

export default App
