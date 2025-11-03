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
import { useLanguage } from "../../contexts/LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";
import classes from "./Header.module.css";

const navLinks = [
  { label: "nav.home", path: "/" },
  { label: "nav.randomNumber", path: "/random-number" },
  { label: "nav.games", path: "/random-games" },
  { label: "nav.spinWheel", path: "/spin-wheel" },
  { label: "nav.listPicker", path: "/list-picker" },
  { label: "nav.password", path: "/password-generator" },
  { label: "nav.colors", path: "/color-generator" },
  { label: "nav.teams", path: "/team-generator" },
];

export default function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { t } = useLanguage();
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
          <Group justify="space-between" h="100%" w="100%">
            {/* Logo - Left Side */}
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

            {/* Navigation & Actions - Right Side */}
            <Group gap="md" visibleFrom="md">
              {navLinks.slice(0, 5).map((link) => (
                <Button
                  key={link.path}
                  variant={location.pathname === link.path ? "light" : "subtle"}
                  onClick={() => handleNavigate(link.path)}
                  className={classes.navButton}
                  size="sm"
                >
                  {t(link.label)}
                </Button>
              ))}

              <LanguageSwitcher size="lg" variant="subtle" />

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
            </Group>

            {/* Mobile Menu */}
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="md"
              size="sm"
            />
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
                {t(link.label)}
              </Button>
            ))}

            <Box mt="md">
              <LanguageSwitcher size="lg" variant="subtle" />
            </Box>
          </Stack>
        </ScrollArea>
      </Drawer>
    </Box>
  );
}
