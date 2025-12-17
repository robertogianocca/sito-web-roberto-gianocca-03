import CreditsName from "@/components/Video/Credits/CreditsName";
import LinkButton from "@/components/Button/LinkButton";
import Link from "next/link";

export const carieDescription = {
  credits: (
    <div className="relative w-full flex flex-col flex-nowrap lg:flex-row lg:flex-wrap font-jet-brains text-2xs text-credits mb-4 mt-4 opacity-60">
      <p>
        Direction:<CreditsName>Achille Mauri, Marzio Nardi, Federico Ravassard</CreditsName>
      </p>
      <p>
        Editing:
        <CreditsName>Achille Mauri</CreditsName>
      </p>
      <p>
        Camera assistant, Drone shots, colour-grading, title animation:
        <CreditsName>Roberto Gianocca</CreditsName>
      </p>
      <p>
        Climbers:
        <CreditsName>Francesca Medici, Lorenzo Carasio, Luca Andreozzi, Luca Bana</CreditsName>
      </p>
      <p>
        Soundtrack:
        <CreditsName>Andrea La Pietra</CreditsName>
      </p>
      <p>
        Mix and Sound Design:
        <CreditsName>Tommaso Simonetta</CreditsName>
      </p>
      <p>
        Characters:
        <CreditsName>Marzio Nardi, Roberto Bombarda, Chiara Taponecco, Eros Tetti</CreditsName>
      </p>
    </div>
  ),
  links: (
    <LinkButton text={"@achillemauri.eu"} url={"https://www.instagram.com/achillemauri.eu/"} />
  ),
  description: (
    <div className="relative w-full flex flex-col flex-nowrap lg:grid grid-cols-2 font-jet-brains text-2xs text-credits mb-4 mt-4 opacity-60">
      <p>
        Carie è il risultato di un viaggio durato mesi, nato grazie all’ossessione di Marzio per
        quegli spazi che una persona normale riterrebbe, semplicemente, brutti. Dopo la prima
        giornata passata in quelle voragini bianche ci siamo resi conto che la situazione era ben
        più complessa di quanto pensassimo. Quelle linee perpendicolari custodivano una quantità
        infinita di paradossi: come faceva qualcosa di così bello ad essere nato dalla distruzione
        sistematica di una montagna? Più giorni passavamo lì e più dovevamo fare i conti con i
        controsensi. Così abbiamo cominciato a fare domande a chi, lì, ci viveva: minatori, geologi,
        ambientalisti. E poi noi, gli scalatori. Ogni individuo concepiva le cave delle Apuane
        secondo un punto di vista direttamente collegato alla sua attività. A collegarci tutti c’era
        il fascino con cui il marmo, elemento apparentemente privo di vita, aveva catturato le
        nostre menti. Fotografia di Fabrizio Ravassard. Musiche di Andrea La Pietra.
      </p>
    </div>
  ),
};
