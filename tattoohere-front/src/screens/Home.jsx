import { useUsuario } from "~/context/UsuarioContext";

export default function Home() {
  const { usuario } = useUsuario();

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">Olá {usuario?.nome}</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          Seja bem-vindo ao <strong>TattooHere</strong>, o melhor e mais completo sistema de gerencimento para estudios de tatuagem!
        </p>
        {/* <div className="calendar-container">
          <iframe
            src="https://calendar.google.com/calendar/embed?src=sladx27%40gmail.com&ctz=America%2FSao_Paulo"
            style={{ border: 0 }}
            width="800"
            height="600"
          ></iframe>
        </div>         */}
      </div>      
    </div>
    
  );
}
