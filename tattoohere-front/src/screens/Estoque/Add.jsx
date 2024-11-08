import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query"; //implantar
import { useFormik } from "formik";

import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";
import { createEstoque, validationSchema, initialValuesFields, Fields } from "~/actions/estoque";
import { hasFormError } from "~/utils";

export default function Add() {
  const navigate = useNavigate();

  const queryEstoque = useQueryClient();

  const fetchCreateEstoque = useMutation(createEstoque, {
    onSuccess: () => {
      queryEstoque.invalidateQueries("estoque");
      navigate("/estoque", { replace: true });
    },
  });

  const formik = useFormik({
    initialValues: initialValuesFields,
    validationSchema,
    onSubmit: values => {
      fetchCreateEstoque.mutate(values);
    },
  });

  const opcoes = categoriasDisponiveis();

  return (
    <LoadingHolder loading={!!fetchCreateEstoque.isLoading}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <h2 className="h3 mb-4 fw-normal">Adicionando novo Produto</h2>

        {Fields.map(Field => {
          return (
            <div key={Field.id}>
              {Field.id === 'tipo' ? (                             
              <select
              id="tipo"
              style={{ width: '100%', paddingBlock: '10px' }}
              value={formik.values.client_id}
              onChange={formik.handleChange}
            >
              <option value="">Selecione uma opção</option>
              {opcoes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>                
              ) : (
              <SysInput
                key={Field.id}
                id={Field.id}
                type={Field.type}
                label={Field.label}
                value={formik.values[Field.id]}
                onChange={formik.handleChange}
                error={hasFormError(formik, Field.id)}
              />
              )}
            </div>
          );        
        })}
        <button
          disabled={!!fetchCreateEstoque.isLoading}
          className="btn btn-lg btn-primary mt-3"
          type="submit">
          Cadastrar
        </button>
      </form>
    </LoadingHolder>
  );
  function categoriasDisponiveis() {
    return [
      {nome: 'Produto'},
      {nome: 'Serviço'},
    ];
  }
}
