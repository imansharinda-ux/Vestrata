import Hero from "./components/Hero.jsx";
import Intro from "./components/Intro.jsx";
import Features from "./components/Features.jsx";
import Steps from "./components/Steps.jsx";
import Reviews from "./components/Reviews.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Hero />
      <main>
        <Intro />
        <Features />
        <Steps />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}

export default App;
