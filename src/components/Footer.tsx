import SocialGroup from "./socialGroup";

export function Footer() {
    return (
        <footer className="flex flex-row justify-center bg-[#1c335e] h-44 text-xs">
            <section className="flex flex-row justify-center items-center space-x-20 font-semibold w-1/2">
                <div className="space-y-3">
                    <p >Termos e condições</p>
                    <p>Privacidade</p>
                    <p>Suporte</p>
                </div>

                <SocialGroup title="Assistência Estudantil" />
                <SocialGroup title="LUDI" />

            </section>
            <div className="w-[0.5px] h-36 bg-gray-300 my-auto"></div>
            <section className="flex flex-col justify-center items-center space-y-4 w-1/2">
                <div>
                    <p className="max-w-[532px]">O SIAE é um sistema desenvolvido pelo Laboratório
                        de pesquisa e desenvolvimento para Usabilidade, Diversidade e Inclusão (LUDI)
                        em parceria com a Assistência Estudantil da UFC - Campus Russas.</p>
                </div>
                <div className="flex flex-row space-x-20">
                    <img className="w-40 h-10" src="brasao.png" alt="brasão da Universidade Federal do ceará" />
                    <img className="w-40 h-10" src="icone-horizontal.png" alt="Ícone da Assistencia estudantil da UFC - Campus Russas" />
                </div>
            </section>
        </footer>
    );
}