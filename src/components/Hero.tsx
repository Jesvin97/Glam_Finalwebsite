  export default function Hero() {

  return (

    <section className="hero">

      <div className="hero-content">

        <h1>
          Premium Unisex Salon
          <br />
          <span className="gold-text">
            in Thiruvalla
          </span>
        </h1>

        <p>
          Welcome to Glam'more, the leading unisex salon in Thiruvalla. 
          Discover luxury treatments, expert styling, flawless bridal makeup, 
          and revitalizing wellness services designed to make you feel your absolute best.
        </p>

        <div className="hero-buttons">

          <a href="/services" className="primary-btn">
            Book Your Visit
          </a>

        </div>

      </div>

      <div className="hero-image">

        <img
          src="/images/model.png"
          alt="Beauty Model"
        />

      </div>

    </section>
  );
}