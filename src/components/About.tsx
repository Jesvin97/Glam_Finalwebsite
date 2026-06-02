 export default function About() {

  return (

    <section className="about-section" id="about">

      <div className="about-image">

        <img
          src="/images/reception-area.jpeg"
          alt="Salon"
        />

      </div>

      <div className="about-content">

        <p className="about-tag">
          ABOUT GLAM'MORE
        </p>

        <h2>
          Luxury
          <span className="gold-text">
            {" "}Salon Experience
          </span>
        </h2>

        <p className="about-description">

          Step into a world where elegance,
          beauty and luxury come together.

          Our salon offers world-class beauty
          treatments, professional care,
          premium styling and personalized
          wellness experiences designed for
          modern beauty standards.

        </p>

        <a href="#contact" className="primary-btn">
          Book Your Visit
        </a>

      </div>

    </section>
  );
}