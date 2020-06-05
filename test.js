const BoxIncomplete = artifacts.require("BoxIncomplete");
const IncreasingPenalty = artifacts.require("IncreasingPenalty");
const PenaltyFunction = artifacts.require("PenaltyFunction");
const SimplePenalty = artifacts.require("SimplePenalty");

contract("Box", accounts => {
  it("t1", () =>
    let accounts = web3.eth.getAccounts().then(function(acc){ accounts = acc })
    BoxIncomplete.deployed()
      .then(instance => instance.ship.call({from:accounts[0]}))
      .then(receipt => {
        console.log(receipt.gasUsed())
      }));
});
