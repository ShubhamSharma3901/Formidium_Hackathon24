// components/Chatbot.js
"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Chatbot() {
	const [messages, setMessages] = useState<any>([]);
	const [userInput, setUserInput] = useState("");
	const [loading, setLoading] = useState(false);

	const handleUserInput = async () => {
		setLoading(true);
		const newMessages = [...messages, { role: "user", content: userInput }];
		setMessages(newMessages);
		setUserInput("");

		// const prompt = newMessages
		// 	.map((msg) => `${msg.role}: ${msg.content}`)
		// 	.join("\n");
		const assistantResponse = await axios.post("/api/commands", {
			message: newMessages,
		});

		newMessages.push({
			role: "assistant",
			content: assistantResponse.data.content,
		});
		setMessages(newMessages);

		console.log("assistantResponse.data==", assistantResponse.data);

		if (assistantResponse.data.functionCall) {
			const { name, arguments: funcArgs } = assistantResponse.data.functionCall;

			if (name === "getReportUrl") {
				try {
					const args = JSON.parse(funcArgs);
					const reportUrlResponse = await axios.post("/api/getReports", {
						params: args,
					});

					newMessages.push({
						role: "assistant",
						content: `Here is your report: ${reportUrlResponse.data}`,
					});
				} catch (error) {
					newMessages.push({
						role: "assistant",
						content: "Failed to retrieve the report URL. Please try again.",
					});
				}
			}
		}

		setMessages(newMessages);
		setLoading(false);
	};
	console.log(messages);
	return (
		<div>
			<div className='text-white'>
				{messages &&
					messages.map((msg: any, index: any) => (
						<p key={index}>
							<strong>{msg.role}:</strong> {msg.content}
						</p>
					))}
			</div>
			<input
				type='text'
				value={userInput}
				onChange={(e) => setUserInput(e.target.value)}
				placeholder='Type your message here'
			/>
			<button onClick={handleUserInput} disabled={loading}>
				{loading ? "Loading..." : "Send"}
			</button>
		</div>
	);
}
