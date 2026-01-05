/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		// Ignore ESLint errors during production builds to avoid failing builds
		// when the environment or ESLint options differ in the deployment environment.
		ignoreDuringBuilds: true,
	},
}

module.exports = nextConfig

