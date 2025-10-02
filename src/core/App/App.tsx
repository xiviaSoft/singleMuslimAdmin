import { AuthContext, ToastProvider } from "context"
import Routes from "core/Routes/Routes"
import { BrowserRouter } from "react-router"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthContext>
          <ToastProvider>


            <Routes />
          </ToastProvider>
        </AuthContext>
      </BrowserRouter>

    </div>
  )
}

export default App
