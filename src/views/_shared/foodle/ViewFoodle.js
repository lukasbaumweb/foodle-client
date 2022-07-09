import React, { useState, useEffect } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Stack,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import FoodleAPI from "../../../utils/api";
import Chef from "../../../assets/svg/chef.svg";
import IngredientsList from "../../../components/IngredientsList";
import Loader from "../../../components/Loader";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CallMadeIcon from "@mui/icons-material/CallMade";
import TimelapseIcon from "@mui/icons-material/Timelapse";
import TimerIcon from "@mui/icons-material/Timer";
import TutorialList from "../../../components/TutorialList";
import EditIcon from "@mui/icons-material/Edit";
import ShareIcon from "@mui/icons-material/Share";
import { Auth } from "../../../utils/auth";
import ROUTES from "../../../utils/routes";
import { onShare } from "../../../utils/functions";

const Foodle = () => {
  const [values, setValues] = useState({
    foodle: {},
    category: "",
    categories: [],
    tags: [],
    ingredients: [],
    errors: {},
    loading: true,
  });
  const auth = new Auth();
  const api = new FoodleAPI();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const api = new FoodleAPI();

      api
        .getPublicFoodle(id)
        .then(({ data }) => {
          console.log(data);
          setValues((state) => ({
            ...state,
            foodle: data,
            exists: !!data,
            loading: false,
          }));
        })
        .catch((err) => {
          console.error(err);
          setValues((state) => ({ ...state, loading: false }));
        });
    })();

    return () => {};
  }, [id]);

  if (values.loading) return <Loader />;

  const imageSrc =
    values.foodle.images?.length > 0
      ? api.getPublicImagePath(values.foodle.images[0].storedName)
      : Chef;

  console.log(auth.getUser());

  return (
    <Container maxWidth="xl">
      <Grid container sx={{ mt: 3 }} spacing={2}>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button
            onClick={() =>
              onShare(
                `Schau dir mal dieses Foodle an 😋\n`,
                ROUTES.public.viewFoodle.path.replace(":id", id)
              )
            }
            startIcon={<ShareIcon />}
          >
            Teilen
          </Button>
          {auth.getUser()?.uid === values.foodle.author?._id && (
            <Button
              onClick={() =>
                navigate(ROUTES.private.editFoodle.path.replace(":id", id))
              }
              startIcon={<EditIcon />}
            >
              Bearbeiten
            </Button>
          )}
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <Card sx={{ padding: 1, textAlign: "center" }}>
            <img
              src={imageSrc}
              style={{ width: "100%", maxHeight: "500px" }}
              alt={values.foodle.title}
            />
          </Card>
          <Typography variant="h4" sx={{ mt: 1 }}>
            {values.foodle.title}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {values.foodle.description}
          </Typography>
          <Typography variant="caption">
            Autor: {values.foodle.author ? values.foodle.author.username : "-"}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Tooltip title="Zeitaufwand">
              <Chip
                icon={<AccessTimeIcon />}
                label={values.foodle.cookingTime || "Unbekannt"}
                variant="outlined"
                size="small"
                onClick={() => {}}
              />
            </Tooltip>
            <Tooltip title="Arbeitsaufwand">
              <Chip
                icon={<TimelapseIcon />}
                label={values.foodle.workTime || "Unbekannt"}
                variant="outlined"
                size="small"
                onClick={() => {}}
              />
            </Tooltip>
            <Tooltip title="Gesamter Aufwand">
              <Chip
                icon={<TimerIcon />}
                label={values.foodle.totalTime || "Unbekannt"}
                variant="outlined"
                size="small"
                onClick={() => {}}
              />
            </Tooltip>
            <Tooltip title="Kalorien (kcal)">
              <Chip
                icon={<CallMadeIcon />}
                label={values.foodle.calories || "Unbekannt"}
                variant="outlined"
                size="small"
                onClick={() => {}}
              />
            </Tooltip>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <IngredientsList data={values.foodle.ingredients} />
        </Grid>
        <Grid item xs={12} md={6} xl={4}>
          <TutorialList data={values.foodle.steps} />
        </Grid>
        <Grid item xs={12} md={12} xl={4}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 350, width: "100%" }}>
                <CardContent
                  sx={{
                    bgcolor: (theme) => theme.palette.secondary.main,
                    py: 0.5,
                  }}
                >
                  <Typography variant="subtitle1" component="div">
                    Vorspeise
                  </Typography>
                </CardContent>

                {[1, 2, 3].map((num) => (
                  <CardActionArea
                    sx={{
                      bgcolor: (theme) => theme.palette.primary.main,
                      py: 0,
                    }}
                    key={num}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        "https://source.unsplash.com/random/300x200?sig=" + num
                      }
                      alt="green iguana"
                    />
                    <CardContent sx={{ py: 0 }}>
                      <Typography variant="h6" component="div">
                        Essen
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                ))}
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ maxWidth: 350, width: "100%" }}>
                <CardContent
                  sx={{
                    bgcolor: (theme) => theme.palette.secondary.main,
                    py: 0.5,
                  }}
                >
                  <Typography variant="subtitle1" component="div">
                    Nachtisch gefällig?
                  </Typography>
                </CardContent>

                {[4, 5, 6].map((num) => (
                  <CardActionArea
                    sx={{
                      bgcolor: (theme) => theme.palette.primary.main,
                      py: 0,
                    }}
                    key={num}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={
                        "https://source.unsplash.com/random/300x200?sig=" + num
                      }
                      alt="green iguana"
                    />
                    <CardContent sx={{ py: 0 }}>
                      <Typography variant="h6" component="div">
                        Lizard
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                ))}
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Foodle;
