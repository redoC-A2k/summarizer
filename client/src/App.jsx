import Summarize from "./pages/summarize"
import banner from "../public/banner.png"
function App() {

  return (
    <>
      <img className="banner" src={banner} alt="" />
      <div className="container">
        <Summarize/>
      </div>
    </>
  )
}

export default App
