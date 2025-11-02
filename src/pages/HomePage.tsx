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
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import classes from "./HomePage.module.css";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  route: string;
  color: string;
}

export default function HomePage() {
  const navigate = useNavigate();

  const features: Feature[] = [
    {
      icon: <IconDice6 size={40} stroke={1.5} />,
      title: "Random Number",
      description:
        "Generate random numbers within custom ranges. Perfect for lottery picks, dice rolls, or any numeric randomization.",
      route: "/random-number",
      color: "blue",
    },
    {
      icon: <IconCards size={40} stroke={1.5} />,
      title: "Random Games",
      description:
        "Flip coins, roll dice, or draw cards. Classic randomization games with beautiful animations.",
      route: "/random-games",
      color: "red",
    },
    {
      icon: <IconWheel size={40} stroke={1.5} />,
      title: "Spin Wheel",
      description:
        "Create custom decision wheels with your own options. Spin to choose randomly with style!",
      route: "/spin-wheel",
      color: "grape",
    },
    {
      icon: <IconListCheck size={40} stroke={1.5} />,
      title: "List Picker",
      description:
        "Pick random items from your custom lists. Great for choosing winners, making decisions, or shuffling.",
      route: "/list-picker",
      color: "teal",
    },
    {
      icon: <IconPassword size={40} stroke={1.5} />,
      title: "Password & Username",
      description:
        "Generate secure passwords and creative usernames. Fully customizable with various options.",
      route: "/password-generator",
      color: "orange",
    },
    {
      icon: <IconPalette size={40} stroke={1.5} />,
      title: "Color & Gradient",
      description:
        "Discover random colors and beautiful gradients. Get HEX, RGB values instantly.",
      route: "/color-generator",
      color: "pink",
    },
    {
      icon: <IconUsers size={40} stroke={1.5} />,
      title: "Team/Group Generator",
      description:
        "Randomly divide people into teams or groups. Fair and balanced distribution guaranteed.",
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
              Random Everything
            </Title>
            <Text className={classes.subtitle} size="xl" ta="center" maw={600}>
              Generate random numbers, cards, passwords, teams, and more —
              instantly and beautifully.
            </Text>
            <Button
              size="lg"
              radius="md"
              className={classes.ctaButton}
              onClick={scrollToFeatures}
            >
              Explore All Tools
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
                      {feature.title}
                    </Title>
                    <Text size="sm" c="dimmed" ta="center">
                      {feature.description}
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
                    Try it
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
