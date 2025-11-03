import { ActionIcon, Menu, Text, Group } from "@mantine/core";
import { motion } from "framer-motion";
import { useLanguage, Language } from "../../contexts/LanguageContext";

interface LanguageSwitcherFlagProps {
  /** Optional custom styling */
  className?: string;
  /** Size of the button */
  size?: "sm" | "md" | "lg" | "xl";
  /** Variant style */
  variant?: "filled" | "light" | "outline" | "subtle" | "default";
}

export function LanguageSwitcherFlag({
  className,
  size = "lg",
  variant = "subtle",
}: LanguageSwitcherFlagProps) {
  const { language, setLanguage, t } = useLanguage();

  const languages: { value: Language; label: string; flag: string }[] = [
    { value: "en", label: t("language.english"), flag: "🇬🇧" },
    { value: "vi", label: t("language.vietnamese"), flag: "🇻🇳" },
  ];

  const currentLanguage = languages.find((lang) => lang.value === language);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <Menu
      shadow="md"
      width={200}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      withArrow
    >
      <Menu.Target>
        <ActionIcon
          variant={variant}
          size={size}
          aria-label="Switch language"
          className={className}
        >
          <motion.span
            key={language}
            initial={{ scale: 0.8, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            style={{ fontSize: "1.2rem" }}
          >
            {currentLanguage?.flag}
          </motion.span>
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{t("language.switchTo")}</Menu.Label>
        {languages.map((lang) => (
          <Menu.Item
            key={lang.value}
            onClick={() => handleLanguageChange(lang.value)}
            leftSection={
              <motion.span
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ fontSize: "1.2rem" }}
              >
                {lang.flag}
              </motion.span>
            }
            rightSection={
              language === lang.value ? (
                <Text size="xs" c="dimmed">
                  ✓
                </Text>
              ) : null
            }
            bg={
              language === lang.value
                ? "var(--mantine-color-blue-light)"
                : undefined
            }
          >
            <Group gap="xs">
              <Text size="sm">{lang.label}</Text>
            </Group>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

export default LanguageSwitcherFlag;
