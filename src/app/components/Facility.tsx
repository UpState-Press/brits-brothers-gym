import { BlackAndWhiteImage } from './BlackAndWhiteImage';
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
  sub: string;
}

const equipment: EquipmentItem[] = [
  {
    name: 'Back Attack',
    image: backAttackImg,
    strongman: false,
    sub: 'Chest supported, plate loaded posterior chain work. Trains the glutes, hamstrings, and lower back with no bar on your spine.'
  },
  {
    name: 'Monolift',
    image: monoliftImg,
    strongman: false,
    sub: 'The hooks swing clear so you never walk out a heavy squat. Standard at powerlifting meets, almost never in a commercial gym.'
  },
  {
    name: 'Dynabody Standing Bench Press',
    image: standingBenchImg,
    strongman: false,
    sub: 'Vintage Dynabody iron. Pressing from your feet loads the chest and shoulders while the whole body braces.'
  },
  {
    name: 'Arsonal Viking Press',
    image: vikingPressImg,
    strongman: false,
    sub: 'Angled overhead pressing on thick neutral handles. Builds the shoulder strength and lockout that carry straight over to log work.'
  },
  {
    name: 'Rogue GHD',
    image: rogueGhdImg,
    strongman: false,
    sub: 'Hamstrings, glutes, and lower back through a full range of motion. Also the best ab work in the building.'
  },
  {
    name: 'Reverse Hyper',
    image: reverseHyperImg,
    strongman: false,
    sub: 'Loads the posterior chain while it decompresses the spine. The go to for anyone training around a cranky lower back.'
  },
  {
    name: 'Logs & Specialty Bars',
    image: logsImg,
    strongman: true,
    sub: 'Competition logs plus a rack of specialty bars. Change the bar and you change the whole lift.'
  },
  {
    name: 'Outdoor Training Area',
    image: outdoorAreaImg,
    strongman: true,
    sub: 'Yoke, farmers carry, powerstairs, kegs, sleds, and car deadlift. Full event training without leaving the property.'
  },
  {
    name: 'Sandbags 100 to 350 lbs',
    image: sandbagsImg,
    strongman: true,
    sub: 'Every jump from 100 up to 350 pounds, including the Hussafel bag. Awkward, heavy, and honest about how strong you actually are.'
  },
];

export function Facility() {
  return (
    <section id="facility" className="relative pt-32 pb-32 bg-[#1c1c1e]">
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
                <p className="text-[#a7a7ad] text-sm mt-3 leading-relaxed" style={{ fontFamily: "'Work Sans', sans-serif", fontWeight: 500 }}>
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
