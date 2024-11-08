import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useFormik } from "formik";
import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";

import { findEstoque, updateEstoque, validationSchema, initialValuesFields, Fields } from "~/actions/estoque";
import { hasFormError } from "~/utils";

export default function Edit() {
  const navigate = useNavigate();
  const queryEstoque = useQueryClient();

  const { id } = useParams();
  const currentEstoque = useQuery(`estoque-${id}`, () => findEstoque(id));
  const fetchUpdateEstoque = useMutation(formData => updateEstoque(id, formData), {
    onSuccess: () => {
      queryEstoque.invalidateQueries(`estoque-${id}`);
      queryEstoque.invalidateQueries("estoque");

      navigate("/estoque", { replace: true });
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      currentEstoque.status === "success"
        ? currentEstoque.data
        : initialValuesFields,
    validationSchema,
    onSubmit: values => {
      fetchUpdateEstoque.mutate(values);
    },
  });

  const isLoading = !!currentEstoque.isLoading || !!fetchUpdateEstoque.isLoading;

  return (
    <LoadingHolder loading={!!isLoading}>
      <form onSubmit={formik.handleSubmit} noValidate>
        <h2 className="h3 mb-4 fw-normal">Editando Produto</h2>

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
