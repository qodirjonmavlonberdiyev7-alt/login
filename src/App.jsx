import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout/>,
      errorElement: <ErrorBoundary/>,
      children: [
        {
          path: '/posts',
          element: <Posts/>
        },
         {
          path: '/posts/:postId',
          element: <SinglePost/>
        },
         {
          path: '/users',
          element: <Users/>
        },
         {
          path: '/cart',
          element: <Cart/>
        }
      ]
    },
    {
      path: '/login',
      element: <h1>Login Component</h1>
    },
    {
      path: "*",
      element: <NotFound/>
    }
  ]  )

  return (
    <>
      <RouterProvider router={routes} />
    </>
  )
}

export default App
