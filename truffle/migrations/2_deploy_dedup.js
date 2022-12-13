const Dedup = artifacts.require("Dedup");

module.exports = function (deployer) {
  deployer.deploy(Dedup);
};
