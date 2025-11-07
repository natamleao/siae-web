import SocialGroup from "./SocialGroup";
import SocialLink from "./socialLink";

export function Footer() {
    return (
        <footer className="">
            <section className="flex flex-row items-center justify-center bg-[#1c335e] text-xs">
                <section className="flex flex-row justify-center items-center space-x-20 font-semibold w-1/2 h-36 max-lg:w-full max-lg:space-x-5">
                    <SocialGroup title="Assistência Estudantil" emailAddress="assistenciaestudantilufcrussas@gmail.com" instagramName="ae.ufcrussas" />
                    <SocialGroup title="LUDI" emailAddress="beatriz.marques@ufc.br" instagramName="ludi.ufc" />
                </section>
                <div className="w-[0.5px] h-16 bg-gray-300 my-auto max-xl:hidden"></div>
                <section className="flex flex-col justify-center items-center space-y-4 w-1/2 max-md:hidden">
                    <p className="max-w-[532px]">O SIAE é um sistema desenvolvido pelo Laboratório
                        de pesquisa e desenvolvimento para Usabilidade, Diversidade e Inclusão (LUDI)
                        em parceria com a Assistência Estudantil da UFC - Campus Russas.</p>
                </section>
            </section>
            <section className="flex flex-row justify-around items-center py-3 bg-[#d1d1d1] max-md:flex-col max-lg:space-y-1 max-lg:hidden">
                 <div className="flex flex-row space-x-20 max-lg:space-x-10">
                    <img className="w-40 h-10" src="brasao.png" alt="brasão da Universidade Federal do ceará" />
                    <img className="w-40 h-10" src="icone-horizontal.png" alt="Ícone da Assistencia estudantil da UFC - Campus Russas" />
                </div>
                <div className="w-[0.5px] h-16 bg-gray-300 my-auto max-lg:hidden"></div>
            <div className="space-x-3 flex font-semibold text-[#1c335e]">
                <SocialLink Icon={() => null} href="#termos" text="Termos e condições" variant="dark"/>
                <SocialLink Icon={() => null} href="#privacidade" text="Privacidade"  variant="dark"/>
                <SocialLink Icon={() => null} href="#suporte" text="Suporte" variant="dark"/>
            </div>
            </section>
        </footer>
    );
}