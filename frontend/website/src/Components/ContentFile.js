import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Order from './Order';
import First from './First';
import Inventory from './Inventory';
import Category from './Category';
import NewUser from './NewUser';
import Profile from './Profile';
import Products from './Products';
import EditProduct from './EditProduct';

 export default function ContentFile() {
  return (
        <>
            <Routes>
                <Route path='/'>
                    <Route path='inventory'  element={<Inventory/>}/>
                    <Route path='order' element={<Order/>}/>
                    <Route path='new_user' element={<NewUser/>}/>
                    <Route path='inventory/category' element={<Category />}/>
                    <Route path='inventory/products' element={<Products />}/>
                    <Route path='inventory/products/editproduct' element={<EditProduct />}/>
                    <Route path='profile' element={<Profile />}/>
                    {/* <Route path='userdetail/:Employee_ID' element={<UserDetail />}/> */}
                    <Route index element={<First/>} /> 
                </Route>
            </Routes> 
        </>
  )
}
