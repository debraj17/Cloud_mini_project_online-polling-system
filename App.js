import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [message, setMessage] = useState("");

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const createPoll = async () => {
    try {
      const response = await axios.post(
        "https://lmduarwxvc.execute-api.us-east-1.amazonaws.com/prod/polls",
        {
          action: "create_poll",
          question,
          options,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(`Poll Created! ID: ${response.data.poll_id}`);
    } catch (error) {
      setMessage("Error creating poll.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Create a Poll</h2>
      <input
        type="text"
        placeholder="Enter question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ padding: "10px", width: "300px" }}
      />
      <br />
      {options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            style={{ padding: "10px", width: "250px", margin: "5px" }}
          />
        </div>
      ))}
      <button onClick={addOption} style={{ padding: "10px", margin: "10px" }}>
        + Add Option
      </button>
      <br />
      <button onClick={createPoll} style={{ padding: "10px", fontSize: "16px" }}>
        Create Poll
      </button>
      <p>{message}</p>
    </div>
  );
}

export default App;
