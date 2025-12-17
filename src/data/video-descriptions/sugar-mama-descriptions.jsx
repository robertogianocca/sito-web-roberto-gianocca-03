import CreditsName from "@/components/Video/Credits/CreditsName";
import LinkButton from "@/components/Button/LinkButton";
import Link from "next/link";

export const sugarMamaDescription = {
  credits: (
    <div className="relative w-full flex flex-col flex-nowrap lg:flex-row lg:flex-wrap font-jet-brains text-2xs text-credits mb-4 mt-4 opacity-60">
      <p>
        Direction, Editing, Post-production:<CreditsName>Roberto Gianocca</CreditsName>
      </p>
      <p>
        Assistant Director:
        <CreditsName>Shondel Bervini</CreditsName>
      </p>

      <p>
        Styling & Costumes:
        <CreditsName>Shondel Bervini, Sofia Buob</CreditsName>
      </p>
      <p>
        Make-up & Hair:
        <CreditsName>Sofia Buob</CreditsName>
      </p>
      <p>
        Performers:
        <CreditsName>Matt Pascale, Sofia Buob, Shondel Bervini</CreditsName>
      </p>
      <p>
        Special Thanks:
        <CreditsName>
          Elia Squartini, Gianni Muggeo, Andrea Zanni, Alan Fraquelli, Maurizio Faggi, Giulia
          Campiglia, Wabi the Dog
        </CreditsName>
      </p>
    </div>
  ),
  links: (
    <LinkButton text={"@mattandthestomps"} url={"https://www.instagram.com/mattandthestomps/"} />
  ),
};
