import React from 'react';
import { Link } from 'react-router-dom';

function TestimonialCarousel() {
  const testimonials = [
    { 
      name: 'Avery Johnson', 
      handle: '@averywrites', 
      avatar: 'https://i.pravatar.cc/100?img=1', 
      text: 'ResumeAI Pro made creating my resume an absolute breeze. The AI suggestions were incredibly accurate!' 
    },
    { 
      name: 'Briar Martin', 
      handle: '@neilstellar', 
      avatar: 'https://i.pravatar.cc/100?img=2', 
      text: 'Finally a resume builder that actually understands what recruiters want. Landed 3 interviews in a week!' 
    },
    { 
      name: 'Jordan Lee', 
      handle: '@jordantalks', 
      avatar: 'https://i.pravatar.cc/100?img=3', 
      text: 'The ATS optimization feature is a game-changer. My resume finally gets past the automated filters.' 
    },
    { 
      name: 'Sarah Chen', 
      handle: '@sarahcodes', 
      avatar: 'https://i.pravatar.cc/100?img=4', 
      text: 'Beautiful templates and smart AI. This is exactly what a modern resume builder should look like.' 
    },
    { 
      name: 'Mike Rodriguez', 
      handle: '@mikedev', 
      avatar: 'https://i.pravatar.cc/100?img=5', 
      text: 'Went from zero callbacks to multiple job offers. The AI really knows how to highlight your strengths.' 
    },
    { 
      name: 'Emma Wilson', 
      handle: '@emmaw', 
      avatar: 'https://i.pravatar.cc/100?img=6', 
      text: 'So much better than traditional resume builders. The chat feature makes it incredibly intuitive to use.' 
    },
    { 
      name: 'David Park', 
      handle: '@davidp', 
      avatar: 'https://i.pravatar.cc/100?img=7', 
      text: 'Professional quality resume in under 10 minutes. The templates are stunning and ATS-friendly.' 
    },
    { 
      name: 'Lisa Thompson', 
      handle: '@lisawrites', 
      avatar: 'https://i.pravatar.cc/100?img=8', 
      text: 'I was skeptical at first, but this tool genuinely improved my resume. Got my dream job!' 
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="testimonials-content">
        <div className="testimonials-header">
          <span className="testimonials-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Testimonials
          </span>
          <h2>Don't just take our words</h2>
          <p>Hear what our users say about us. We're always looking for ways to improve. If you have a positive experience with us, leave a review.</p>
        </div>

        <div className="testimonials-carousel">
          {/* Row 1 - Scrolls Left */}
          <div className="testimonial-track">
            <div className="testimonial-slide slide-left">
              {[...testimonials, ...testimonials].map((testimonial, idx) => (
                <div key={`row1-${idx}`} className="testimonial-card">
                  <div className="testimonial-user">
                    <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                    <div className="testimonial-info">
                      <span className="testimonial-name">
                        {testimonial.name}
                        <span className="verified-badge">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                      </span>
                      <span className="testimonial-handle">{testimonial.handle}</span>
                    </div>
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Scrolls Right */}
          <div className="testimonial-track">
            <div className="testimonial-slide slide-right">
              {[...testimonials.slice(4), ...testimonials.slice(0, 4), ...testimonials.slice(4), ...testimonials.slice(0, 4)].map((testimonial, idx) => (
                <div key={`row2-${idx}`} className="testimonial-card">
                  <div className="testimonial-user">
                    <img src={testimonial.avatar} alt={testimonial.name} className="testimonial-avatar" />
                    <div className="testimonial-info">
                      <span className="testimonial-name">
                        {testimonial.name}
                        <span className="verified-badge">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </span>
                      </span>
                      <span className="testimonial-handle">{testimonial.handle}</span>
                    </div>
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
        <Link to="/" className="nav-logo">
          <div className="logo-icon">R</div>
          <span className="logo-text">resume<span className="logo-dot">.</span></span>
        </Link>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
        </div>
        <div className="nav-actions">
          <Link to="/login" className="btn btn-ghost-light">Login</Link>
          <Link to="/signup" className="btn btn-accent">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          TRUSTED BY 10,000+ PROFESSIONALS
        </div>
        <h1 className="hero-title">
          Land your dream job<br />with<br />
          <span className="hero-highlight">AI-powered</span> resumes
        </h1>
        <p className="hero-subtitle">
          Create, edit and download professional resumes in minutes with
          ResumeAI Pro. Elite quality that rivals $500 writing services.
        </p>
        <div className="hero-cta">
          <Link to="/signup" className="btn btn-accent btn-lg">
            Start Building Now — It's Free
          </Link>
          <button className="btn btn-ghost-light btn-lg">
            <span className="play-icon">▶</span>
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon icon-yellow">✦</div>
            <h3>AI Intelligence</h3>
            <p>Smarter descriptions that highlight your achievements.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon icon-pink">⎔</div>
            <h3>ATS-Proof</h3>
            <p>Zero parsing errors with optimized formatting.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon icon-cyan">◈</div>
            <h3>Expert Design</h3>
            <p>Stunning templates crafted by professionals.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon icon-green">⚡</div>
            <h3>Instant Edit</h3>
            <p>Real-time updates as you type.</p>
          </div>
        </div>
      </section>

      <TestimonialCarousel />

      {/* CTA Section */}
      <section className="cta-section">
        <h2 className="text-white text-4xl font-bold mb-8 text-center">Ready to build your perfect resume?</h2>
        <div className="flex justify-center">
          <Link to="/signup" className="btn btn-accent btn-lg">Get Started Free</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-icon">R</div>
            <span>resume<span className="logo-dot">.</span></span>
          </div>
          <p>© 2024 ResumeAI Pro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;