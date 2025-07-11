
import { useState, useEffect } from 'react';
import './App.css';

const story = [
  {
    text: "You wake up feeling… weird. Like bees are buzzing in your chest.",
    audio: "/sounds/buzz.mp3",
    image: "/images/bedroom.jpg",
    emotion: "anxious",
    choices: ["Tap to continue"],
    next: [1]
  },
  {
    text: "In the bathroom mirror, you see a sticky note: ‘You are not your thoughts. Love, Dad.’",
    audio: "/sounds/mirror.wav",
    image: "/images/mirror.jpg",
    emotion: "curious",
    choices: ["Tap to look closer"],
    next: [2]
  },
  {
    text: "The mirror ripples. Skyboy steps out — calm, kind, glowing. He says, ‘You are the sky. Thoughts are clouds.’",
    audio: "/sounds/skyboy.mp3",
    image: "/images/skyboy.jpg",
    emotion: "wonder",
    choices: ["Tap to hear wind and sky"],
    next: [3]
  },
  {
    text: "Boom! Anger-cloud rushes in: ‘They were so unfair!’",
    audio: "/sounds/storm.mp3",
    image: "/images/storm.jpg",
    emotion: "angry",
    choices: ["🌀 Follow the anger", "🌤 Watch the cloud"],
    next: [1, 4]
  },
  {
    text: "You choose to breathe. Skyboy smiles. ‘Nice. You watched it, not became it.’",
    audio: "/sounds/breathe.mp3",
    image: "/images/skyboy-smile.jpg",
    emotion: "relieved",
    choices: ["Feel the space between thoughts"],
    next: [5]
  },
  {
    text: "(Silence) Inhale… Exhale… You feel lighter.",
    audio: "/sounds/silence.mp3",
    image: "/images/silence.jpg",
    emotion: "calm",
    choices: ["Continue"],
    next: [6]
  },
  {
    text: "At school, someone bumps you. You start to react — but remember Skyboy.",
    audio: "/sounds/hallway.mp3",
    image: "/images/hallway.jpg",
    emotion: "irritated",
    choices: ["😡 Snap back", "👁 Notice frustration"],
    next: [1, 7]
  },
  {
    text: "You chose to notice. Skyboy whispers, ‘This is the real you.’",
    audio: "/sounds/calm.mp3",
    image: "/images/calm.jpg",
    emotion: "empowered",
    choices: ["Start again"],
    next: [0]
  }
];

export default function App() {
  const [step, setStep] = useState(0);
  const [journal, setJournal] = useState([]);
  const [audio] = useState(new Audio());

  useEffect(() => {
    const current = story[step];
    audio.src = current.audio;
    audio.play();
    setJournal(prev => [...prev, current.emotion]);
  }, [step]);

  const handleChoice = (index) => {
    setStep(story[step].next[index]);
  };

  const progress = ((step + 1) / story.length) * 100;

  return (
    <div className="app" style={{ backgroundImage: `url(${story[step].image})` }}>
      <div className="overlay">
        <div className="content">
          <div className="progress-bar"><div className="progress" style={{ width: `${progress}%` }} /></div>
          <p className="text">{story[step].text}</p>
          {story[step].choices.map((choice, index) => (
            <button key={index} onClick={() => handleChoice(index)}>{choice}</button>
          ))}
          <p className="journal">Emotions: {journal.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}
