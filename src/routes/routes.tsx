import { Navigate, Outlet, Route, Routes as Switch } from "react-router-dom";
import { Header } from "../components";
import { AddItem, ItemList, Login, Profile, Register } from "../pages";
import { useContext } from "react";
import { AuthContext } from "@/context";

export const Routes = () => {

  const {isAuthenticated} = useContext(AuthContext)

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" element={<ItemList />} />
        <Route path="/add" element={isAuthenticated ? <AddItem /> : <Navigate to='/auth'/>} />
        <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to='/auth'/>} />

        <Route path="auth" element={isAuthenticated ? <Navigate to='/'/> : <Outlet/>}>
					<Route path="login" element={<Login />} />
					<Route path="register" element={<Register />} />
					<Route index path="*" element={<Navigate to="/auth/login" />} />
				</Route>

        <Route index path="*" element={<Navigate to="/"/>} />
      </Switch>
    </>
  );
};
