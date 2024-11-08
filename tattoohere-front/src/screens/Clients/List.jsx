import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

import LoadingHolder from "~/components/LoadingHolder";

import { listClients, destroyClient } from "~/actions/clients";

export default function List() {
  const queryClient = useQueryClient();
  const clients = useQuery("clients", listClients);

  const fetchDestroyClient = useMutation(item => destroyClient(item.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
    },
  });

  const isLoading = !!clients.isLoading || !!fetchDestroyClient.isLoading;

  return (
    <LoadingHolder loading={!!isLoading}>
      {clients.status === "error" && (
        <div className="alert alert-danger fade show" role="alert">
          Não foi possível receber a lista de clientes do sistema neste momento
        </div>
      )}
      {fetchDestroyClient.status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Não foi possível exluir este cliente neste momento
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchDestroyClient.reset()}></button>
        </div>
      )}
      {fetchDestroyClient.status === "success" && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Cliente excluído com sucesso!
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchDestroyClient.reset()}></button>
        </div>
      )}
      <div className="table-responsive">
        <Link className="btn btn-primary float-end" to="/clients/add" role="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus-lg"
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
            />
          </svg>{" "}
          Adicionar Cliente
        </Link>
        <h2 className="h3 mb-4 fw-normal">Clientes cadastrados</h2>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th className="text-center" style={{ width: 220 }}>
                Ações
              </th>
            </tr>
          </thead>
          {!!clients.data && (
            <tbody>
              {clients.data.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center p-5">
                    Nenhum cliente cadastrado em nosso sistema!
                  </td>
                </tr>
              )}
              {clients.data.map(item => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td><a href={`mailto:${item.email}`}>{item.email}</a></td>
                  <td className="text-center">
                    <Link className="btn btn-success btn-sm" to={`/clients/${item.id}`} role="button"> {/* implementar */}
                      Visualizar
                    </Link>
                    <Link className="btn btn-info btn-sm" to={`/clients/edit/${item.id}`} role="button">
                      Editar
                    </Link>
                    <a onClick={event => {
                      event.preventDefault();
                      if (window.confirm(`Você confirma a exclusão do cliente ${item.nome_fantasia}?`)) {
                        fetchDestroyClient.mutate(item);
                      }
                      }}
                      className="btn btn-danger btn-sm"
                      href="#delete-cliente"
                      role="button">
                      Excluir
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </LoadingHolder>
  );
}
