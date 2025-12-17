import CreditsName from "@/components/Video/Credits/CreditsName";
import LinkButton from "@/components/Button/LinkButton";
import Link from "next/link";
import ExpandableText from "@/components/Text/ExpandableText";
import Image from "next/image";

export const carieDescription = {
  credits: (
    <div className="w-full flex flex-col flex-nowrap lg:flex-row lg:flex-wrap font-jet-brains text-2xs text-credits mb-4 mt-4 opacity-60">
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
    <div className="relative w-full">
      <div className="relative w-full flex flex-col flex-nowrap lg:grid grid-cols-2 gap-10 font-inter text-xs mb-4 mt-4 ">
        <ExpandableText className="">
          "Carie è il risultato di un viaggio durato mesi, nato grazie all’ossessione di Marzio per
          quegli spazi che una persona normale riterrebbe, semplicemente, brutti. Dopo la prima
          giornata passata in quelle voragini bianche ci siamo resi conto che la situazione era ben
          più complessa di quanto pensassimo. Quelle linee perpendicolari custodivano una quantità
          infinita di paradossi: come faceva qualcosa di così bello ad essere nato dalla distruzione
          sistematica di una montagna? Più giorni passavamo lì e più dovevamo fare i conti con i
          controsensi. Così abbiamo cominciato a fare domande a chi, lì, ci viveva: minatori,
          geologi, ambientalisti. E poi noi, gli scalatori. Ogni individuo concepiva le cave delle
          Apuane secondo un punto di vista direttamente collegato alla sua attività. A collegarci
          tutti c’era il fascino con cui il marmo, elemento apparentemente privo di vita, aveva
          catturato le nostre menti."
        </ExpandableText>
        <ExpandableText className="text-emerald-200">
          "Carie is the result of a journey that lasted several months, born from Marzio’s obsession
          with those spaces that an ordinary person would simply consider ugly. After the first day
          spent in those white chasms, we realized that the situation was far more complex than we
          had imagined. Those perpendicular lines held an infinite number of paradoxes: how could
          something so beautiful have been born from the systematic destruction of a mountain? The
          more days we spent there, the more we had to come to terms with these contradictions. So
          we began asking questions of those who lived there: miners, geologists, environmentalists.
          And then us, the climbers. Each individual conceived of the Apuan Alps quarries from a
          point of view directly connected to their own activity. What united us all was the
          fascination with which marble—an element seemingly devoid of life—had captured our minds."
        </ExpandableText>
      </div>
      {/* Backstage Images Grid */}
      <div className="grid grid-cols-2 gap-4 mt-8">
        {[
          "_0A_00678.jpg",
          "_1A_00679.jpg",
          "_2A_00680.jpg",
          "_3A_00681.jpg",
          "_4A_00682.jpg",
          "_5A_00683.jpg",
          "_6A_00684.jpg",
          "_7A_00685.jpg",
          "_8A_00686.jpg",
          "_9A_00687.jpg",
          "10A_00688.jpg",
          "11A_00689.jpg",
          "12A_00690.jpg",
          "13A_00691.jpg",
          "14A_00692.jpg",
          "15A_00693.jpg",
          "16A_00694.jpg",
          "17A_00695.jpg",
          "18A_00696.jpg",
          "19A_00697.jpg",
          "20A_00698.jpg",
          "21A_00699.jpg",
          "22A_00700.jpg",
          "23A_00701.jpg",
          "23A_00764.jpg",
          "24A_00765.jpg",
          "25A_00766.jpg",
          "30A_00770.jpg",
          "31A_00771.jpg",
          "32A_00772.jpg",
        ].map((imageName, index) => (
          <div key={index} className="relative w-full aspect-auto">
            <Image
              src={`/carie-backstage/${imageName}`}
              alt={`Carie backstage ${index + 1}`}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  ),
};
