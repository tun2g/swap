import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApprovePage from "../pages/approve";
import ConnectPage from "../pages/connect";
import SwapPage from "../pages/swap";

export const InitRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/connect' element={<ConnectPage />} />
        <Route path='/metamask/approve' element={<ApprovePage />} />
        <Route path='/swap' element={<SwapPage/>} />
      </Routes>
    </BrowserRouter>
  )
}