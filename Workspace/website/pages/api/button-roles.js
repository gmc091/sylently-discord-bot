import mongoConnect from "@util/mongo-connect";
import buttonRoleSchema from "@schemas/button-role.schema";
import { getToken } from "next-auth/jwt";

const GET = async (req, res) => {
	const { guildId } = req.query;

	if (!guildId) {
		return res.status(400).json({
			error: 'Please provide a "guildId" parameter.',
		});
	}

	await mongoConnect();

	const item = await buttonRoleSchema.findOne({ guildId, sub: req.sub });
	res.status(200).json(item);
};

const POST = async (req, res) => {
	const { guildId, ...body } = req.body;

	if (!guildId || !body.channelId || !body.text) {
		return res.status(400).json({
			error: 'Please provide "guildId", "channelId", and "text" fields.',
		});
	}

	await mongoConnect();

	const item = await buttonRoleSchema.findOneAndUpdate(
		{
			_id: guildId,
			sub: req.sub,
		},
		{
			_id: guildId,
			sub: req.sub,
			...body,
		},
		{
			new: true,
			upsert: true,
		}
	);

	res.status(200).json({ id: item._id });
};

export default async (req, res) => {
	const token = await getToken({ req });
	if (!token) {
		return res.status(401);
	}

	req.sub = encrypt(token.sub);

	if (!req.sub) {
		return res.status(401);
	}

	if (req.method === "GET") {
		await GET(req, res);
	} else if (req.method === "POST") {
		await POST(req, res);
	} else {
		res.status(405).end();
	}
};
