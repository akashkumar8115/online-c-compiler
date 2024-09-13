import React, { useState } from 'react';
import axios from 'axios';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';
import "./Index.css"

const CppCompiler = () => {
    const [code, setCode] = useState('');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRunCode = () => {
        setLoading(true); // Show loader animation
        axios.post('https://backend-online-cpp-compiler.onrender.com/run', { code, input },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                },
            }
        )
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
            </ResizableBox> <br />
            <textarea
                className="input-textarea"
                placeholder="Enter input for your code..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button className="run-button" onClick={handleRunCode}>Run Code</button>

            {loading && <div className="loader"></div>}
            <div className="output-field">
                {/* <h2 className="output-title">Output:</h2> */}
            </div>
                <pre className="output-box" placeholder="Here is output your code">{output}</pre>

        </div>
    );
};

export default CppCompiler;
