import React, { useState, useEffect } from "react";
import dice from "./assets/icon-dice.svg";
import patternDesktop from "./assets/pattern-divider-desktop.svg";
import patternMobile from "./assets/pattern-divider-mobile.svg";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [advice, setAdvice] = useState(
    "As you get older, learn never to trust a fart."
  );
  const [count, setCount] = useState("");

  const url = "https://api.adviceslip.com/advice";

  const fetchAdvice = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const { id, advice } = data.slip;
      setLoading(false);
      setAdvice(advice);
      setCount(id);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);
  return (
    <>
      <main>
        <div class="card">
          <p class="advice-count">
            Advice #<span id="count">{count}</span>
          </p>
          {loading ? (
            <div className="loading"></div>
          ) : (
            <blockquote>
              " <span id="advice">{advice}</span> "
            </blockquote>
          )}

          <div class="pattern-divider">
            <img src={patternMobile} alt="pattern divider" class="mobile-img" />
            <img
              src={patternDesktop}
              alt="pattern divider"
              class="desktop-img"
            />
          </div>

          <button
            class="dice-container"
            type="button"
            onClick={fetchAdvice}
            disabled={loading}
          >
            <img src={dice} alt="dice icon" class="dice" />
          </button>
        </div>

        <div class="attribution">
          Challenge by{" "}
          <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
            Frontend Mentor
          </a>
          . Coded by <a href="#">Prince Udum</a>.
        </div>
      </main>
    </>
  );
};

export default App;
