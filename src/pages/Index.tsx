import About from "../components/About";
import Comments from "../components/Comments";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Location from "../components/Location";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Location />
      <Comments />
      <Footer />
    </div>
  );
};

export default Index;
