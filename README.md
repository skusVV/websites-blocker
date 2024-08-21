# Website Blocker
#### Video Demo:  https://youtu.be/Bo8Xvhm8se4
#### Description

“Website Blocker” is a Chrome Extension designed to help users manage their time more effectively by blocking specific websites for set periods. This tool is particularly useful for avoiding distractions and maintaining focus during work or study sessions.

Technologies Used
- React: The core framework for building the extension. React was chosen due to its robust ecosystem and suitability for modern web applications.
- create-react-app: Utilized to initialize the React app, simplifying the setup and configuration process.
- Chrome Extension APIs: Integrated through the manifest.json and custom build scripts, enabling the React app to function seamlessly as a Chrome Extension.

Structure

The extension consists of the following key components:
- Popup Pages:
- Timer Control Page: Allows users to set and manage the timer for blocking websites.
- Website Management Page: Enables users to add, remove, and manage the list of websites to be blocked.
- Background Script:
- Continuously runs in the background to check if a website is on the block list before allowing the user to access it.

Challenges

During development, several challenges were encountered:
- Time Management:
- Initially, the extension stored the duration (e.g., “10 minutes”) for which a site should be blocked. However, this approach proved difficult to manage, especially when tracking changes over time.
- The solution was to store the exact time until the block expires. This method ensures consistent behavior regardless of whether the popup window is open or closed.
- State Persistence:
- A significant challenge was maintaining state between popup window sessions. To address this, localStorage was used to persist data.
- To avoid code duplication and simplify state management, a custom React Hook was created. This hook wraps around useState and automatically synchronizes state changes with localStorage.

Future Improvements

There are several enhancements I plan to implement in future updates:
- Confirmation Dialog: Add a confirmation window when removing a site from the block list.
- Input Validation: Highlight input fields if the user attempts to add an invalid website.
- Keyboard Accessibility: Enable saving entries by pressing the “Enter” key.
- Multiple Lists: Introduce the ability to create multiple block lists tailored for different scenarios, such as work or study.


### TODO
- Add confirm window for remove site from list
- Highlight input if user try to add invalid website
- Save on "Enter" click
- Maybe: create different lists, something like: you have one list of restriction when you work and another list when you learning.