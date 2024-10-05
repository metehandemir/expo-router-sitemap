# expo-router-sitemap

## Usage

Call this script in your Expo Router project via:

`npx expo-router-sitemap`

## Overview

Inspired by this [X post](https://x.com/kadikraman/status/1842249504877158810) by [@kadikraman](https://github.com/kadikraman), I figured it would be useful to come up with a script that could check an Expo Router project.

![image](https://github.com/user-attachments/assets/f0834464-d923-4636-b7b2-3b82840b606d)

## Example Output

### Valid 

```bash
/
/[...missing]
/community
/log-in
/podcasts/
/podcasts/[id]
/podcasts/latest
/profile
/showroom

✅ No route collisions detected.
```

### Invalid

```bash
/
 - src/app/(app)/(tabs)/index.tsx
 - src/app/(app)/index.tsx
/[...missing]
/community
/log-in
/podcasts/
/podcasts/[id]
/podcasts/latest
/profile
/showroom

❌ Collisions detected!
```

## Development

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.27. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
