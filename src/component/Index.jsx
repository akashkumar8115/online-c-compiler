import React, { useState } from 'react';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
// import './CppCompiler.css'; // External CSS file for styling
import "./Index.css"

const CppCompiler = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRunCode = () => {
        setLoading(true); // Show loader animation
        axios.post('https://backendcppcompiler-nrcs9hcj.b4a.run/run', { code })
            .then((response) => {
                setOutput(response.data.output);
                setLoading(false); // Hide loader animation
            })
            .catch((error) => {
                setOutput('Error occurred while running the code.');
                setLoading(false); // Hide loader animation
            });
    };

    return (
        <div className="compiler-container">
            <h1 className="title">C++ Online Compiler</h1>

            <ResizableBox
                minConstraints={[300, 200]}
                maxConstraints={[1200, 800]}
                className="resizable-editor"
            >
                <CodeMirror
                    value={code}
                    height="100%"
                    width="100%"
                    extensions={[cpp()]}
                    onChange={(value) => setCode(value)}
                    theme="dark"
                    options={{
                        lineNumbers: true,
                        tabSize: 2,
                        indentWithTabs: true,
                        autoCloseBrackets: true,
                        matchBrackets: true
                    }}
                />
            </ResizableBox>

            <button className="run-button" onClick={handleRunCode}>Run Code</button>

            {loading && <div className="loader"></div>}

            <h2 className="output-title">Output:</h2>
            <pre className="output-box">{output}</pre>
        </div>
    );
};

export default CppCompiler;
