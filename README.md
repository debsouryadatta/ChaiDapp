### Steps of Dev
1. Writing a basic smart contract on Remix
   
2. `pnpm install --save-dev hardhat`, `npx hardhat init`
   
3. Copying the smart contract to the Chai.sol file
   
4. Writing few functions in deploy.js - getBalance(), consoleBalances(), consoleMemos(), just for testing purposes and then deploying the contract in the main() and calling these functions
   
5. `pnpm create vite` to create the client app
   
6. Writing the finalDeploy.js, adding the sepolia test network in the hardhat.config.js, `npx hardhat run scripts/finalDeploy.js --network sepolia`
   
7. In the client app, creating connectWallet() function where we are setting the provider, signer & contract in a single state object(also setting the contractAddress and the contractABI)
   
8. Creating Buy component and the Memos component and adding them to the App.jsx, passing the state object to both components

9. Buy Component -> Calling the buyChai() func of the smart contract, Memos Component -> Calling the getMemos() func of the smart contract

10. Deploying the client app on the Vercel
