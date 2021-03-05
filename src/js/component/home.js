import React, { useState, useEffect } from "react";

//create your first component
export function Home() {
	const [todo, setTodo] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [trash, setTrash] = useState(false);

	const updateTodo = e => {
		setTodo(e.target.value);
	};

	function deleteTodo(arr, item) {
		const result = arr.filter((todoList, index) => {
			return index != item;
		});
		setTodoList(result);
		putTodos(result);
	}

	const getTodos = () => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/heidysnj")
			.then(response => response.json())
			.then(res => setTodoList(res));
	};

	function putTodos(arr) {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/heidysnj", {
			method: "PUT",
			body: JSON.stringify(arr),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {})
			.catch(error => {});
	}

	const addTodo = () => {
		var task = {
			label: todo,
			done: false
		};
		setTodoList([...todoList, task]);
		setTodo("");
		putTodos([...todoList, task]);
	};

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div
			className="text-center mt-5"
			style={{ width: "30%", margin: "auto" }}>
			<p className="display-3 text-muted">
				<em>todos</em>
			</p>
			<input onChange={updateTodo} value={todo} />
			<button className="btn btn-light" onClick={addTodo}>
				Add
			</button>
			{todoList.map((item, index) => (
				<div
					key={index}
					className="borderDown"
					onMouseEnter={() => setTrash(!trash)}
					onMouseLeave={() => setTrash(!trash)}
					onClick={() => deleteTodo(todoList, index)}>
					<div className="rowList d-flex justify-content-start col">
						{item}
					</div>
					<div className="rowList d-flex justify-content-end col">
						{!trash === false ? (
							<i className="fas fa-trash"></i>
						) : (
							""
						)}
					</div>
				</div>
			))}
		</div>
	);
}
