import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPublicSiteOrigin } from '../../config/siteConfig';
import { MacroCalculator, type MacroSnapshot } from '../components/MacroCalculator';
import { SEO } from '../components/SEO';
import { ToolGate, type ToolGatePayload } from '../components/ToolGate';

// Macro calculator page. The calculator runs in the browser and is free to fill
// out; the results sit behind a one-time email gate (ToolGate). The gate posts
// the visitor's inputs and results to the contact form endpoint.

const bodyStyle = { fontFamily: "'Work Sans', sans-serif", fontWeight: 500 } as const;
const headingStyle = { fontFamily: "'poster-gothic-atf', sans-serif" } as const;
const eyebrowCls = 'block text-[#cc1e23] text-xs tracking-[0.3em] uppercase mb-3';

function toPayload({ inputs, results }: MacroSnapshot): ToolGatePayload {
  return {
    units: inputs.units,
    sex: inputs.sex,
    age: inputs.age,
    weight: inputs.weight,
    height_ft: inputs.ft,
    height_in: inputs.inch,
    height_cm: inputs.cm,
    body_fat: inputs.bf,
    daily_activity: inputs.neat,
    sessions_per_week: inputs.sessions,
    session_minutes: inputs.minutes,
    session_style_met: inputs.styleMet,
    conditioning: inputs.cond,
    goal: inputs.goal,
    calories: results.kcal,
    protein_g: results.pG,
    carbs_g: results.cG,
    fat_g: results.fG,
  };
}

export function MacroCalculatorPage() {
  const canonicalUrl = `${getPublicSiteOrigin()}/macro-calculator`;
  const [snapshot, setSnapshot] = useState<MacroSnapshot | null>(null);

  return (
    <>
      <SEO
        title="Macro Calculator"
        description="Free macro calculator from Brit's Brothers Gym in Greenville, SC. Get a daily calorie target and protein, carb, and fat split built around how you actually train."
        keywords="macro calculator, calorie calculator lifters, strongman weight class, Brit's Brothers Gym Greenville"
        canonicalUrl={canonicalUrl}
      />

      <div className="bg-[#121214]">
        <header className="pt-40 pb-10 border-b border-[#2a2a2c]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#cc1e23] text-sm tracking-[0.3em] uppercase mb-4" style={{ ...bodyStyle, fontWeight: 700 }}>
              Free Tool · Greenville, SC
            </p>
            <h1 className="text-[#fdfdff] text-4xl md:text-5xl lg:text-6xl leading-tight tracking-tight mb-6" style={headingStyle}>
              Macro Calculator
            </h1>
            <p className="text-[#a7a7ad] text-xl leading-relaxed" style={bodyStyle}>
              Your starting numbers for eating around the bar. Fill it out, get a target, then adjust off what the
              scale and your lifts actually do over the next three weeks.
            </p>
          </div>
        </header>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <MacroCalculator
            onCalculate={setSnapshot}
            renderResults={(resultsNode) => (
              <ToolGate
                source="macro-calculator"
                leadEndpoint="/api/macro-lead"
                payload={snapshot ? toPayload(snapshot) : undefined}
                heading="Your Target Is Ready"
                description="Add your first name and email to see your daily calories and macros. We receive your numbers along with your email."
              >
                {resultsNode}
              </ToolGate>
            )}
          />
        </section>

        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="bg-[#1c1c1e] border border-[#2a2a2c] p-8 md:p-10 text-center">
            <span className={eyebrowCls} style={{ ...bodyStyle, fontWeight: 700 }}>Not sure what to do with these</span>
            <h2 className="text-[#fdfdff] text-3xl md:text-4xl tracking-wider mb-4" style={headingStyle}>
              Sit Down With Olly
            </h2>
            <p className="text-[#a7a7ad] text-lg leading-relaxed mb-6" style={bodyStyle}>
              Thirty minutes on the floor with the owner. He will look at your numbers, your training, and tell you straight
              what needs to change. No cost, no contract.
            </p>
            <Link
              to="/consultation"
              className="inline-block bg-[#cc1e23] hover:bg-[#a8181d] text-[#fdfdff] px-8 py-4 text-sm tracking-[0.2em] uppercase transition-colors"
              style={{ ...bodyStyle, fontWeight: 700 }}
            >
              Book Your Free Evaluation
            </Link>
          </div>
        </section>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <p className="text-[#5a5a61] text-xs leading-relaxed" style={bodyStyle}>
            These are estimates from published formulas, not medical or nutrition advice. Brit&apos;s Brothers Gym is not a
            medical provider. If you are pregnant, managing a health condition, taking medication that affects appetite or
            metabolism, or you have a history of disordered eating, talk to your doctor or a registered dietitian before
            changing how you eat. Members under 18 should work with a coach and a parent rather than a calculator.
          </p>
        </div>
      </div>
    </>
  );
}
