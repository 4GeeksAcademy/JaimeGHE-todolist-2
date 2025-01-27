import React, {useState} from "react";


const Home = () => {
	const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [editValue, setEditValue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim() !== "") {
            setTodos([...todos, inputValue.trim()]);
            setInputValue("");
        }
		else{
			setInputValue("");
		}
    };

    const handleDelete = (index) => {
        setTodos(todos.filter((_, currentIndex) => currentIndex !== index));
    };

    const handleEdit = (index) => {
        setIsEditing(index);
        setEditValue(todos[index]);
    };

    const handleEditSubmit = (e, index) => {
        e.preventDefault();
        if (editValue.trim() !== "") {
            const updatedTodos = todos.map((todo, i) => (i === index ? editValue.trim() : todo));
            setTodos(updatedTodos);
            setIsEditing(null);
            setEditValue("");
        }
    };


	return (
		<div className="container">
			<h1>My Todos</h1>

			<form onSubmit={handleSubmit}>
				<input
					type="text"
					onChange={(e) => setInputValue(e.target.value)}
					value={inputValue}
					placeholder="Add something"
				/>
				<button type="submit">Add</button>
			</form>

			<ul>
				{todos.map((item, index) => (
					<li key={index}>
						{isEditing === index ? (
							<form onSubmit={(e) => handleEditSubmit(e, index)}>
								<input
									type="text"
									value={editValue}
									onChange={(e) => setEditValue(e.target.value)}
									placeholder="Edit task"
								/>
								<button type="submit">Save</button>
								<button type="button" onClick={() => setIsEditing(null)}>Cancel</button>
							</form>
						) : (
							<>
								{item}
								<div>
									<button className="editButton" onClick={() => handleEdit(index)}>Edit</button>
									<button onClick={() => handleDelete(index)}>Delete</button>
								</div>
							</>
						)}
					</li>
				))}
			</ul>

			<div>
				{todos.length === 0 ? "No pending tasks" : `${todos.length} ${todos.length === 1 ? "task" : "tasks"}`}
			</div>
		</div>
	);
};

export default Home;
