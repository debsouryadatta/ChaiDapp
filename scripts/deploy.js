const getBalance = async(address) => {
    return await ethers.provider.getBalance(address);
}

const consoleBalances = async(addresses) => {
    let counter = 0;
    for(const address of addresses){
        console.log(`Balance of address ${counter}: ${await getBalance(address)}`);
        counter++;
    }
}

const consoleMemos = (memos) => {
    for(const memo of memos){
        const timestamp = memo.timestamp;
        const name = memo.name;
        const from = memo.from;
        const message = memo.message;
        console.log(`Memo from ${name}(${from}) at ${timestamp}: ${message}`);
}}

const main = async() => {
    const [owner, from1, from2, from3] = await ethers.getSigners();
    const Chai = await ethers.getContractFactory("Chai");
    const contract = await Chai.deploy(); // instance of contract

    await contract.waitForDeployment();
    console.log("Address of contract: ", await contract.getAddress());

    const addresses = [owner.address, from1.address, from2.address, from3.address];
    console.log("Before buying chai");
    await consoleBalances(addresses);

    const amount = {value: ethers.parseEther("1")};
    await contract.connect(from1).buyChai("from1", "Very nice chai", amount);
    await contract.connect(from2).buyChai("from2", "Very nice course", amount);
    await contract.connect(from3).buyChai("from3", "Very nice info", amount);

    console.log("After buying chai");
    await consoleBalances(addresses);

    const memos = await contract.getMemos();
    consoleMemos(memos);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})