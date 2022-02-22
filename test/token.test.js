import { tokens, EVM_REVERT } from './helpers'

const Token = artifacts.require("./ShmeepsToken")

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('ShmeepsToken', accounts => {
	let token

	beforeEach(async () => {
		token = await Token.new()
	})

	describe('sending tokens', () => {
		let amount
		let result

		describe('success', () => {

			beforeEach(async () => {
				amount = tokens(10)
				await token.addAdmin(accounts[0])
				await token.mint(accounts[0], tokens(100))
				result = await token.transfer(accounts[1], amount, { from: accounts[0] })
			})

			it('transfers token balances', async () => {
				let balanceOf
				balanceOf = await token.balanceOf(accounts[0])
				console.log(balanceOf.toString())
				balanceOf.toString().should.equal(tokens(90).toString())
				balanceOf = await token.balanceOf(accounts[1])
				balanceOf.toString().should.equal(tokens(10).toString())
			})

			it('emits a transfer event', () => {
				const log = result.logs[0]
				log.event.should.equal('Transfer')
				const event = log.args
				event.from.should.equal(accounts[0])
				event.to.should.equal(accounts[1])
				event.value.toString().should.equal(amount.toString())
			})
		})
	})
})