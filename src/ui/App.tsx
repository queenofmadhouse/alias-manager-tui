import React, { useEffect, useState } from 'react';
import { Box, Text, useApp } from 'ink';
import { AliasManager } from '../services/aliasManager.js';
import AliasListView from './components/AliasListView.js';
import CommandBar from './components/CommandBar.js';
import InputModal from './components/InputModal.js';

const App: React.FC = () => {
    const [aliases, setAliases] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [selectedAlias, setSelectedAlias] = useState<string | null>(null);

    const {exit} = useApp();
    const aliasManager = new AliasManager();

    useEffect(() => {
        loadAliases();
    }, []);

    const loadAliases = async () => {
        try {
            setLoading(true);
            const loadedAliases = await aliasManager.getAliases();
            setAliases(loadedAliases);
            setError(null);
        } catch (err) {
            setError(`Failed to load aliases: ${err instanceof Error ? err.message : String(err)}`);
        } finally {
            setLoading(false);
        }
    };

    const handleAddAlias = async (name: string, command: string) => {
        try {
            await aliasManager.addAlias(name, command);
            await loadAliases();
            setShowAddModal(false);
        } catch (err) {
            setError(`Failed to add alias: ${err instanceof Error ? err.message : String(err)}`);
        }
    };

    const handleEditAlias = async (name: string, command: string) => {
        try {
            if (selectedAlias) {
                await aliasManager.removeAlias(selectedAlias);
                await aliasManager.addAlias(name, command);
                await loadAliases();
                setShowEditModal(false);
                setSelectedAlias(null);
            }
        } catch (err) {
            setError(`Failed to edit alias: ${err instanceof Error ? err.message : String(err)}`);
        }
    };

    const handleRemoveAlias = async (name: string) => {
        try {
            await aliasManager.removeAlias(name);
            await loadAliases();
        } catch (err) {
            setError(`Failed to remove alias: ${err instanceof Error ? err.message : String(err)}`);
        }
    };

    if (loading) {
        return (
            <Box>
                <Text>Loading aliases...</Text>
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                <Text color="red">{error}</Text>
            </Box>
        );
    }

    if (showAddModal) {
        return (
            <Box flexDirection="column">
                <InputModal
                    title="Add New Alias"
                    onSubmit={handleAddAlias}
                    onCancel={() => setShowAddModal(false)}
                />
            </Box>
        );
    }

    if (showEditModal && selectedAlias) {
        return (
            <Box flexDirection="column">
                <InputModal
                    title="Edit Alias"
                    initialName={selectedAlias}
                    initialCommand={aliases[selectedAlias]}
                    onSubmit={handleEditAlias}
                    onCancel={() => {
                        setShowEditModal(false);
                        setSelectedAlias(null);
                    }}
                />
            </Box>
        );
    }

    // Main interface (only shown when no modal is open)
    return (
        <Box flexDirection="column">
            <AliasListView
                aliases={aliases}
                onEdit={(name: string) => {
                    setSelectedAlias(name);
                    setShowEditModal(true);
                }}
                onRemove={handleRemoveAlias}
            />

            <CommandBar
                onAdd={() => setShowAddModal(true)}
                onRefresh={loadAliases}
                onExit={exit}
            />
        </Box>
    );
};

export default App;
