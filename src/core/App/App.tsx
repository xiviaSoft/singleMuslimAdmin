
import { AuthProvider, ToastProvider } from "context"
import Routes from "core/Routes/Routes"
import { BrowserRouter } from "react-router"

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <ToastProvider>


            <Routes />
          </ToastProvider>
        </AuthProvider>
      </BrowserRouter>

    </div>
  )
}

export default App
