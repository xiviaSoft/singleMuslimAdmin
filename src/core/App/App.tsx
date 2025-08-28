import { AuthContext } from "context"
import Routes from "core/Routes/Routes"
import { BrowserRouter } from "react-router"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthContext>

          <Routes />
        </AuthContext>
      </BrowserRouter>

    </div>
  )
}

export default App
