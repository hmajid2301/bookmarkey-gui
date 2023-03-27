import pocketbase from "pocketbase";

export async function getAdminLoginPB() {
	const adminEmail = "admin@bookmarkey.app";
	const adminPassword = "password11";
	const pb = new pocketbase(process.env.VITE_POCKET_BASE_URL || "http://localhost:9090");
	await pb.admins.authWithPassword(adminEmail, adminPassword);
	return pb;
}

function padTo2Digits(num: number) {
	return num.toString().padStart(2, "0");
}

export function getCurrentDate() {
	const date = new Date();
	return (
		[
			date.getUTCFullYear(),
			padTo2Digits(date.getUTCMonth() + 1),
			padTo2Digits(date.getUTCDate())
		].join("-") +
		" " +
		[
			padTo2Digits(date.getUTCHours()),
			padTo2Digits(date.getUTCMinutes()),
			padTo2Digits(date.getUTCSeconds())
		].join(":")
	);
}
