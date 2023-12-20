
function HomePage() {
  return (
    <div className="home-page">
      <header>
        <h1>Welcome to Our Website</h1>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <h2>Our Amazing Products</h2>
          <p>Discover the best solutions for your needs.</p>
          <button>Learn More</button>
        </section>
        <section className="features">
          <h2>Key Features</h2>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Your Company</p>
      </footer>
    </div>
  );
}

export default HomePage;
