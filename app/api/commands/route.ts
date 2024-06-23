import { OpenAI } from "openai";
import { NextResponse, NextRequest } from "next/server";

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

const functions = [
	{
		name: "getReportUrl",
		description: "Fetches the report URL based on user-provided parameters.",
		parameters: {
			type: "object",
			properties: {
				reportType: {
					type: "string",
					description:
						"Type of the report are P&L_REPORT, CASH_FLOW_REPORT, BALANCE_SHEET",
				},
				period: {
					type: "string",
					description:
						"Time period of the report are Annual for P&L_REPORT, CASH_FLOW_REPORT, BALANCE_SHEET and Quaterly (Q1,Q2,Q3,Q4) for P&L_REPORT, CASH_FLOW_REPORT",
				},
				year: {
					type: "string",
					description: "Year for the report (e.g., 2023-24)",
				},
				format: {
					type: "string",
					description: "Format of the report (pdf, excel, csv)",
				},
			},
			required: ["reportType", "period", "year", "format"],
		},
	},
];

export async function POST(req: NextRequest) {
	const body = await req.json();
	const { message } = body;

	if (!message) {
		return new NextResponse("Message Not Sent", { status: 400 });
	}
	if (!openai.apiKey) {
		return new NextResponse("API Key Not Configured", { status: 500 });
	}
	try {
		const response = await openai.chat.completions.create({
			model: "gpt-4", // Adjust the model as needed
			messages: [
				{
					role: "system",
					content:
						"You are an assistant that helps users fetch report URLs. Always ask for report type, period, year, and format if not provided.After getting the parameters call the function and return the report url. If the requested report are not found then present the availale report options to the users ask for their inputs again and do the complete process from starting again. The Available Reports are P&L_REPORT(which is equivalent to if users ask for income reports), CASH_FLOW_REPORT, BALANCE_SHEET. After Returning the URL, Ask if anything else is required. And When you are about to call a function always let users know that you are processing the request",
				},
				...message,
			],
			functions,
			function_call: "auto", // Allows the assistant to decide when to call functions
			temperature: 0.7,
		});
		console.log(response.choices);
		return NextResponse.json(
			{
				content: response.choices[0].message.content || "",
				functionCall: response.choices[0].message.function_call,
			},
			{ status: 200 }
		);
	} catch (err) {
		console.log(err);
		return NextResponse.json(err, { status: 500 });
	}
}
