import pocketbase from "pocketbase";

export async function getAdminLoginPB() {
	const adminEmail = "admin@bookmarkey.app";
	const adminPassword = "password11";
	const pb = new pocketbase(process.env.VITE_POCKET_BASE_URL || "http://localhost:9090");
	await pb.admins.authWithPassword(adminEmail, adminPassword);
	return pb;
}

export function getCurrentDate() {
	return new Date()
		.toLocaleDateString(undefined, {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit"
		})
		.replace("/", "-");
}
