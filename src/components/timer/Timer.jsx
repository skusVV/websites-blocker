import { useState, useEffect } from "react";

const TEN_MINUTES = 600;
const TWENTY_MINUTES = 1200;

function Timer({ goToSettings }) {
    const [time, setTime] = useState(TEN_MINUTES); // default 5 minutes in seconds
    const [customTime, setCustomTime] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        if (isRunning && time > 0) {
            const id = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            setIntervalId(id);
        } else if (time === 0 && intervalId) {
            clearInterval(intervalId);
            setIsRunning(false);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    const handleStart = () => {
        setIsRunning(true);
    };

    const handleStop = () => {
        setTime(TEN_MINUTES);
        setIsRunning(false);
        clearInterval(intervalId);
    };

    const handleTimeChange = (newTime) => {
        if (isRunning) {
            return;
        }
        setTime(newTime);
        setCustomTime('');
    };

    const handleCustomTimeChange = (e) => {
        setCustomTime(e.target.value);
        setTime(Number(e.target.value) * 60);
    };

    return (
        <div className="flex flex-col items-center  h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <div className="mb-4 text-gray-700 text-sm font-semibold">Select Time</div>
                <div className="flex justify-between mb-4">
                    <button
                        onClick={() => handleTimeChange(TEN_MINUTES)}
                        className={`px-4 py-2 rounded-lg ${time === TEN_MINUTES ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                        10 min
                    </button>
                    <button
                        onClick={() => handleTimeChange(TWENTY_MINUTES)}
                        className={`px-4 py-2 rounded-lg ${time === TWENTY_MINUTES ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                        20 min
                    </button>
                    <input
                        type="number"
                        disabled={isRunning}
                        placeholder="Custom (min)"
                        value={customTime}
                        onChange={handleCustomTimeChange}
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={handleStart}
                        disabled={isRunning}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition duration-200 mr-2">
                        Start
                    </button>
                    <button
                        onClick={handleStop}
                        disabled={!isRunning}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition duration-200">
                        Stop
                    </button>
                </div>

                <div className="mt-4 text-center text-lg font-semibold text-gray-700">
                    {`${Math.floor(time / 60)}:${String(time % 60).padStart(2, '0')}`}
                </div>
            </div>
            <button
                onClick={goToSettings}
                className="mt-6 text-blue-500 hover:underline">
                Go to Settings
            </button>
        </div>
    );
}

export default Timer;