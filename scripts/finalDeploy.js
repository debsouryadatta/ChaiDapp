const main = async() => {
    const Chai = await ethers.getContractFactory("Chai");
    const contract = await Chai.deploy();
    await contract.waitForDeployment();
    console.log("Address of contract: ", await contract.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})