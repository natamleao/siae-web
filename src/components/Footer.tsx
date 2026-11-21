import SocialGroup from "./SocialGroup";
import SocialLink from "./SocialLink";

export function Footer() {
  return (
    <footer>
      <section className="flex flex-row items-center justify-center bg-[#021c4c] text-xs">
        <section className="flex h-36 w-1/2 flex-row items-center justify-center space-x-20 font-semibold max-lg:w-full max-lg:space-x-5">
          <SocialGroup
            title="Assistência Estudantil"
            emailAddress="assistenciaestudantilufcrussas@gmail.com"
            instagramName="ae.ufcrussas"
          />
          <SocialGroup
            title="LUDI"
            emailAddress="beatriz.marques@ufc.br"
            instagramName="ludi.ufc"
          />
        </section>

        <div className="my-auto h-16 w-[0.5px] bg-gray-300 max-xl:hidden" />

        <section className="flex w-1/2 flex-col items-center justify-center space-y-4 max-md:hidden">
          <p className="max-w-[532px]">
            O SIAE é um sistema desenvolvido pelo Laboratório de pesquisa e
            desenvolvimento para Usabilidade, Diversidade e Inclusão (LUDI) em
            parceria com a Assistência Estudantil da UFC - Campus Russas.
          </p>
        </section>
      </section>

      <section className="flex flex-row items-center justify-around bg-[#d1d1d1] py-3 max-md:flex-col max-lg:space-y-1">
        <div className="flex flex-row space-x-20 max-lg:space-x-10">
          <img
            className="h-10 w-40"
            src="/brasao.png"
            alt="Brasão da Universidade Federal do Ceará"
          />
          <img
            className="h-10 w-40"
            src="/icone-horizontal.png"
            alt="Ícone da Assistência Estudantil da UFC - Campus Russas"
          />
        </div>

        <div className="my-auto h-16 w-[0.5px] bg-gray-300 max-lg:hidden" />

        <div className="flex space-x-3 font-semibold text-[#1c335e]">
          <SocialLink
            Icon={() => null}
            href="#termos"
            text="Termos e condições"
            variant="dark"
          />
          <SocialLink
            Icon={() => null}
            href="#privacidade"
            text="Privacidade"
            variant="dark"
          />
          <SocialLink
            Icon={() => null}
            href="#suporte"
            text="Suporte"
            variant="dark"
          />
        </div>
      </section>
    </footer>
  );
}