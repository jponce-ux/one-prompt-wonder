import { useEffect, useState } from "react";

const img = (name: string) => `/img/${name}`;

const navItems = [
  ["Story", "evolution"],
  ["Anatomy", "anatomy"],
  ["Fillings", "fillings"],
  ["Street icon", "street"],
] as const;

const milestones = [
  {
    year: "1859",
    title: "The arrival",
    copy: "Originally brought to Saigon as the French baguette, it was a luxury reserved for the elite, known simply as Western Bread.",
  },
  {
    year: "1958",
    title: "The rebirth",
    copy: "At a small bakery called Hòa Mã, the baguette was transformed. Rice flour gave it a lighter crunch, while local flavors made it perfect for the vibrant pace of the city.",
  },
  {
    year: "2011",
    title: "Global recognition",
    copy: "The word “banh mi” officially entered the Oxford English Dictionary—a global culinary ambassador for the resilience and creativity of Vietnam.",
  },
] as const;

const ingredientsLeft = ["Baguette", "Cold cuts", "Pork rolls", "Margarine", "Sauce", "Pâté"];
const ingredientsRight = ["Pickled daikon", "Cucumber", "Coriander", "Pepper", "Carrot", "Chilli"];
const fillings = Array.from({ length: 8 }, (_, index) => `Fillings ${index + 1}.png`);

function Navigation({ open, close }: { open: boolean; close: () => void }) {
  return (
    <aside className={`mobile-nav ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <nav aria-label="Mobile navigation">
        <a href="#hero" onClick={close}>Top</a>
        {navItems.map(([label, id]) => (
          <a href={`#${id}`} onClick={close} key={id}>{label}</a>
        ))}
      </nav>
      <button type="button" onClick={close}>Close</button>
    </aside>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 1350);
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.18 },
    );
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const moveSlide = (direction: number) => {
    setSlide((current) => (current + direction + fillings.length) % fillings.length);
  };

  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <div className={`loader ${ready ? "is-gone" : ""}`} aria-hidden="true">
        <div className="loader-circle" />
        <div className="loader-words"><b>Crispy</b><b>Tasty</b><b>Irresistible</b></div>
      </div>
      <Navigation open={menuOpen} close={() => setMenuOpen(false)} />
      <button className="floating-menu" type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation menu">Menu</button>

      <main>
        <section className="hero" id="hero">
          <header className="hero-nav">
            {navItems.slice(0, 2).map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
            <span>#TheTasteOfVietnam</span>
            {navItems.slice(2).map(([label, id]) => <a href={`#${id}`} key={id}>{label}</a>)}
            <button type="button" onClick={() => setMenuOpen(true)}>Menu</button>
          </header>
          <div className="hero-title" aria-label="Banh mi Vietnam">
            <h1>Banh mi</h1>
            <div className="hero-sandwich">
              <img className="hero-circle" src={img("Hero banh mi circle bg.png")} alt="" />
              <img className="hero-main" src={img("Hero banh mi.png")} alt="Bánh mì sandwich" />
            </div>
            <h1>Viet nam</h1>
          </div>
          <div className="hero-foot">
            <p>/ˌbɑːn ˈmiː/ (noun)</p>
            <p>More than just a sandwich, it's a legendary, crispy flavor that resonates through generations. Feel the soul of Vietnam, with every bite.</p>
            <a href="#evolution">Discover the crunch <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section className="evolution" id="evolution">
          <div className="evolution-copy reveal">
            <p className="eyebrow">A story through time</p>
            <h2>The Evolution<br />of bánh mì</h2>
            <p>From a French delicacy to a Vietnamese street icon</p>
          </div>
          <div className="evolution-images" aria-hidden="true">
            {Array.from({ length: 6 }, (_, index) => <img src={img(`Evolution ${index + 1}.png`)} alt="" key={index} />)}
          </div>
        </section>

        <div className="milestones">
          {milestones.map((item, index) => (
            <section className={`milestone ${index % 2 ? "reverse" : ""}`} key={item.year}>
              <div className="milestone-copy reveal">
                <div><p className="eyebrow">Chapter 0{index + 1}</p><h2>{item.title}</h2><p>{item.copy}</p></div>
                <img src={img(`${item.year}.svg`)} alt={item.year} />
              </div>
              <div className="milestone-photo"><img src={img(`Banh mi ${item.year}.png`)} alt={`Bánh mì story in ${item.year}`} /></div>
            </section>
          ))}
        </div>

        <section className="anatomy-intro">
          <h2 className="reveal">Discover the delicate balance of textures and flavors that made the world fall in love</h2>
          <img className="reveal" src={img("Preanatomy banh mi.png")} alt="Fresh bánh mì ingredients" />
        </section>

        <section className="anatomy" id="anatomy">
          <div className="anatomy-heading"><img src={img("Carrot.png")} alt="Carrot" /><h2>Anatomy</h2><img src={img("Cucumber.png")} alt="Cucumber" /></div>
          <div className="anatomy-core reveal">
            <div className="ingredient-list left">{ingredientsLeft.map((item) => <span key={item}>{item}</span>)}</div>
            <div className="anatomy-image"><img className="star" src={img("Star red 10.svg")} alt="" /><img src={img("Anatomy banh mi.png")} alt="Exploded view of a bánh mì sandwich" /></div>
            <div className="ingredient-list">{ingredientsRight.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
          <div className="anatomy-heading bottom"><img src={img("Coriander.png")} alt="Coriander" /><h2>Bánh mì</h2><img src={img("Chilli.png")} alt="Chilli" /></div>
        </section>

        <section className="fillings-title" id="fillings">
          <div className="fill-title-row"><h2>Types of</h2><img src={img("Topping 1.png")} alt="Bánh mì topping" /></div>
          <div className="fill-title-row reverse"><h2>Bánh mì</h2><img src={img("Topping 2.png")} alt="Bánh mì topping" /></div>
          <div className="fill-title-row"><h2>Fillings</h2><img src={img("Topping 3.png")} alt="Bánh mì topping" /></div>
        </section>

        <section className="gallery">
          <p>Banh mi has different fillings and can be paired with many Vietnamese dishes</p>
          <div className="gallery-frame">
            <img className="frame-top" src={img("Half circle top.svg")} alt="" />
            <div className="gallery-photo" key={slide}><img src={img(fillings[slide])} alt={`Bánh mì filling variation ${slide + 1} of ${fillings.length}`} /></div>
            <img className="frame-bottom" src={img("Half circle bottom.svg")} alt="" />
          </div>
          <div className="gallery-controls">
            <button type="button" onClick={() => moveSlide(-1)} aria-label="Previous filling">←</button>
            <span>{String(slide + 1).padStart(2, "0")} / 08</span>
            <button type="button" onClick={() => moveSlide(1)} aria-label="Next filling">→</button>
          </div>
        </section>

        <section className="street" id="street">
          <div className="street-row top reveal"><img className="street-photo" src={img("Street image 1.png")} alt="Bánh mì vendor on a Vietnamese street" /><img className="paper" src={img("Popular dish.png")} alt="Popular dish" /></div>
          <div className="street-marquee" aria-label="Bánh mì can easily be found anywhere on the streets of Vietnam"><h2>Bánh mì can easily be found anywhere on the streets of Vietnam</h2><h2 aria-hidden="true">Bánh mì can easily be found anywhere on the streets of Vietnam</h2></div>
          <div className="street-row bottom reveal"><img className="paper" src={img("Delicious flavor.png")} alt="Delicious flavor" /><img className="street-photo" src={img("Street image 2.png")} alt="Bánh mì being prepared" /></div>
        </section>
      </main>

      <footer>
        <img className="footer-food top" src={img("Footer banh mi top.png")} alt="" />
        <div className="footer-title">
          <img src={img("Footer banh mi.png")} alt="Banh mi" />
          <img className="footer-paper" src={img("Footer paper center.png")} alt="Taste of Vietnam" />
          <img src={img("Footer vietnam.png")} alt="Vietnam" />
        </div>
        <div className="footer-meta"><p>©2026. A tribute to bánh mì</p><a href="#hero">Go to top ↑</a></div>
        <img className="footer-food bottom" src={img("Footer banh mi bottom.png")} alt="" />
      </footer>
    </>
  );
}

export default App;
