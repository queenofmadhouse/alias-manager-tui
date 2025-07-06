import React, { useState } from 'react';
import { Box, Text, useInput } from 'ink';
import TextInput from 'ink-text-input';

interface InputModalProps {
    title: string;
    initialName?: string;
    initialCommand?: string;
    onSubmit: (name: string, command: string) => void;
    onCancel: () => void;
}

const InputModal: React.FC<InputModalProps> = ({
                                                   title,
                                                   initialName = '',
                                                   initialCommand = '',
                                                   onSubmit,
                                                   onCancel
                                               }) => {
    const [name, setName] = useState(initialName);
    const [command, setCommand] = useState(initialCommand);
    const [focusName, setFocusName] = useState(!initialName);

    useInput((input, key) => {
        if (key.escape || input === 'q') {
            onCancel();
        } else if (key.return && focusName) {
            setFocusName(false);
        } else if (key.return && !focusName && name && command) {
            onSubmit(name, command);
        } else if (key.upArrow || key.downArrow) {
            setFocusName(!focusName);
        }
    });

    return (
        <Box flexDirection="column" borderStyle="single" borderColor="blue" padding={0}>
            <Box paddingX={1} paddingY={0}>
                <Text bold>{title}</Text>
            </Box>

            <Box marginY={0} paddingX={1}>
                <Box width={8}>
                    <Text>Name:</Text>
                </Box>
                <TextInput
                    value={name}
                    onChange={setName}
                    focus={focusName}
                    placeholder="Enter alias name"
                />
            </Box>

            <Box marginY={0} paddingX={1}>
                <Box width={8}>
                    <Text>Command:</Text>
                </Box>
                <TextInput
                    value={command}
                    onChange={setCommand}
                    focus={!focusName}
                    placeholder="Enter command"
                />
            </Box>

            <Box paddingX={1} paddingY={0} marginTop={0}>
                <Text dimColor>Enter: submit | ↑/↓: navigate | Esc/q: cancel</Text>
            </Box>
        </Box>
    );
};

export default InputModal;
