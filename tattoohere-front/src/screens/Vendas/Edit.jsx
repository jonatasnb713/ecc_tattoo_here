import {useState} from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { useFormik } from "formik";

import LoadingHolder from "~/components/LoadingHolder";
import SysInput from "~/components/SysInput";
import { findDocument, updateDocument, validationSchema, Fields, initialValuesFields} from "~/actions/documents";

import { hasFormError } from "~/utils";


export default function Edit() {
  const navigate = useNavigate();
  
  const [fileError, setFileError] = useState('')
  const [selectedFile, setSelectedFile] = useState('')

  const { id } = useParams();
  const currentDocument = useQuery(`document-${id}`, () => findDocument(id));
  const fetchUpdateDocument = useMutation(formData => updateDocument(id, formData), {
    onSuccess: () => navigate("/documents", { replace: true }),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues:
      currentDocument.status === "success"
        ? currentDocument.data
        : initialValuesFields,
    validationSchema,
    onSubmit: values => {
      const form = {
        body: JSON.stringify(values),
        file: selectedFile
      }
      fetchUpdateDocument.mutate(form);
    },
  });

  const handleGetFile = (e) => {
    const file = e.target.files[0];
    if (file.size > (1024 * 1024 * 1024)) // 1 GB
      setFileError("Arquivo não pode ser maior que 1GB.");
    else {
      setFileError("");
      setSelectedFile(file)
    }
  }
  
  const isLoading = !!currentDocument.isLoading || !!fetchUpdateDocument.isLoading;

  return (
    <LoadingHolder loading={isLoading}>
      {fetchUpdateDocument.status === "error" && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          Não foi possível salvar este novo document no momento
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => fetchUpdateDocument.reset()}></button>
        </div>
      )}
      <form onSubmit={formik.handleSubmit} noValidate>
        <h2 className="h3 mb-4 fw-normal">Editando Document</h2>
        
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

        <button disabled={isLoading} className="btn btn-lg btn-primary mt-3" type="submit">
          Alterar
        </button>
      </form>
    </LoadingHolder>
  );
}
