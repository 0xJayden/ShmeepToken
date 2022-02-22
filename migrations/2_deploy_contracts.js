const ShmeepsToken = artifacts.require("ShmeepsToken")

module.exports = async function (deployer) {

	await deployer.deploy(ShmeepsToken)
}