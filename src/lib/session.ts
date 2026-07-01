// Locally-known signed-in identity. Not backend data — there's no real auth
// yet (see src/app/(auth)/login/page.tsx), so this is UI chrome rather than
// something the Django API should own.
export const currentUser = {
  name: "Ochiengs Moses",
  role: "Brand Reputation",
  email: "ochiengs@vela.co",
  initials: "OM",
  team: "Vela — Brand & Comms",
};
