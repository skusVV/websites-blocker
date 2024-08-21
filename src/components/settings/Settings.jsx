import { useState, useEffect } from "react";

function isValidUrl(url) {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;

    return urlPattern.test(url);
}

function Settings({ goBack }) {
    const [inputValue, setInputValue] = useState('');
    const [urls, setUrls] = useState(JSON.parse(localStorage.getItem('URLS') || '[]'));
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        if(!window.chrome.runtime) {
            return;
        }

        window.chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.type === "getData") {
                const data = "This is the data from popup.js";

                sendResponse({ data: data });
            }

            return true;
        });
    }, [])

    const saveUrls = newUrls => {
        localStorage.setItem('URLS', JSON.stringify(newUrls));
        if(!window.chrome.runtime) {
            return;
        }
        window.chrome.runtime.sendMessage({ type: 'UPDATE_URLS', urls: newUrls }, function(response) {
            if (response.status === 'success') {
                console.log('Redirect URL successfully updated in background script');
            }
        });
        setUrls(newUrls);
    }

    const handleAddOrChange = () => {
        if(!inputValue || !isValidUrl(inputValue)) {
            return;
        }

        if (isEditing) {
            const updatedUrls = urls.map((url, index) =>
                index === editIndex ? inputValue : url
            );
            saveUrls(updatedUrls);
            setIsEditing(false);
            setEditIndex(null);
        } else {
            saveUrls([...urls, inputValue]);
        }
        setInputValue('');
    };

    const handleEdit = (index) => {
        setInputValue(urls[index]);
        setIsEditing(true);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        const updatedUrls = urls.filter((_, i) => i !== index);
        saveUrls(updatedUrls);
    };

    return (
        <div className="flex flex-col w-screen items-center  h-screen p-2">
            <button
                onClick={goBack}
                className="self-start mb-4 bg-gray-100 hover:bg-gray-300 text-gray-700 font-semibold py-1 px-3 rounded-lg transition duration-200">
                Back
            </button>
            <div className="bg-white rounded-lg shadow-md w-full max-w-sm">
                <label className="block mb-4">
                    <div className="text-gray-700 text-sm font-semibold mb-2">
                        {isEditing ? "Edit item" : "Add more items"}
                    </div>
                    <input
                        id="input-field"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </label>
                <button
                    onClick={handleAddOrChange}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-200">
                    {isEditing ? "Change" : "Add"}
                </button>
            </div>
            <div className="mt-6 w-full max-w-sm">
                {urls.map((url, index) => (
                    <div key={index}
                         className="bg-white p-4 mb-2 rounded-lg shadow-md flex justify-between items-center">
                        <span className="text-gray-700">{url}</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleEdit(index)}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-1 px-3 rounded-lg transition duration-200">
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(index)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-lg transition duration-200">
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Settings;