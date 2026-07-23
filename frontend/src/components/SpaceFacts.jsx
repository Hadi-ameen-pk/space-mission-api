import { useState } from "react";

const facts = [
  "A day on Venus is longer than a year on Venus.",
  "The Sun contains over 99% of the Solar System's mass.",
  "Black holes can bend light using gravity.",
  "Neutron stars can spin over 600 times every second.",
  "One million Earths could fit inside the Sun.",
  "Saturn could float in water because its density is very low.",
  "There are more stars in the universe than grains of sand on Earth.",
  "The footprints left on the Moon may remain for millions of years.",
  "Jupiter has the shortest day of all planets, lasting about 10 hours.",
  "Light from the Sun takes about 8 minutes to reach Earth."
];

function SpaceFacts() {
  const [fact, setFact] = useState(facts[0]);

  const randomFact = () => {
    const index = Math.floor(Math.random() * facts.length);
    setFact(facts[index]);
  };

  return (
    <section className="facts-section">
      <h2>Did You Know?</h2>

      <div className="fact-card">
        <p>{fact}</p>

        <button onClick={randomFact}>
          Next Fact
        </button>
      </div>
    </section>
  );
}

export default SpaceFacts;