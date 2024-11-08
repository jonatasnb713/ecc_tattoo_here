import { Fragment, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import { useUsuario } from "./context/UsuarioContext";

import AppLayout from "./layouts/AppLayout";
import LoginLayout from "./layouts/LoginLayout";

import Auth from "./screens/Auth";
import Home from "./screens/Home";

/* Documents */
import DocumentsList from "./screens/Vendas/List";
import DocumentsAdd from "./screens/Vendas/Add";
import DocumentsEdit from "./screens/Vendas/Edit";

/* Clients */
import ClientsList from "./screens/Clients/List";
import ClientsAdd from "./screens/Clients/Add";
import ClientsEdit from "./screens/Clients/Edit";

/* Estoque */
import EstoqueList from "./screens/Estoque/List";
import EstoqueAdd from "./screens/Estoque/Add";
import EstoqueEdit from "./screens/Estoque/Edit";

function RequireLoginAppLayout(props) {
  let { isLogged } = useUsuario();
  let location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <AppLayout {...props} />;
}

function PublicLoginLayout(props) {
  let { isLogged } = useUsuario();
  let location = useLocation();

  if (!!isLogged) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <LoginLayout {...props} />;
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Fragment>
          <Route element={<PublicLoginLayout />}>
            <Route path="/login" element={<Auth />} />
          </Route>
          <Route element={<RequireLoginAppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/documents">
              <Route index element={<DocumentsList />} />
              <Route path="add" element={<DocumentsAdd />} />
              <Route path="edit/:id" element={<DocumentsEdit />} />
            </Route>
            <Route path="/clients">
              <Route index element={<ClientsList />} />
              <Route path="add" element={<ClientsAdd />} />
              <Route path="edit/:id" element={<ClientsEdit />} />
            </Route>
            <Route path="/estoque">
              <Route index element={<EstoqueList />} />
              <Route path="add" element={<EstoqueAdd />} />
              <Route path="edit/:id" element={<EstoqueEdit />} />
            </Route>
          </Route>
        </Fragment>
      </Routes>
    </div>
  );
}

export default App;
