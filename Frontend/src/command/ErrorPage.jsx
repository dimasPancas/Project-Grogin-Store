import { Typography, Button, Grid, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <Container>
            <Grid
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "80vh" }}
            >
                <Grid item>
                    <Typography variant="h2" align="center" gutterBottom>
                        Oops! Page Not Found
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" align="center" gutterBottom>
                        We couldnt find the page you were looking for.
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom>
                        It seems like the page you were trying to access either doesnt exist or has been moved.
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        component={Link}
                        to="/"
                        variant="contained"
                        color="primary"
                    >
                        Go back to the homepage
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            backgroundColor: "primary.main",
                            "&:hover": {
                                backgroundColor: "primary.dark",
                            },
                        }}
                        onClick={() => navigate(-1)}
                    >
                        Go back to previous page
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
