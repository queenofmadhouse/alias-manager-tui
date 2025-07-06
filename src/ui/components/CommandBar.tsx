import React from 'react';
import { Box, Text, useInput } from 'ink';

interface CommandBarProps {
    onAdd: () => void;
    onRefresh: () => void;
    onExit?: () => void;
}

const CommandBar: React.FC<CommandBarProps> = ({onAdd, onRefresh, onExit}) => {
    useInput((input) => {
        if (input === 'a') {
            onAdd();
        } else if (input === 'r') {
            onRefresh();
        } else if (input === 'q' && onExit) {
            onExit();
        }
    });

    return (
        <Box marginTop={0} borderStyle="single" borderColor="blue" padding={0} paddingX={1}>
            <Box justifyContent="space-between" width="100%">
                <Box>
                    <Text bold color="blue">a</Text>
                    <Text>: Add</Text>
                </Box>
                <Box>
                    <Text bold color="blue">r</Text>
                    <Text>: Refresh</Text>
                </Box>
                <Box>
                    <Text> | </Text>
                </Box>
                <Box>
                    <Text bold color="blue">q</Text>
                    <Text>: Exit</Text>
                </Box>
            </Box>
        </Box>
    );
};

export default CommandBar;
