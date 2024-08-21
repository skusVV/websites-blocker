import { useState, useEffect } from "react";

function formatTimeDifference(timestamp) {
    const differenceInMs = Math.abs(Date.now() - timestamp);
    const totalSeconds = Math.ceil(differenceInMs / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function useLocalStorageState(initialValue, key ) {
    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state));
    }, [key, state]);

    return [state, setState];
}

function Timer({ goToSettings }) {
    const [time, setTime] = useLocalStorageState(null, 'time');
    const [customTime, setCustomTime] = useLocalStorageState('20', 'customTime');
    const [isRunning, setIsRunning] = useLocalStorageState(false, 'isRunning');
    const [intervalId, setIntervalId] = useLocalStorageState(null, 'intervalId');
    const [timer, setTimerValue] = useLocalStorageState(null, 'timer');

    useEffect(() => {
        const id = setInterval(() => {
            if(!time) {
                return;
            }
            if (isRunning && time > Date.now()) {
                setTimerValue(Math.random())
            } else if (time <= Date.now()) {
                clearInterval(intervalId);
                setIsRunning(false);
                setTimerValue(null);
            }
        }, 1000);
        setIntervalId(id);

    }, [ isRunning, timer ]);

    const handleStart = () => {
        // TODO notify background script about time and that it is running
        const newTime = new Date().getTime() + customTime * 60 * 1000;
        setTime(newTime);
        setIsRunning(true);

        window.chrome.runtime.sendMessage({ type: 'UPDATE_DATA', data: { time: newTime, isRunning: true } }, function(response) {
            if (response.status === 'success') {
                console.log('Redirect URL successfully updated in background script');
            }
        });
    };

    const handleStop = () => {
        // TODO notify background script about STOP
        setIsRunning(false);
        clearInterval(intervalId);
        setTimerValue(null);

        window.chrome.runtime.sendMessage({ type: 'UPDATE_DATA', data: { time: null, isRunning: false } }, function(response) {
            if (response.status === 'success') {
                console.log('Redirect URL successfully updated in background script');
            }
        });
    };

    const handleCustomTimeChange = (e) => {
        setCustomTime(e.target.value);
    };

    return (
        <div className="flex flex-col items-center  h-screen">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
                <div className="mb-4 text-gray-700 text-sm font-semibold">Select Time</div>
                <div className="flex justify-between mb-4">
                    <input
                        type="number"
                        disabled={isRunning}
                        placeholder="Custom (min)"
                        value={customTime}
                        onChange={handleCustomTimeChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    {
                        isRunning ? formatTimeDifference(time) : 'Are you ready?'
                    }
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