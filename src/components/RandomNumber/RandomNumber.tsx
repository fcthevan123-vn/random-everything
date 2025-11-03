import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Title,
  Text,
  NumberInput,
  Checkbox,
  Button,
  Group,
  Stack,
  Container,
  Grid,
  Badge,
  Alert,
  Transition,
  rem,
  SegmentedControl,
  ActionIcon,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconDice,
  IconCopy,
  IconRefresh,
  IconAlertCircle,
  IconArrowLeft,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { generateRandomNumbers } from "../../utils/random";
import { useLanguage } from "../../contexts/LanguageContext";

interface RandomNumberProps {
  /** Optional custom styling */
  className?: string;
}

export function RandomNumber({ className }: RandomNumberProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // State for inputs
  const [min, setMin] = useState<number | string>(1);
  const [max, setMax] = useState<number | string>(100);
  const [count, setCount] = useState<number | string>(1);
  const [noDuplicates, setNoDuplicates] = useState(false);
  const [numberType, setNumberType] = useState<string>("integer"); // 'integer' or 'decimal'
  const [decimalPlaces, setDecimalPlaces] = useState<number | string>(2);

  // State for results
  const [results, setResults] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // For triggering animations

  /**
   * Handles the generate button click
   */
  const handleGenerate = () => {
    setError(null);
    setIsGenerating(true);

    // Simulate animation delay
    setTimeout(() => {
      // Validate inputs
      const minNum = typeof min === "string" ? parseFloat(min) : min;
      const maxNum = typeof max === "string" ? parseFloat(max) : max;
      const countNum = typeof count === "string" ? parseInt(count) : count;
      const decimalPlacesNum =
        typeof decimalPlaces === "string"
          ? parseInt(decimalPlaces)
          : decimalPlaces;

      if (
        isNaN(minNum) ||
        isNaN(maxNum) ||
        isNaN(countNum) ||
        min === "" ||
        max === "" ||
        count === ""
      ) {
        setError(t("randomNumber.validationError"));
        setIsGenerating(false);
        return;
      }

      if (numberType === "decimal" && isNaN(decimalPlacesNum)) {
        setError(t("randomNumber.decimalValidationError"));
        setIsGenerating(false);
        return;
      }

      try {
        const generatedNumbers = generateRandomNumbers({
          min: minNum,
          max: maxNum,
          count: countNum,
          noDuplicates,
          decimalPlaces: numberType === "decimal" ? decimalPlacesNum : 0,
        });

        setResults(generatedNumbers);
        setAnimationKey((prev) => prev + 1); // Trigger animation

        // Show success notification
        showNotification({
          title: t("common.success"),
          message: `${t("randomNumber.generatedSuccess")} ${
            generatedNumbers.length
          } ${
            numberType === "decimal"
              ? t("randomNumber.decimalNumber")
              : t("randomNumber.integerNumber")
          } ${
            generatedNumbers.length > 1
              ? t("randomNumber.numbersGeneratedPlural")
              : t("randomNumber.numbersGenerated")
          }`,
          color: "green",
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to generate numbers";
        setError(errorMessage);
      } finally {
        setIsGenerating(false);
      }
    }, 400); // Delay to show loading animation
  };

  /**
   * Copies results to clipboard
   */
  const handleCopyToClipboard = async () => {
    if (results.length === 0) return;

    try {
      const textToCopy = results.join(", ");
      await navigator.clipboard.writeText(textToCopy);

      showNotification({
        title: t("common.copied"),
        message: t("common.copiedMessage"),
        color: "blue",
        icon: <IconCopy size={16} />,
      });
    } catch (err) {
      showNotification({
        title: t("common.error"),
        message: "Could not copy to clipboard",
        color: "red",
      });
    }
  };

  /**
   * Resets all inputs to defaults
   */
  const handleReset = () => {
    setMin(1);
    setMax(100);
    setCount(1);
    setNoDuplicates(false);
    setNumberType("integer");
    setDecimalPlaces(2);
    setResults([]);
    setError(null);
  };

  // Check if count > 1 to show the "No duplicates" checkbox
  const countNum = typeof count === "string" ? parseInt(count) : count;
  const shouldShowNoDuplicates = !isNaN(countNum) && countNum > 1;

  return (
    <Container size="md" className={className} py="xl">
      <Stack gap="xl">
        {/* Header with Back Button */}
        <div>
          <Group justify="space-between" mb="md">
            <ActionIcon
              variant="light"
              size="lg"
              radius="md"
              onClick={() => navigate("/")}
              aria-label="Back to home"
            >
              <IconArrowLeft size={20} />
            </ActionIcon>
            <div style={{ flex: 1 }} />
          </Group>
          <div style={{ textAlign: "center" }}>
            <Title order={1} mb="xs">
              {t("randomNumber.title")}
            </Title>
            <Text c="dimmed" size="lg">
              {t("randomNumber.subtitle")}
            </Text>
          </div>
        </div>

        {/* Input Form */}
        <Paper shadow="md" radius="lg" p="xl" withBorder>
          <Stack gap="lg">
            {/* Number Type Selector */}
            <div>
              <Text size="sm" fw={500} mb="xs">
                {t("randomNumber.numberType")}
              </Text>
              <SegmentedControl
                value={numberType}
                onChange={setNumberType}
                data={[
                  { label: t("randomNumber.integer"), value: "integer" },
                  { label: t("randomNumber.decimal"), value: "decimal" },
                ]}
                fullWidth
                size="md"
                radius="md"
              />
            </div>

            <Grid gutter="md">
              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <NumberInput
                  label={t("randomNumber.minimum")}
                  description={t("randomNumber.minimumDesc")}
                  placeholder="Enter minimum"
                  value={min}
                  onChange={setMin}
                  min={Number.MIN_SAFE_INTEGER}
                  max={Number.MAX_SAFE_INTEGER}
                  decimalScale={numberType === "decimal" ? 10 : 0}
                  size="md"
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <NumberInput
                  label={t("randomNumber.maximum")}
                  description={t("randomNumber.maximumDesc")}
                  placeholder="Enter maximum"
                  value={max}
                  onChange={setMax}
                  min={Number.MIN_SAFE_INTEGER}
                  max={Number.MAX_SAFE_INTEGER}
                  decimalScale={numberType === "decimal" ? 10 : 0}
                  size="md"
                  withAsterisk
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                <NumberInput
                  label={t("randomNumber.count")}
                  description={t("randomNumber.countDesc")}
                  placeholder="Enter count"
                  value={count}
                  onChange={setCount}
                  min={1}
                  max={10000}
                  size="md"
                  withAsterisk
                />
              </Grid.Col>
            </Grid>

            {/* Decimal Places Input - Only show for decimal type */}
            <Transition
              mounted={numberType === "decimal"}
              transition="fade"
              duration={200}
              timingFunction="ease"
            >
              {(styles) => (
                <div style={styles}>
                  <NumberInput
                    label={t("randomNumber.decimalPlaces")}
                    description={t("randomNumber.decimalPlacesDesc")}
                    placeholder="Enter decimal places"
                    value={decimalPlaces}
                    onChange={setDecimalPlaces}
                    min={1}
                    max={10}
                    size="md"
                  />
                </div>
              )}
            </Transition>

            {/* No Duplicates Checkbox */}
            <Transition
              mounted={shouldShowNoDuplicates}
              transition="fade"
              duration={200}
              timingFunction="ease"
            >
              {(styles) => (
                <div style={styles}>
                  <Checkbox
                    label={t("randomNumber.noDuplicates")}
                    description={t("randomNumber.noDuplicatesDesc")}
                    checked={noDuplicates}
                    onChange={(event) =>
                      setNoDuplicates(event.currentTarget.checked)
                    }
                    size="md"
                  />
                </div>
              )}
            </Transition>

            {/* Error Alert */}
            {error && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                title={t("common.error")}
                color="red"
                variant="light"
                withCloseButton
                onClose={() => setError(null)}
              >
                {error}
              </Alert>
            )}

            {/* Action Buttons */}
            <Group justify="center" gap="md" mt="md">
              <Button
                leftSection={<IconDice size={20} />}
                onClick={handleGenerate}
                loading={isGenerating}
                size="lg"
                radius="md"
                variant="filled"
              >
                {t("common.generate")}
              </Button>

              <Button
                leftSection={<IconRefresh size={20} />}
                onClick={handleReset}
                size="lg"
                radius="md"
                variant="light"
                color="gray"
              >
                {t("common.reset")}
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* Results Display */}
        <AnimatePresence mode="wait">
          {results.length > 0 && (
            <motion.div
              key={animationKey}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{
                duration: 0.5,
                ease: [0.34, 1.56, 0.64, 1], // Bouncy easing
              }}
            >
              <Paper
                shadow="md"
                radius="lg"
                p="xl"
                withBorder
                style={{
                  background:
                    "linear-gradient(135deg, var(--mantine-color-blue-0) 0%, var(--mantine-color-indigo-0) 100%)",
                }}
              >
                <Stack gap="md">
                  <Group justify="space-between" align="center">
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Title order={3}>{t("randomNumber.results")}</Title>
                      <Text size="sm" c="dimmed">
                        {results.length}{" "}
                        {results.length !== 1
                          ? t("randomNumber.numbersGeneratedPlural")
                          : t("randomNumber.numbersGenerated")}
                      </Text>
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Button
                        leftSection={<IconCopy size={16} />}
                        onClick={handleCopyToClipboard}
                        variant="light"
                        size="sm"
                        radius="md"
                      >
                        {t("common.copyAll")}
                      </Button>
                    </motion.div>
                  </Group>

                  {/* Display results */}
                  {results.length === 1 ? (
                    // Single number: Large display with rolling animation
                    <motion.div
                      style={{ textAlign: "center", padding: "2rem 0" }}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.3,
                      }}
                    >
                      <Text
                        size={rem(72)}
                        fw={700}
                        variant="gradient"
                        gradient={{ from: "blue", to: "indigo", deg: 45 }}
                      >
                        {results[0]}
                      </Text>
                    </motion.div>
                  ) : (
                    // Multiple numbers: Badge list with staggered animation
                    <Group gap="sm" justify="center">
                      {results.map((num, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20, scale: 0 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{
                            delay: 0.3 + index * 0.05, // Stagger effect
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotate: [0, -5, 5, 0],
                            transition: { duration: 0.3 },
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Badge
                            size="xl"
                            radius="md"
                            variant="filled"
                            style={{
                              fontSize: rem(18),
                              padding: "1rem 1.5rem",
                              cursor: "pointer",
                            }}
                            onClick={async () => {
                              await navigator.clipboard.writeText(
                                num.toString()
                              );
                              showNotification({
                                message: `${t(
                                  "randomNumber.copiedNumber"
                                )} ${num}`,
                                color: "blue",
                                autoClose: 1500,
                              });
                            }}
                          >
                            {num}
                          </Badge>
                        </motion.div>
                      ))}
                    </Group>
                  )}
                </Stack>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </Stack>
    </Container>
  );
}

export default RandomNumber;
