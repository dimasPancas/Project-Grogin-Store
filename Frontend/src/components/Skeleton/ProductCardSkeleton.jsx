import { Card, CardMedia, CardContent, Typography, CardActions, Skeleton, Box } from '@mui/material';

const ProductCardSkeleton = () => {
    return (
        <Card sx={{
            borderRadius: 3,
            ":hover": { boxShadow: '0px 0px 3px 3px #634C9F' },
        }}>
            <CardMedia>
                <Skeleton variant="rectangular" height={150} sx={{ borderRadius: 3 }} />
            </CardMedia>
            <CardContent>
                <Typography gutterBottom color='black' variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
                    <Skeleton variant="text" width="100%" />
                </Typography>
                <Typography gutterBottom variant="subtitle2" component="div">
                    <Skeleton variant="text" width="40%" />
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                    <Typography gutterBottom color='grey' variant="subtitle1" component="div">
                        <Skeleton variant="text" width={100} />
                    </Typography>
                    <Typography variant='subtitle1' color='orange'>
                        <Skeleton variant="rectangular" width={40} sx={{ borderRadius: 3 }} />
                    </Typography>
                </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', borderTop: '1px solid #eee' }}>
                <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 3 }} />
                <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: 3 }} />
            </CardActions>
        </Card>
    );
};

export default ProductCardSkeleton;
