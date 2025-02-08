import { env } from "@/env/server";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
	region: "auto",
	endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: env.R2_ACCESS_ID,
		secretAccessKey: env.R2_ACCESS_SECRET,
	},
	requestChecksumCalculation: "WHEN_REQUIRED",
	responseChecksumValidation: "WHEN_REQUIRED",
});

export default s3;
