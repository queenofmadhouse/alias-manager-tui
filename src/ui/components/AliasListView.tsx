import React from 'react';
import { Box, Text, useInput } from 'ink';

interface AliasListViewProps {
    aliases: Record<string, string>;
    onEdit: (name: string) => void;
    onRemove: (name: string) => void;
}

const AliasListView: React.FC<AliasListViewProps> = ({aliases, onEdit, onRemove}) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const aliasEntries = Object.entries(aliases);

    useInput((input, key) => {
        if (key.upArrow) {
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        } else if (key.downArrow) {
            setSelectedIndex(prev => (prev < aliasEntries.length - 1 ? prev + 1 : prev));
        } else if (input === 'e' && aliasEntries.length > 0) {
            onEdit(aliasEntries[selectedIndex][0]);
        } else if (input === 'd' && aliasEntries.length > 0) {
            onRemove(aliasEntries[selectedIndex][0]);
        }
    });

    if (aliasEntries.length === 0) {
        return (
            <Box borderStyle="single" borderColor="blue" padding={0} paddingX={1} alignItems="center">
                <Text>No aliases found. Press </Text>
                <Text bold color="blue">a</Text>
                <Text> to add a new alias.</Text>
            </Box>
        );
    }

    return (
        <Box flexDirection="column" marginBottom={0} borderStyle="single" borderColor="blue" padding={0}>
            <Box paddingX={1} alignItems="center" justifyContent="space-between">
                <Text bold>Aliases</Text>
                <Box>
                    <Text dimColor>↑/↓: navigate | </Text>
                    <Text bold color="blue">e</Text>
                    <Text dimColor>: </Text>
                    <Text dimColor>edit | </Text>
                    <Text bold color="blue">d</Text>
                    <Text dimColor>: delete</Text>
                </Box>
            </Box>

            <Box flexDirection="column">
                {aliasEntries.map(([name, command], index) => (
                    <Box key={name} flexDirection="column" paddingX={1}>
                        <Box>
                            <Text color={selectedIndex === index ? 'blue' : undefined}>
                                {selectedIndex === index ? '› ' : '  '}
                                <Text bold>{name}</Text>
                                <Text> = </Text>
                                <Text>{command}</Text>
                            </Text>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default AliasListView;
