import { Bmi } from './Components/BMI/Bmi';
import { LoginForm } from './Components/LoginForm/LoginForm';
import { RegisterForm } from './Components/RegisterForm/RegisterForm';
import { RouterProvider, createBrowserRouter} from "react-router-dom"

function App() {
  
  const route = createBrowserRouter([
    {
      path:"/",
      element:<RegisterForm/>,
    },
    {
      path:"/login",
      element:<LoginForm/>,
    },

  ])
  return (
    <>
      <div>
        <RouterProvider router={route}></RouterProvider>
      </div>
    </>
  )
}

export default App
