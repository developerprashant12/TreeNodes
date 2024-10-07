# Getting Started with Create React App Custom Instructions For this Project

 
################# First Section Setup the Project ######################

   # Firstly Clone the Project 
   Github Url: [Payment WorkFlow](https://github.com/developerprashant12/TreeNodes.git)


   # install node version
   Node : 16.20.2

   # npm install

   # npm start

################# First Section Setup the Project #################



################# Project Explain the given Topics #################

# Ouestion: A brief description of how you implemented core features like node resizing, undo/redo, and validation.
Answer: 

# Node Resizing : 
Nodes are resizable using the react-resizable library, which provides a user-friendly interface to change the size of nodes.

# Undo/Redo Functionality: 
Implemented using a custom hook (useUndoRedo) that maintains a history of changes to the workflow state (nodes and edges). Users can undo or redo node additions, deletions, and modifications.

# Node Connection Validation: 
Connections are validated to ensure logical relationships between nodes:
A "Payment Initialization" node can only connect to a "Payment Provider" node and vice versa.
If a connection is invalid, the action is blocked and an alert message is shown.


# Question: An explanation of how you implemented features such as auto-layout and node connection validation.
Answer: 
# Auto Layout: 
Auto layout is implemented using the dagre library. The function handleAutoLayout arranges nodes automatically in a tree-like structure, minimizing overlapping nodes and edges. This feature can be triggered manually by the user.

# Save and Load Workflow: 
Users can save the current workflow to local storage and load it later to continue from where they left off. The state is serialized to JSON and stored in the browser's local storage.

# Export/Import Workflow
Users can export the workflow as a .json file and re-import it to restore a saved state. This allows for easy sharing and restoration of specific workflows.

# Conditional Styling
Dynamic styling is applied to nodes based on specific conditions:
For example, if a payment initialization node has an amount above a certain threshold, its background color changes to visually indicate it.

# Edge Delete Button
A delete button (FaTrash icon) is displayed above each edge path. Clicking the button removes the respective edge, allowing for easy modification of connections.

################# Project Explain the given Topics #################


















****************************  PreDefined Readme Instruction ****************************


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
