#[cfg(test)]
mod tests {
    use dojo_cairo_test::WorldStorageTestTrait;
    use dojo::model::{ModelStorage, ModelStorageTest};
    use dojo::world::{WorldStorageTrait, WorldStorage};
    use dojo_cairo_test::{
        spawn_test_world, NamespaceDef, TestResource, ContractDefTrait, ContractDef,
    };

    use octa_flip::systems::actions::{actions, IActionsDispatcher, IActionsDispatcherTrait};
    use octa_flip::models::{Game, m_Game, GameCounter, m_GameCounter};

    fn namespace_def() -> NamespaceDef {
        let ndef = NamespaceDef {
            namespace: "octa_flip",
            resources: [
                TestResource::Model(m_Game::TEST_CLASS_HASH),
                TestResource::Model(m_GameCounter::TEST_CLASS_HASH),
                TestResource::Event(actions::e_GameCreated::TEST_CLASS_HASH),
                TestResource::Contract(actions::TEST_CLASS_HASH),
            ]
                .span(),
        };

        ndef
    }

    fn contract_defs() -> Span<ContractDef> {
        [
            ContractDefTrait::new(@"octa_flip", @"actions")
                .with_writer_of([dojo::utils::bytearray_hash(@"octa_flip")].span())
        ]
            .span()
    }

    fn setup_world() -> (WorldStorage, IActionsDispatcher) {
        let ndef = namespace_def();
        let mut world = spawn_test_world([ndef].span());
        world.sync_perms_and_inits(contract_defs());

        let (contract_address, _) = world.dns(@"GameActions").unwrap();
        let game_action_system = IActionsDispatcher { contract_address };

        (world, game_action_system)
    }

    #[test]
    fn test_create_new_game_id() {
        let (world, game_action_system) = setup_world();
        let game_counter: GameCounter = world.read_model('v0');

        let new_game_id = game_action_system.create_new_game_id();
        let expected_new_game_id = game_counter.current_val + 1;

        assert_eq!(new_game_id, expected_new_game_id);
    }
}
