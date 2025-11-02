import {
  Container,
  Group,
  Text,
  ActionIcon,
  Stack,
  Divider,
  Box,
  Anchor,
} from "@mantine/core";
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconMail,
  IconHeart,
} from "@tabler/icons-react";
import classes from "./Footer.module.css";

const footerLinks = [
  { label: "About", href: "#" },
  { label: "Features", href: "#features" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
];

const socialLinks = [
  {
    icon: <IconBrandGithub size={20} />,
    href: "https://github.com/fcthevan123-vn/random-everything",
    label: "GitHub",
  },
  {
    icon: <IconBrandTwitter size={20} />,
    href: "#",
    label: "Twitter",
  },
  {
    icon: <IconMail size={20} />,
    href: "mailto:contact@randomeverything.com",
    label: "Email",
  },
];

export default function Footer() {
  return (
    <Box className={classes.footer}>
      <Container size="xl">
        <Stack gap="lg">
          {/* Top Section */}
          <Group justify="space-between" align="flex-start" wrap="wrap">
            {/* Brand */}
            <Stack gap="xs" maw={400}>
              <Text size="lg" fw={700} className={classes.brandText}>
                Random Everything
              </Text>
              <Text size="sm" c="dimmed" className={classes.description}>
                Your one-stop solution for all randomization needs. Generate
                numbers, passwords, colors, teams, and more with beautiful,
                modern tools.
              </Text>
            </Stack>

            {/* Links */}
            <Group gap="xl" visibleFrom="sm">
              <Stack gap="xs">
                <Text size="sm" fw={600} className={classes.sectionTitle}>
                  Quick Links
                </Text>
                {footerLinks.map((link) => (
                  <Anchor
                    key={link.label}
                    href={link.href}
                    className={classes.link}
                    size="sm"
                  >
                    {link.label}
                  </Anchor>
                ))}
              </Stack>

              <Stack gap="xs">
                <Text size="sm" fw={600} className={classes.sectionTitle}>
                  Connect
                </Text>
                <Group gap="xs">
                  {socialLinks.map((social) => (
                    <ActionIcon
                      key={social.label}
                      component="a"
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="subtle"
                      size="lg"
                      aria-label={social.label}
                      className={classes.socialIcon}
                    >
                      {social.icon}
                    </ActionIcon>
                  ))}
                </Group>
              </Stack>
            </Group>
          </Group>

          <Divider />

          {/* Bottom Section */}
          <Group justify="space-between" wrap="wrap">
            <Text size="sm" c="dimmed">
              © 2025 Random Everything. All rights reserved.
            </Text>
            <Group gap="xs">
              <Text size="sm" c="dimmed">
                Made with
              </Text>
              <IconHeart size={16} className={classes.heart} />
              <Text size="sm" c="dimmed">
                using React, TypeScript & Mantine
              </Text>
            </Group>
          </Group>
        </Stack>
      </Container>
    </Box>
  );
}
