// import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import AddCategoryPage from "./pages/AddCategoryPage";
import EditCategoryPage from "./pages/EditCategoryPage";
import SellTradePage from "./pages/SellTradePage";
import EditSellTradePage from "./pages/EditSellTradePage";
import ContractFarmingPage from "./pages/ContractFarmingPage";
import BuyersPage from "./pages/BuyersPage";
import FarmersPage from "./pages/FarmersPage";
import EditContractFarming from './pages/EditContractFarming'
import InboxPage from "./pages/InboxPage";
import SenderMessagesPage from "./pages/SenderMessagesPage";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import ResetPassword from "./pages/ResetPassword";
import OrdersPage from './pages/OrdersPage';

function App() {


  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/dashboard" element={<Home />} />
        <Route path="/admin/adduser" element={<AddUser />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/queries" element={<InboxPage />} />
        <Route path="/admin/buyers" element={<BuyersPage />} />
        <Route path="/admin/farmers" element={<FarmersPage />} />
        <Route path="/admin/selltrades" element={<SellTradePage />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
        <Route path="/admin/edit-selltrade/:id" element={<EditSellTradePage />} />
        <Route path="/admin/contract-farming" element={<ContractFarmingPage />} />
        <Route path="/admin/edit-contract-farming/:id" element={<EditContractFarming />} />
        <Route path="/admin/addcategory" element={<AddCategoryPage />} />
        <Route path="/admin/editcategory/:id" element={<EditCategoryPage />} />
        <Route path="/admin/sender-messages/:userId" element={<SenderMessagesPage />} />
        <Route path="/admin/edit-user/:id" element={<EditUser/>} />
      </Routes>
    </>
  )
}

export default App
