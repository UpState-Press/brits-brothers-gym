interface TornDividerProps {
  color?: string;
  flip?: boolean;
}

export function TornDivider({ color = "#121214", flip = false }: TornDividerProps) {
  return (
    <div className={`relative w-full ${flip ? 'rotate-180' : ''}`}>
      <svg
        className="w-full h-8 md:h-12"
        viewBox="0 0 1200 60"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0 L0,60 L1200,60 L1200,0 
             L1180,15 L1160,5 L1140,20 L1120,8 L1100,18 L1080,12 
             L1060,25 L1040,10 L1020,22 L1000,8 L980,28 L960,15 
             L940,20 L920,5 L900,25 L880,12 L860,18 L840,8 
             L820,30 L800,15 L780,22 L760,10 L740,20 L720,8 
             L700,25 L680,12 L660,18 L640,5 L620,28 L600,15 
             L580,20 L560,8 L540,25 L520,10 L500,22 L480,8 
             L460,28 L440,15 L420,20 L400,5 L380,25 L360,12 
             L340,18 L320,8 L300,30 L280,15 L260,22 L240,10 
             L220,20 L200,8 L180,25 L160,12 L140,18 L120,5 
             L100,28 L80,15 L60,20 L40,8 L20,15 L0,0 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}
