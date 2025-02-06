use octa_flip::models::{Game, GameTrait, GameCounter};

// define the interface
#[starknet::interface]
pub trait IActions<T> {
    fn create_new_game_id(ref self: T) -> u64;
    fn get_current_game_id(self: @T) -> u64;

    fn create_new_game(ref self: T) -> u64;
}

// dojo decorator
#[dojo::contract]
pub mod actions {
    use super::{IActions, Game, GameTrait, GameCounter};
    use starknet::{
        ContractAddress, get_caller_address, get_block_timestamp, contract_address_const,
    };
    use octa_flip::utils::{zero_address};

    use dojo::model::{ModelStorage};
    use dojo::event::EventStorage;

    #[derive(Copy, Drop, Serde)]
    #[dojo::event]
    pub struct GameCreated {
        #[key]
        pub game_id: u64,
        pub timestamp: u64,
    }

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn create_new_game_id(ref self: ContractState) -> u64 {
            let mut world = self.world_default();
            let mut game_counter: GameCounter = world.read_model('v0');
            let new_val = game_counter.current_val + 1;
            game_counter.current_val = new_val;
            world.write_model(@game_counter);
            new_val
        }

        fn get_current_game_id(self: @ContractState) -> u64 {
            let world = self.world_default();
            let game_counter: GameCounter = world.read_model('v0');
            game_counter.current_val
        }

        fn create_new_game(ref self: ContractState) -> u64 {
            // Get default world
            let mut world = self.world_default();

            // Get the account address of the caller
            let caller_address = get_caller_address();
            let zero_address = zero_address();

            let game_id = self.create_new_game_id();
            let timestamp = get_block_timestamp();

            // Create a new game
            let new_game: Game = GameTrait::new(game_id, caller_address, zero_address);

            world.write_model(@new_game);

            world.emit_event(@GameCreated { game_id, timestamp });

            game_id
        }
    }

    #[generate_trait]
    impl InternalImpl of InternalTrait {
        /// Use the default namespace "dojo_starter". This function is handy since the ByteArray
        /// can't be const.
        fn world_default(self: @ContractState) -> dojo::world::WorldStorage {
            self.world(@"octa_flip")
        }
    }
}

