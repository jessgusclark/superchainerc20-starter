// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import {console} from "forge-std/Script.sol";
import {Script} from "forge-std/Script.sol";
import {SuperchainERC20Deployer} from "./SuperchainERC20Deployer.sol";

contract MultiChainSuperchainERC20Deployment is Script, SuperchainERC20Deployer {
    function setUp() public {}

    function run() public {
        string[] memory chainsToDeployTo = vm.parseTomlStringArray(deployConfig, ".multi_chain_deploy_config.chains");

        for (uint256 i = 0; i < chainsToDeployTo.length; i++) {
            string memory chainToDeployTo = chainsToDeployTo[i];

            console.log("Deploying to chain: ", chainToDeployTo);

            vm.createSelectFork(chainToDeployTo);
            deployL2NativeSuperchainERC20();
        }
    }
}
