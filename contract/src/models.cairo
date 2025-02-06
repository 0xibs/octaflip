use starknet::ContractAddress;

// Player model
#[derive(Drop, Copy, Serde)]
#[dojo::model]
pub struct Game {
    #[key]
    pub id: u64,
    pub player_1: ContractAddress,
    pub player_2: ContractAddress,
}

pub trait GameTrait {
    fn new(game_id: u64, player_1: ContractAddress, player_2: ContractAddress) -> Game;
}

impl GameImpl of GameTrait {
    fn new(game_id: u64, player_1: ContractAddress, player_2: ContractAddress) -> Game {
        Game { id: game_id, player_1, player_2 }
    }
}

#[derive(Serde, Copy, Drop, Introspect, PartialEq)]
#[dojo::model]
pub struct GameCounter {
    #[key]
    pub id: felt252,
    pub current_val: u64,
}
