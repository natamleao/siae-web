import { CiCircleQuestion } from "react-icons/ci";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex h-15 flex-row items-center justify-between bg-[#021c4c] px-20 max-sm:px-5">
      <Link to="/">
        <div className="flex flex-row items-center space-x-4">
          <img
            className="h-10 w-10"
            src="/icone.png"
            alt="Ícone da Assistência Estudantil da UFC - Campus Russas"
          />
          <p className="font-bold">SIAE</p>
        </div>
      </Link>

      <div>
        <CiCircleQuestion className="mr-2 inline h-8 w-8 text-white" />
        <a
          href="#"
          className="border-b-2 border-transparent font-bold transition-all duration-500 hover:border-white"
        >
          Sobre o Auxílio
        </a>
      </div>
    </header>
  );
}