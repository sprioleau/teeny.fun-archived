import type { NextApiRequest, NextApiResponse } from "next";

import emojiUnicode from "emoji-unicode";
import { supabase } from "@libs/subabase";
import { topEmojis } from "@constants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {
		// code_points,
		long_url,
		// teeny_code
	} = req.query;

	const pickRandomElement = (array: any[]) => array[Math.floor(Math.random() * array.length)];
	const generateTeenyCode = (emojisList: string[], desiredLength: number = 4): string => {
		let randomEmojiString = "";

		for (let i = 0; i < desiredLength; i++) {
			randomEmojiString += pickRandomElement(emojisList);
		}

		return randomEmojiString;
	};

	const teenyCode = generateTeenyCode(topEmojis);
	const codePoints = emojiUnicode.raw(teenyCode);
	const newUrlEntry = {
		long_url,
		teeny_code: teenyCode,
		code_points: codePoints,
	};

	// Check if teeny_code already exist for another teeny URL
	const response1 = await supabase.from("urls").select().match({ teeny_code: teenyCode });

	if (response1.data?.length === 0 && !response1.error) {
		// Emoji combination is available
		// Save teeny_code as new entry
		const { data, error } = await supabase.from("urls").insert([newUrlEntry]);

		res.status(200).json({
			data,
			error: error ? error.message : null,
		});
	} else {
		res.status(500).json({
			data: null,
			error: response1.error?.message,
		});
	}
}
