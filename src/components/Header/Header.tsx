import {
  Container,
  Group,
  Button,
  useMantineColorScheme,
  ActionIcon,
  Text,
  Box,
  Burger,
  Drawer,
  Stack,
  ScrollArea,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconMoon, IconSun, IconSparkles } from "@tabler/icons-react";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./Header.module.css";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Random Number", path: "/random-number" },
  { label: "Games", path: "/random-games" },
  { label: "Spin Wheel", path: "/spin-wheel" },
  { label: "List Picker", path: "/list-picker" },
  { label: "Password", path: "/password-generator" },
  { label: "Colors", path: "/color-generator" },
  { label: "Teams", path: "/team-generator" },
];

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    closeDrawer();
  };

  return (
    <Box className={classes.headerWrapper}>
      <Box className={classes.header}>
        <Container size="xl" className={classes.inner}>
          <Group justify="space-between" h="100%">
            {/* Logo */}
            <Group
              gap="xs"
              className={classes.logo}
              onClick={() => navigate("/")}
            >
              <IconSparkles size={28} className={classes.logoIcon} />
              <Text size="xl" fw={700} className={classes.logoText}>
                Random Everything
              </Text>
            </Group>

            {/* Desktop Navigation */}
            <Group gap="sm" visibleFrom="md" className={classes.desktopNav}>
              {navLinks.slice(0, 5).map((link) => (
                <Button
                  key={link.path}
                  variant={location.pathname === link.path ? "light" : "subtle"}
                  onClick={() => handleNavigate(link.path)}
                  className={classes.navButton}
                  size="sm"
                >
                  {link.label}
                </Button>
              ))}
            </Group>

            {/* Actions */}
            <Group gap="sm">
              <ActionIcon
                onClick={() => toggleColorScheme()}
                variant="subtle"
                size="lg"
                aria-label="Toggle color scheme"
                className={classes.themeToggle}
              >
                {colorScheme === "dark" ? (
                  <IconSun size={20} />
                ) : (
                  <IconMoon size={20} />
                )}
              </ActionIcon>

              <Burger
                opened={drawerOpened}
                onClick={toggleDrawer}
                hiddenFrom="md"
                size="sm"
              />
            </Group>
          </Group>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={
          <Group gap="xs">
            <IconSparkles size={24} className={classes.logoIcon} />
            <Text size="lg" fw={700}>
              Random Everything
            </Text>
          </Group>
        }
        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)">
          <Stack gap="sm" p="md">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                variant={location.pathname === link.path ? "light" : "subtle"}
                onClick={() => handleNavigate(link.path)}
                fullWidth
                size="md"
                className={classes.mobileNavButton}
              >
                {link.label}
              </Button>
            ))}
          </Stack>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
