import React, { useState, useEffect } from 'react';
import { myQuotes } from './quotes';

function App() {
  const [quote, setQuote] = useState({ text: "Loading...", author: "" });
  const [weather, setWeather] = useState({ temp: "--", desc: "Loading..." });
  
  // Tasks memory
  const [tasks, setTasks] = useState([
    { id: 1, text: "Outwork the competition", completed: false },
    { id: 2, text: "Outsmart the obstacles", completed: false },
    { id: 3, text: "Outlast the struggle", completed: false }
  ]);

  // Function to pick a random quote
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * myQuotes.length);
    setQuote(myQuotes[randomIndex]);
  };

  // Initial Quote Load - I removed the unused 'randomIndex' here
  useEffect(() => {
    getRandomQuote();
  }, []);

  // Weather Logic
  useEffect(() => {
    const API_KEY = "b53958bda0b5b6f7e247c2f9c437285d"; 
    const city = "Nagpur";
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        setWeather({
          temp: Math.round(data.main.temp),
          desc: data.weather[0].description
        });
      })
      .catch(() => setWeather({ temp: "!!", desc: "Offline" }));
  }, []);

  // Task Toggle Logic
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans flex flex-col items-center py-20 px-4">
      
      <header className="mb-16 text-center">
        <h1 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-2 font-medium">Morning, Commander</h1>
        <h2 className="text-4xl font-light">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h2>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        
        {/* THE VIBE */}
        <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between min-h-[250px] relative">
          <div>
            <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6 font-medium">The Vibe</h3>
            <p className="text-lg italic text-gray-600 leading-relaxed">"{quote.text}"</p>
          </div>
          
          <div className="flex justify-between items-end mt-4">
            <p className="text-xs text-gray-400 font-medium">— {quote.author}</p>
            <button 
              onClick={getRandomQuote}
              className="text-[10px] uppercase tracking-tighter text-gray-300 hover:text-blue-400 transition-colors border border-gray-100 px-2 py-1 rounded-md"
            >
              New Briefing
            </button>
          </div>
        </div>

        {/* THE ATMOSPHERE */}
        <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6 font-medium">The Atmosphere</h3>
          <p className="text-4xl font-light text-blue-400">{weather.temp}°C</p>
          <p className="text-gray-500 capitalize">{weather.desc} in Nagpur</p>
        </div>

        {/* THE FOCUS */}
        <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-6 font-medium">The Focus</h3>
          <ul className="space-y-4">
            {tasks.map(task => (
              <li 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                  task.completed ? 'bg-green-400 border-green-400' : 'border-gray-300 group-hover:border-gray-400'
                }`}>
                  {task.completed && <span className="text-white text-xs">✓</span>}
                </div>
                <span className={`text-sm transition-all ${
                  task.completed ? 'text-gray-300 line-through' : 'text-gray-600'
                }`}>
                  {task.text}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default App;