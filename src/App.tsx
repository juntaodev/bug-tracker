import React, { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import "./App.css";
import BugListTable from "./BugListTable";
import { IBug, BugPriority } from "./IBug";

function App() {
  const [newBugDescription, setNewBugDescription] = useState<string>("");
  const [newBugPriority, setNewBugPriority] = useState<string>("Medium");
  const [bugList, setBugList] = useState<IBug[]>([]);

  const addBug = (event: FormEvent) => {
    event.preventDefault();
    const newBug: IBug = {
      id: uuid(),
      description: newBugDescription,
      priority: newBugPriority as BugPriority,
    };

    setBugList([...bugList, newBug]);

    setNewBugDescription("");
    setNewBugPriority("Medium");
  };

  const deleteBug = (id: string) => {
    const bugs = bugList.filter((bug) => bug.id !== id);

    setBugList(bugs);
  };

  return (
    <div className="home">
      <h1>Bug Tracker</h1>
      <BugListTable
        bugs={bugList}
        onDeleteBug={(id: string) => deleteBug(id)}
      />
      <div>
        <form className="add-new-bug-form" onSubmit={addBug}>
          <label htmlFor="newBugDescription">New Bug Description: </label>
          <input
            data-testid="newbug-description"
            id="newBugDescription"
            type="text"
            onChange={(event) => setNewBugDescription(event.target.value)}
            value={newBugDescription}
          />
          <label htmlFor="newBugPriority">New Bug Priority: </label>
          <select
            onChange={(event) => setNewBugPriority(event.target.value)}
            value={newBugPriority}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button data-testid="add-bug" type="submit">
            Add New Bug
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
