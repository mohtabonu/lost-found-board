import { Navigate, Route, Routes as Switch } from "react-router-dom";
import { Header } from "../components";
import { AddItem, ItemList } from "../pages";

export const Routes = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" element={<ItemList />} />
        <Route path="/add" element={<AddItem />} />

        <Route index path="*" element={<Navigate to="/" />} />
      </Switch>
    </>
  );
};
