use starknet::{ContractAddress, contract_address_const};

pub fn zero_address() -> ContractAddress {
    contract_address_const::<0x0>()
}
