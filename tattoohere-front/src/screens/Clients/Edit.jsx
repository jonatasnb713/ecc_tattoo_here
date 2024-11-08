import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";

import { findClient, updateClient, validationSchema, initialValuesFields, Fields } from "~/actions/clients";
import { hasFormError } from "~/utils";

export default function Edit() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { id } = useParams();
  const currentClient = useQuery(`client-${id}`, () => findClient(id));
  const fetchUpdateClient = useMutation(formData => updateClient(id, formData), {
    onSuccess: () => {
      queryClient.invalidateQueries(`client-${id}`);
      queryClient.invalidateQueries("clients");

      navigate("/clients", { replace: true });
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      currentClient.status === "success"
        ? currentClient.data
        : initialValuesFields,
    validationSchema,
    onSubmit: values => {
      fetchUpdateClient.mutate(values);
    },
  });

  const isLoading = !!currentClient.isLoading || !!fetchUpdateClient.isLoading;

  return (
    <LoadingHolder loading={!!isLoading}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <h2 className="h3 mb-4 fw-normal">Editando Cliente</h2>

        {Fields.map(Field => {
          console.log(formik.values[Field.id])
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
        <button disabled={isLoading} className="btn btn-lg btn-primary mt-3" type="submit">
          Alterar
        </button>
      </form>
    </LoadingHolder>
  );
}
