# Chat App Backend

This project involves creating a backend server for a real-time chat application using Node.js and Socket.io. Node.js is used for server-side development, while Socket.io provides the real-time communication features. Users can connect to the server and join various chat rooms, where they can exchange text messages in real-time. The backend handles user authentication, message broadcasting, and room management. It ensures that messages are instantly delivered to all participants in the same chat room, creating a seamless and interactive chat experience. This project demonstrates the power of event-driven, real-time applications built with Node.js and Socket.io.
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v18.7.0

    $ npm --version
    8.15.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ npm install

## Running the project

    $ npm start

## Simple build for production

    $ npm run build