import { env } from "@/env/server";
import { S3Client } from "@aws-sdk/client-s3";

/**
 * S3-compatible client configured for Cloudflare R2
 *
 * @remarks
 * Provides file upload/download capabilities to Cloudflare R2 storage.
 * Configured with automatic region detection and checksum validation
 * for data integrity.
 */
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
