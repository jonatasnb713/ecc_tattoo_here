import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";

import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";
import { createClient, validationSchema, initialValuesFields, Fields } from "~/actions/clients";
import { hasFormError } from "~/utils";

export default function Add() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const fetchCreateClients = useMutation(createClient, {
    onSuccess: () => {
      queryClient.invalidateQueries("clients");
      navigate("/clients", { replace: true });
    },
  });

  const formik = useFormik({
    initialValues: initialValuesFields,
    validationSchema,
    onSubmit: values => {
      fetchCreateClients.mutate(values);
    },
  });

  return (
    <LoadingHolder loading={!!fetchCreateClients.isLoading}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <h2 className="h3 mb-4 fw-normal">Adicionando novo cliente</h2>

        {Fields.map(Field => {
          return <SysInput
            key={Field.id}
            id={Field.id}
            type={Field.type}
            label={Field.label}
            value={formik.values[Field.id]}
            onChange={formik.handleChange}
            error={hasFormError(formik, Field.id)}
          />
        })}
        <button
          disabled={!!fetchCreateClients.isLoading}
          className="btn btn-lg btn-primary mt-3"
          type="submit">
          Cadastrar
        </button>
      </form>
    </LoadingHolder>
  );
}
