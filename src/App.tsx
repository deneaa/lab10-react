import { Route, Routes } from "react-router";

import "./App.css";

import Layout from "./components/Layout/Layout";
import DocsLayout from "./components/DocsLayout/DocsLayout";

import Home from "./pages/Home/Home";
import Despre from "./pages/Despre/Despre";
import Contact from "./pages/Contacts/Contact";
import Istoric from "./pages/Istoric/Istoric";
import Search from "./pages/Search/Search";

import DocsHome from "./pages/DocsHome/DocsHome";
import SectionView from "./components/SectionView/SectionView";
import PageView from "./components/PageView/PageView";
import EditPage from "./components/EditPage/EditPage";
import Comments from "./components/Comments/Comments";

import NotFound from "./pages/NotFound/NotFound";
import Login from "./pages/Login/Login";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import PrivatePage from "./pages/PrivatePage/PrivatePage";

const DocsNotFound = () => {
  return <div>Docs - Pagina nu există</div>;
};

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/despre" element={<Despre />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/cauta" element={<Search />} />
        <Route path="/istoric" element={<Istoric />} />

        <Route path="/docs" element={<DocsLayout />}>
          <Route index element={<DocsHome />} />

          <Route path=":sectiune" element={<SectionView />} />

          <Route path=":sectiune/:paginaId" element={<PageView />}>
            <Route path="editare" element={<EditPage />} />
            <Route path="comentarii" element={<Comments />} />
          </Route>
          <Route
            path="privat"
            element={
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<DocsNotFound />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
