# Website Blocker
#### Video Demo:  https://youtu.be/Bo8Xvhm8se4
#### Description:
Chrome Extension that allow you to block websites for some times. 
Technologies: I used React as framework, I believe it is good library for modern web application. The react app was create with create-react-app util. Then, I added manifest.json and a build script to make it build as a Chrome Extension
Structure: I have 2 pages in the popup window and background script. First page for control timer, second page for maneging the list of websites to be blocked. And background script to check is the website in the list before open the page.
Challenges: There were many bugs related to time, firstly I just stored the value for which time it should work: For example 10 minutes. But then I realized, that it is hard to track how this value change, So I decided to store only the time until it should work. In this approach it doesn't matter the popup window is opened or not.
Another challenge was is how to keep the data if you close the popup window, so I decided to use localStorage for this. And to get rid of code duplication during this, I created a custom Hook, it is wrapper on useState but it also duplicate all data to localStorage.
Improvement: There are a couple things I would like to improve, I listed it in the TODO section below.

### TODO
- Add confirm window for remove site from list
- Highlight input if user try to add invalid website
- Save on "Enter" click
- Maybe: create different lists, something like: you have one list of restriction when you work and another list when you learning.