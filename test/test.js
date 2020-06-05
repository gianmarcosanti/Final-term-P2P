const BoxIncomplete = artifacts.require("BoxIncomplete");
const SimplePenalty = artifacts.require("SimplePenalty");
const IncreasingPenalty = artifacts.require("IncreasingPenalty");

const fs = require('fs')
let rawdata = fs.readFileSync('test/test_data.json')
let testdata = JSON.parse(rawdata)

let producer_price = testdata.producer_price
let transporter_price = testdata.transporter_price

contract("BoxIncomplete", async accounts => {
	it("All_ok_simple_penalty",async function() {
		let temperature = testdata.all_ok.temperature
		let bumps = testdata.all_ok.bump
		console.log(temperature.length + " " + bumps.length)
		let instance = await BoxIncomplete.new(accounts[1], accounts[2], SimplePenalty.address, {from:accounts[0]})
		let gas = await instance.ship({from:accounts[1], value:producer_price}).then( result => {return result.receipt.gasUsed})
		console.log("Ship: " + gas)
		gas = await instance.push_data(temperature, bumps, {from:accounts[1]}).then( result => {return result.receipt.gasUsed})
		console.log("Push: " + gas)
		gas = await instance.complete({from:accounts[2], value:transporter_price}).then( result => {return result.receipt.gasUsed})
		console.log("Complete: " + gas)
	})
	it("All_not_ok_simple_penalty", async function() {
		let temperature = testdata.all_not_ok.temperature
		let bumps = testdata.all_not_ok.bump
		let instance = await BoxIncomplete.new(accounts[1], accounts[2], SimplePenalty.address, {from:accounts[0]})
		let gas = await instance.ship({from:accounts[1], value:producer_price}).then( result => {return result.receipt.gasUsed})
		console.log("Ship: " + gas)
		gas = await instance.push_data(temperature, bumps, {from:accounts[1]}).then( result => {return result.receipt.gasUsed})
		console.log("Push: " + gas)
		gas = await instance.complete({from:accounts[2], value:transporter_price}).then( result => {return result.receipt.gasUsed})
		console.log("Complete: " + gas)
	})
	it("some_ok_some_not_simple_penalty",async function() {
		let temperature = testdata.some_ok_some_not.temperature
		let bumps = testdata.some_ok_some_not.bump
		let instance = await BoxIncomplete.new(accounts[1], accounts[2], SimplePenalty.address, {from:accounts[0]})
		let gas = await instance.ship({from:accounts[1], value:producer_price}).then( result => {return result.receipt.gasUsed})
		console.log("Ship: " + gas)
		gas = await instance.push_data(temperature, bumps, {from:accounts[1]}).then( result => {return result.receipt.gasUsed})
		console.log("Push: " + gas)
		gas = await instance.complete({from:accounts[2], value:transporter_price}).then( result => {return result.receipt.gasUsed})
		console.log("Complete: " + gas)
	});
	it("All_ok_increasing_penalty",async function() {
		let temperature = testdata.all_ok.temperature
		let bumps = testdata.all_ok.bump
		let instance = await BoxIncomplete.new(accounts[1], accounts[2], IncreasingPenalty.address, {from:accounts[0]})
		let gas = await instance.ship({from:accounts[1], value:producer_price}).then( result => {return result.receipt.gasUsed})
		console.log("Ship: " + gas)
		gas = await instance.push_data(temperature, bumps, {from:accounts[1]}).then( result => {return result.receipt.gasUsed})
		console.log("Push: " + gas)
		gas = await instance.complete({from:accounts[2], value:transporter_price}).then( result => {return result.receipt.gasUsed})
		console.log("Complete: " + gas)
	})
	it("All_not_ok_increasing_penalty", async function() {
		let temperature = testdata.all_not_ok.temperature
		let bumps = testdata.all_not_ok.bump
		let instance = await BoxIncomplete.new(accounts[1], accounts[2], IncreasingPenalty.address, {from:accounts[0]})
		let gas = await instance.ship({from:accounts[1], value:producer_price}).then( result => {return result.receipt.gasUsed})
		console.log("Ship: " + gas)
		gas = await instance.push_data(temperature, bumps, {from:accounts[1]}).then( result => {return result.receipt.gasUsed})
		console.log("Push: " + gas)
		gas = await instance.complete({from:accounts[2], value:transporter_price}).then( result => {return result.receipt.gasUsed})
		console.log("Complete: " + gas)
	})
	it("some_ok_some_not_increasing_penalty",async function() {
		let temperature = testdata.some_ok_some_not.temperature
		let bumps = testdata.some_ok_some_not.bump
		let instance = await BoxIncomplete.new(accounts[1], accounts[2], IncreasingPenalty.address, {from:accounts[0]})
		let gas = await instance.ship({from:accounts[1], value:producer_price}).then( result => {return result.receipt.gasUsed})
		console.log("Ship: " + gas)
		gas = await instance.push_data(temperature, bumps, {from:accounts[1]}).then( result => {return result.receipt.gasUsed})
		console.log("Push: " + gas)
		gas = await instance.complete({from:accounts[2], value:transporter_price}).then( result => {return result.receipt.gasUsed})
		console.log("Complete: " + gas)
	});
	it("All_in_one_time",async function() {
		let temperature = testdata.some_ok_some_not.temperature
		let bumps = testdata.some_ok_some_not.bump
		let instance = await BoxIncomplete.new(accounts[1], accounts[2], SimplePenalty.address, {from:accounts[0]})
		let gas = await instance.ship({from:accounts[1], value:producer_price}).then( result => {return result.receipt.gasUsed})
		console.log("Ship: " + gas)
		gas = await instance.push_data(temperature, bumps, {from:accounts[1]}).then( result => {return result.receipt.gasUsed})
		console.log("Push: " + gas)
		gas = await instance.complete({from:accounts[2], value:transporter_price}).then( result => {return result.receipt.gasUsed})
		console.log("Complete: " + gas)
	});
	it("six_per_time",async function() {
		let temperature = testdata.some_ok_some_not.temperature
		let bumps = testdata.some_ok_some_not.bump
		let instance = await BoxIncomplete.new(accounts[1], accounts[2], SimplePenalty.address, {from:accounts[0]})
		let gas = await instance.ship({from:accounts[1], value:producer_price}).then( result => {return result.receipt.gasUsed})
		console.log("Ship: " + gas)
		for(let i=0; i<(temperature.length/6); i+=1){
			let temperature_sextets = []
			let bumps_sextets = []
			for(let j=0; j<6; j++){
				bumps_sextets.push(bumps[(i*6)+j])
				temperature_sextets.push(temperature[(i*6)+j])
			}
			gas += await instance.push_data(bumps_sextets,temperature_sextets, {from:accounts[1]}).then( result => {return result.receipt.gasUsed})
		}
		console.log("Push: " + gas)
		gas = await instance.complete({from:accounts[2], value:transporter_price}).then( result => {return result.receipt.gasUsed})
		console.log("Complete: " + gas)
	});
	it("one_pair_per_time",async function() {
		let temperature = testdata.some_ok_some_not.temperature
		let bumps = testdata.some_ok_some_not.bump
		let instance = await BoxIncomplete.new(accounts[1], accounts[2], SimplePenalty.address, {from:accounts[0]})
		let gas = await instance.ship({from:accounts[1], value:producer_price}).then( result => {return result.receipt.gasUsed})
		console.log("Ship: " + gas)
		for(let i=0; i<temperature.length; i+=1){
			let temperature_single = [temperature[i]]
			let bumps_single = [bumps[i]]
			gas += await instance.push_data(temperature_single, bumps_single, {from:accounts[1]}).then( result => {return result.receipt.gasUsed})
		}
		console.log("Push: " + gas)
		gas = await instance.complete({from:accounts[2], value:transporter_price}).then( result => {return result.receipt.gasUsed})
		console.log("Complete: " + gas)
	});
});
