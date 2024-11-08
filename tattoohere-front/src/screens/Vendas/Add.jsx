import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import { listClients } from "~/actions/clients";
import { listEstoque } from "~/actions/estoque";
import { useQuery } from "react-query";

import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";

import { createDocument, validationSchema, initialValuesFields, Fields } from "~/actions/documents";
import { hasFormError } from "~/utils";

export default function Add() {
  const navigate = useNavigate();

  const fetchCreateDocument = useMutation(createDocument, {
    onSuccess: () => {
      console.log('Documento criado com sucesso!');
      navigate("/documents", { replace: true });
    },
    onError: (error) => {
      console.error('Erro ao criar documento:', error);
    }
  });

  const { data: clientsData, isLoading: isClientsLoading, isError: isClientsError } = useQuery("clients", listClients);
  const { data: estoqueData } = useQuery("estoque", listEstoque);

  const formik = useFormik({
    initialValues: initialValuesFields,
    validationSchema,
    onSubmit: values => {
      // {console.log(values);}
      const form = {
        body: JSON.stringify(values),
      };
      fetchCreateDocument.mutate(form);
      // console.log(form);
    },
  });

  const handleNomeChange = (event) => {
    const selectedNomeId = Number(event.target.value);
    formik.setFieldValue("nome", selectedNomeId);
                                          
    const selectedEstoque = estoqueData.find((Estoque) => Estoque.id === selectedNomeId);
    if (selectedEstoque) {
      formik.setFieldValue("categoria", selectedEstoque.tipo);
      
    } else {
      formik.setFieldValue("categoria", "");
    }
  };
  const calculaPreco = (event) => {
    const selectedNomeId = Number(event.target.value);
    formik.setFieldValue("nome", selectedNomeId);
    const selectedEstoque = estoqueData.find((Estoque) => Estoque.id === selectedNomeId);
    if (selectedEstoque) {
      formik.setFieldValue("preco", selectedEstoque.preco);      
    } else {
      formik.setFieldValue("preco", "");
    }
  };

  return (
    <LoadingHolder loading={!!fetchCreateDocument.isLoading}>
      {fetchCreateDocument.status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Não foi possível salvar esta venda no momento!
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchCreateDocument.reset()}
          ></button>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate>
        <h2 className="h3 mb-4 fw-normal">Cadastrando nova Venda</h2>

        {Fields.map(Field => {
          // console.log(Field);
          return (
            <div key={Field.id}>
              {Field.id === 'client_id' ? (
                <>
                  {isClientsLoading ? (
                    <p>Carregando clientes...</p>
                  ) : isClientsError ? (
                    <p>Erro ao carregar clientes!</p>
                  ) : (
                    <select
                      id="client_id"
                      style={{ width: '100%', paddingBlock: '10px' }}
                      value={formik.values.client_id}
                      onChange={formik.handleChange}
                    >
                      <option value="">Selecione um cliente</option>
                      {clientsData.map(cliente => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nome}
                        </option>
                      ))}
                    </select>
                  )}
                  <div style={{ height: '20px' }}></div>
                </> 
                
              ) : Field.id === 'estoque_id' ? (
                <>
                  <select
                    id="estoque_id"
                    style={{ width: '100%', paddingBlock: '10px' }}
                    value={formik.values.estoque_id}
                    onChange={(event) => {
                      formik.handleChange(event);
                      handleNomeChange(event);
                      calculaPreco(event);  //tenho que remover do estoque quando salvar
                    }}
                  >
                  <option value="">Selecione uma opção</option>
                  {estoqueData.map(Estoque => (                        
                  <option key={Estoque.id} value={Estoque.id}>
                    {Estoque.nome}</option>                       
                  ))}                    
                  </select>
                <div style={{ height: '20px' }}></div>
              </>
              ) : Field.id === 'categoria' ? (
                <SysInput
                  key={Field.id}
                  id={Field.id}
                  type={Field.type}
                  label={Field.label}
                  value={formik.values.categoria || ""}
                  onChange={formik.handleChange}
                  error={hasFormError(formik, Field.id)}
                  readOnly
                />
              ) : Field.id === 'quantidade' ? ( 
                <SysInput
                  key={Field.id}
                  id={Field.id}
                  type={Field.type}
                  label={Field.label}
                  value={formik.values[Field.id]}
                  onChange={(event) => {
                    formik.handleChange(event);
                  }}
                  error={hasFormError(formik, Field.id)}
                />  
              ) : Field.id === 'preco' ? (
                
                <SysInput
                  key={Field.id}
                  id={Field.id}
                  type={Field.type}
                  label={Field.label}
                  value={formik.values.preco * formik.values.quantidade}
                  onChange={(event) => formik.handleChange(event)}
                  error={hasFormError(formik, Field.id)} //bugado, não está pegando o valor multipicado
                  readOnly
                />
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
        
        <button disabled={!!fetchCreateDocument.isLoading} className="btn btn-lg btn-primary mt-3" type="submit">
          Cadastrar
        </button>
      </form>
    </LoadingHolder>
  );
}