import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import MainButton from "../../shared/components/main_button";
import "./welcome_view.css";

const slides = [
  {
    icon: "💳",
    title: "See every dollar clearly",
    description:
      "Turn scattered spending into a clear picture of where your money is going each month.",
  },
  {
    icon: "📈",
    title: "Plan ahead with confidence",
    description:
      "Build budgets that feel realistic and keep your goals moving without second-guessing every purchase.",
  },
  {
    icon: "🌱",
    title: "Grow your savings steadily",
    description:
      "Create savings pots for the future and stay focused on the milestones that matter most.",
  },
];

const WelcomeView = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  const currentSlide = useMemo(() => slides[activeSlide], [activeSlide]);

  const goToNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const goToPreviousSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="welcome-screen-container">
      <div className="welcome-screen-card">
        <div className="welcome-eyebrow">Financial clarity, made simple</div>

        <div className="welcome-slide">
          <div className="welcome-slide-icon">{currentSlide.icon}</div>
          <h2>{currentSlide.title}</h2>
          <p>{currentSlide.description}</p>
        </div>

        <div className="welcome-card-footer">
          <div className="welcome-slide-cta">
            <button
              className="welcome-nav-button"
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Previous slide"
            >
              ←
            </button>
            <div className="welcome-dots" aria-label="Slide navigation">
              {slides.map((slide, index) => (
                <button
                  key={slide.title}
                  type="button"
                  className={`welcome-dot ${index === activeSlide ? "active" : ""}`}
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
            </div>
            <button
              className="welcome-nav-button"
              type="button"
              onClick={goToNextSlide}
              aria-label="Next slide"
            >
              →
            </button>
          </div>

          <MainButton
            disabled={false}
            type="button"
            onTap={() => {
              navigate("/home/Overview");
            }}
          >
            Continue to Plaid setup
          </MainButton>
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
