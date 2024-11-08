import { useQuery, useMutation, useQueryClient } from "react-query";
import { Link } from "react-router-dom";

import LoadingHolder from "~/components/LoadingHolder";

import { listEstoque, DestroyEstoque } from "~/actions/estoque";

export default function List() {
  const queryClient = useQueryClient();
  const estoque = useQuery("estoque", listEstoque);

  const fetchDestroyEstoque = useMutation(item => DestroyEstoque(item.id), {
    onSuccess: () => {
      queryClient.invalidateQueries("estoque");
    },
  });

  const isLoading = !!estoque.isLoading || !!fetchDestroyEstoque.isLoading;

  return (
    <LoadingHolder loading={!!isLoading}>
      {estoque.status === "error" && (
        <div className="alert alert-danger fade show" role="alert">
          Não foi possível receber a lista de Produtos/Serviços no momento
        </div>
      )}
      {fetchDestroyEstoque.status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Não foi possível exluir este produto neste momento
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchDestroyEstoque.reset()}></button>
        </div>
      )}
      {fetchDestroyEstoque.status === "success" && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          Produto excluído com sucesso!
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchDestroyEstoque.reset()}></button>
        </div>
      )}
      <div className="table-responsive">
        <Link className="btn btn-primary float-end" to="/estoque/add" role="button">
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
          Adicionar Produto
        </Link>
        <h2 className="h3 mb-4 fw-normal">Produtos/Serviços cadastrados</h2>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th className="text-center" style={{ width: 220 }}>
                Ações
              </th>
            </tr>
          </thead>
          {!!estoque.data && (
            <tbody>
              {estoque.data.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center p-5">
                    Nenhum produto cadastrado em nosso sistema!
                  </td>
                </tr>
              )}
              {estoque.data.map(item => (
                <tr key={item.id}>
                  <td>{item.nome}</td>
                  <td>{item.tipo}</td>
                  <td>{item.quantidade}</td>
                  <td>{item.preco}</td>
                  <td className="text-center">
                    <Link className="btn btn-success btn-sm" to={`/estoque/${item.id}`} role="button"> {/* implementar */}
                      Visualizar
                    </Link>
                    <Link className="btn btn-info btn-sm" to={`/estoque/edit/${item.id}`} role="button">
                      Editar
                    </Link>
                    <a onClick={event => {
                      event.preventDefault();
                      if (window.confirm(`Você confirma a exclusão do cliente ${item.nome_fantasia}?`)) {
                        fetchDestroyEstoque.mutate(item);
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
