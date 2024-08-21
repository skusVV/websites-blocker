# Website Blocker
#### Video Demo:  https://youtu.be/Bo8Xvhm8se4
#### Description: Chrome exstention that allow you to block websites for some times. User can run timer when sites will be blocked. There are 2 pages. The first page it is timer, you can set the desired value in minutes, click start and stop. Another page it is settings, when you can add more websites into the list, remove websites from the list and edit it. I use localStorage to keep data when I close popup window. Also, I use background script to observing when you opening sites from the list. And when you do so, it will redirect you to Chrome homepage instead of desired website. This project Built on React and for styling I used tailwind Css. In the React, I use functional components and hooks. Also, I created one custom hook aimed to manage the state and save it to localStorage - it is useState with improvements.

### TODO
- Add confirm window for remove site from list
- Highlight input if user try to add invalid website
- Save on "Enter" click
- Maybe: create different lists, something like: you have one list of restriction when you work and another list when you learning.