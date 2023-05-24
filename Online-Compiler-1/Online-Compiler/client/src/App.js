import axios from 'axios';
import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-github';
import './App.css';

function App() {
  const defaultCode = {
    java: "class Main {\n  public static void main(String[] args) {\n    // Enter your Java code here\n  }\n}",
    py: "# Enter your Python code here",
    cpp: "#include <iostream>\n\nint main() {\n  // Enter your C++ code here\n  return 0;\n}"
  };

  const [code, setCode] = useState(defaultCode.java);
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("java");

  const handleSubmit = async () => {
    // Prevent submitting the default code
    if (code === defaultCode.java || code === defaultCode.py || code === defaultCode.cpp) {
      return;
    }
  setOutput("Running Your Program");
    const payload = {
      language,
      code
    };
    try {
      const { data } = await axios.post("http://localhost:7000/run", payload);
      console.log(data);
      setOutput(data.output);
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        setOutput(errMsg);
      } else {
        setOutput("Error connecting to server");
      }
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(defaultCode[selectedLanguage]);
  };

  return (
    <div className="App">
      <h1 className="title">Online Code Compiler</h1>
      <div className="language-container">
        <label htmlFor="language-select">Language:</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="select-language"
        >
          <option value="java">Java</option>
          <option value="py">Python</option>
          <option value="cpp">C++</option>
        </select>
      </div>
      <div className="code-container">
        <AceEditor
          className="code-input"
          mode={language === "cpp" ? "c_cpp" : language}
          theme="github"
          value={code}
          onChange={setCode}
          placeholder="Enter your code here"
          height="400px"
          width="100%"
          fontSize={14}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      </div>
      <div className="button-container">
        <button className="submit-button" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="output-container">
        <h2 className="output-heading">Output:</h2>
        <div className="output">{output}</div>
      </div>
      <footer className="footer">
        Built with <span className="heart">❤️</span> by Akshit
      </footer>
    </div>
  );
}

export default App;

