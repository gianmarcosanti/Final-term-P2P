var BoxIncomplete = artifacts.require("BoxIncomplete");
var IncreasingPenalty = artifacts.require("IncreasingPenalty");
var PenaltyFunction = artifacts.require("PenaltyFunction");
var SimplePenalty = artifacts.require("SimplePenalty");

module.exports = function(deployer, network, accounts) {
//  let accounts = web3.eth.getAccounts().then(function(acc){ accounts = acc })
  deployer.deploy(SimplePenalty,{from:accounts[0]}).then(function() {
  	return deployer.deploy(BoxIncomplete, accounts[1], accounts[2], SimplePenalty.address,{from:accounts[0]});
  })
};
