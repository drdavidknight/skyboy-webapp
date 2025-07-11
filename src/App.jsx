
import { useEffect, useState } from 'react';
import './App.css';

const story = [
  {
    text: "You wake up feeling… weird. Like bees are buzzing in your chest.",
    audio: "/sounds/buzz.mp3",
    image: "/images/bedroom.jpg",
    emotion: "anxious",
    choices: ["Continue"]
  },
  {
    text: "In the mirror, a note reads: ‘You are not your thoughts.’",
    audio: "/sounds/mirror.wav",
    image: "/images/mirror.jpg",
    emotion: "curious",
    choices: ["Look closer"]
  }
];

function App() {
  const [step, setStep] = useState(0);
  const [journal, setJournal] = useState([]);
  const [audio] = useState(new Audio());

  useEffect(() => {
    const current = story[step];
    audio.src = current.audio;
    audio.play();
    setJournal((prev) => [...prev, current.emotion]);
  }, [step]);

  const handleChoice = () => {
    setStep((prev) => (prev < story.length - 1 ? prev + 1 : 0));
  };

  const progress = ((step + 1) / story.length) * 100;

  return (
    <div className="app" style={{ backgroundImage: `url(${story[step].image})` }}>
      <div className="overlay">
        <div className="content">
          <div className="progress-bar"><div className="progress" style={{ width: `${progress}%` }} /></div>
          <p className="text">{story[step].text}</p>
          <button onClick={handleChoice}>{story[step].choices[0]}</button>
          <p className="journal">Emotions: {journal.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
