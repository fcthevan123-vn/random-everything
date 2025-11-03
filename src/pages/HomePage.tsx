import {
  Container,
  Title,
  Text,
  Button,
  Grid,
  Card,
  Center,
  Space,
  Box,
  Stack,
} from "@mantine/core";
import {
  IconDice6,
  IconCards,
  IconWheel,
  IconListCheck,
  IconPassword,
  IconPalette,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import classes from "./HomePage.module.css";

interface Feature {
  icon: React.ReactNode;
  titleKey: string;
  descKey: string;
  route: string;
  color: string;
}

export default function HomePage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const features: Feature[] = [
    {
      icon: <IconDice6 size={40} stroke={1.5} />,
      titleKey: "home.feature.randomNumber.title",
      descKey: "home.feature.randomNumber.desc",
      route: "/random-number",
      color: "blue",
    },
    {
      icon: <IconCards size={40} stroke={1.5} />,
      titleKey: "home.feature.games.title",
      descKey: "home.feature.games.desc",
      route: "/random-games",
      color: "red",
    },
    {
      icon: <IconWheel size={40} stroke={1.5} />,
      titleKey: "home.feature.spinWheel.title",
      descKey: "home.feature.spinWheel.desc",
      route: "/spin-wheel",
      color: "grape",
    },
    {
      icon: <IconListCheck size={40} stroke={1.5} />,
      titleKey: "home.feature.listPicker.title",
      descKey: "home.feature.listPicker.desc",
      route: "/list-picker",
      color: "teal",
    },
    {
      icon: <IconPassword size={40} stroke={1.5} />,
      titleKey: "home.feature.password.title",
      descKey: "home.feature.password.desc",
      route: "/password-generator",
      color: "orange",
    },
    {
      icon: <IconPalette size={40} stroke={1.5} />,
      titleKey: "home.feature.colors.title",
      descKey: "home.feature.colors.desc",
      route: "/color-generator",
      color: "pink",
    },
    {
      icon: <IconUsers size={40} stroke={1.5} />,
      titleKey: "home.feature.teams.title",
      descKey: "home.feature.teams.desc",
      route: "/team-generator",
      color: "violet",
    },
  ];

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    featuresSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box className={classes.wrapper}>
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <Container size="md" className={classes.hero}>
        <Center>
          <Stack align="center" gap="xl">
            <Title className={classes.title} order={1}>
              {t("home.title")}
            </Title>
            <Text className={classes.subtitle} size="xl" ta="center" maw={600}>
              {t("home.subtitle")}
            </Text>
            <Button
              size="xl"
              radius="lg"
              className={classes.ctaButton}
              onClick={scrollToFeatures}
            >
              {t("home.cta")}
            </Button>
          </Stack>
        </Center>
      </Container>

      <Space h={80} />

      {/* Features Grid */}
      <Container size="xl" id="features">
        <Grid gutter="lg">
          {features.map((feature, index) => (
            <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
              <Card
                shadow="md"
                radius="md"
                className={classes.featureCard}
                padding="xl"
                h="100%"
              >
                <Stack gap="md" h="100%" justify="space-between">
                  <Box>
                    <Center className={classes.iconWrapper} mb="md">
                      <Box className={classes.icon} c={feature.color}>
                        {feature.icon}
                      </Box>
                    </Center>
                    <Title order={3} ta="center" mb="sm" size="h3">
                      {t(feature.titleKey)}
                    </Title>
                    <Text size="sm" c="dimmed" ta="center">
                      {t(feature.descKey)}
                    </Text>
                  </Box>
                  <Button
                    variant="light"
                    color={feature.color}
                    fullWidth
                    radius="md"
                    onClick={() => navigate(feature.route)}
                    className={classes.tryButton}
                  >
                    {t("home.tryIt")}
                  </Button>
                </Stack>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </Container>

      <Space h={100} />

      {/* Footer */}
      <Footer />
    </Box>
  );
}
