import { BlackAndWhiteImage } from './BlackAndWhiteImage';
import splatterDivider from 'figma:asset/185cb69eec51df2a8ca706e784867b4ab9e15b10.png';
import greyDivider from 'figma:asset/d15eda18ea41e9b4c6d7c8d24a445decb714d367.png';
import backAttackImg from '../../assets/equip-back-attack.webp';
import monoliftImg from '../../assets/equip-monolift.webp';
import standingBenchImg from '../../assets/equip-standing-bench.webp';
import vikingPressImg from '../../assets/equip-viking-press.webp';
import rogueGhdImg from '../../assets/equip-rogue-ghd.webp';
import logsImg from '../../assets/equip-logs.webp';
import reverseHyperImg from '../../assets/equip-reverse-hyper.webp';
import outdoorAreaImg from '../../assets/equip-outdoor-area.webp';
import sandbagsImg from '../../assets/equip-sandbags.webp';

interface EquipmentItem {
  name: string;
  image: string;
  strongman: boolean;
  sub?: string;
}

const equipment: EquipmentItem[] = [
  { name: 'Back Attack', image: backAttackImg, strongman: false },
  { name: 'Monolift', image: monoliftImg, strongman: false },
  { name: 'Dynabody Standing Bench Press', image: standingBenchImg, strongman: false },
  { name: 'Arsonal Viking Press', image: vikingPressImg, strongman: false },
  { name: 'Rogue GHD', image: rogueGhdImg, strongman: false },
  { name: 'Reverse Hyper', image: reverseHyperImg, strongman: false },
  { name: 'Logs & Specialty Bars', image: logsImg, strongman: true },
  {
    name: 'Outdoor Training Area',
    image: outdoorAreaImg,
    strongman: true,
    sub: 'Yoke, farmers carry, powerstairs, kegs, sleds, and car deadlift.'
  },
  {
    name: 'Sandbags 100 to 350 lbs',
    image: sandbagsImg,
    strongman: true,
    sub: 'Including the Hussafel sandbag.'
  },
];

export function Facility() {
  return (
    <section id="facility" className="relative pt-40 pb-32 bg-[#1c1c1e]">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 w-full z-10">
        <img
          src={greyDivider}
          alt=""
          className="w-full h-auto block"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#cc1e23] text-sm md:text-base tracking-[0.3em] uppercase block mb-4" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
            Specialty Equipment
          </span>
          <h2 className="text-[#fdfdff] text-4xl md:text-5xl mb-4 tracking-wider" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
            THE FACILITY
          </h2>
          <p className="text-[#a7a7ad] text-lg max-w-3xl mx-auto" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
            Gear you will not find at the average gym. Lifters in the know buy a day pass just to train on it.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment.map((item, index) => (
            <div key={index} className="bg-[#121214] group">
              <div className="relative overflow-hidden aspect-[4/3]">
                <BlackAndWhiteImage
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full"
                />
                {item.strongman && (
                  <span className="absolute top-4 left-4 bg-[#cc1e23] text-[#fdfdff] text-xs tracking-[0.2em] uppercase px-3 py-1" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 700 }}>
                    Strongman
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-[#fdfdff] text-xl tracking-wide" style={{ fontFamily: "'poster-gothic-atf', sans-serif" }}>
                  {item.name.toUpperCase()}
                </h3>
                {item.sub && (
                  <p className="text-[#a7a7ad] text-sm mt-2 leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                    {item.sub}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Divider (same-shade torn texture into the next section) */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-10">
        <img
          src={splatterDivider}
          alt=""
          className="w-full h-auto block"
        />
      </div>
    </section>
  );
}
