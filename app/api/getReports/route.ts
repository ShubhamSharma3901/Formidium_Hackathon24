import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const { params } = await req.json();
	const st = "hello";
	st.toUpperCase();
	try {
		const response = await axios.post(
			`http://ec2-13-201-50-154.ap-south-1.compute.amazonaws.com:8080/get-report-url`,
			{
				reportType: params.reportType.toUpperCase(),
				year: params.year,
				period: params.period.toUpperCase(),
				format: params.format.toLowerCase(),
			}
		);
		console.log("response===", response.data);
		return NextResponse.json(response.data.reportURL, { status: 200 });
	} catch (err) {
		console.log(err);
		return NextResponse.json(err, { status: 500 });
	}
}
