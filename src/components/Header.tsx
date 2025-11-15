import { CiCircleQuestion } from "react-icons/ci";
import { Link } from "react-router-dom";


export function Header() {
  return (
    <header className="flex flex-row bg-[#021c4c] items-center justify-between px-20 h-15 max-sm:px-5">
      <Link to={"/"}>
        <div className="flex flex-row space-x-4 items-center">
          <img className="w-10 h-10" src="icone.png" alt="Ícone da Assistencia estudantil da UFC - Campus Russas" />
          <p className="font-bold">SIAE</p>
        </div>
      </Link>
      <div>
        <CiCircleQuestion className="inline mr-2 w-8 h-8 text-white" />
        <a href="#" className="font-bold border-b-2 border-transparent hover:border-white transition-all duration-500">
          Sobre o Auxílio
        </a>
      </div>
    </header>
  )
}