import React from 'react'

const RootLayout = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </> 
  )
}

export default RootLayout