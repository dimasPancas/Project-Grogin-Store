import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Grid, Paper, Typography, Avatar, CircularProgress, Box, Rating, Container, IconButton, Tooltip } from '@mui/material';
import { Modal, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { formatDate } from '../../../utils/helpers';

export default function ProductCommentsPage() {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    // Ambil ulasan untuk ID produk yang ditentukan
    axios.get(`https://localhost:7249/product/${id}`)
      .then((response) => {
        if (response.data && Array.isArray(response.data.data)) {
          setComments(response.data.data);
        } else {
          setError('Data ulasan tidak valid');
        }
      })
      .catch(() => {
        setError('Error dalam mengambil ulasan');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleOpen = (index) => {
    setOpen(true);
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNext = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % comments.length);
  };

  const handlePrev = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? comments.length - 1 : prevIndex - 1));
  };

  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center' }}>
        Ulasan Produk
      </Typography>
      <Grid container spacing={3}>
        {loading && (
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
              <CircularProgress />
            </Box>
          </Grid>
        )}
        {error && (
          <Grid item xs={12}>
            <Typography variant="body1" color="error" align="center">
              {error}
            </Typography>
          </Grid>
        )}
        {!loading && !error && comments.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" color="textSecondary" align="center">
              Belum ada ulasan untuk produk ini.
            </Typography>
          </Grid>
        )}
        {!loading && !error && comments.map((comment, index) => (
          <Grid item xs={12} sm={6} md={4} key={comment.id}>
            <Paper variant="outlined" sx={{ padding: 2, borderRadius: 3, boxShadow: 3 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  {comment.userProfile ? (
                    <Avatar src={`https://localhost:7249/Resources/${comment.userProfile}`} alt={comment.userName} />
                  ) : (
                    <Avatar>{comment.userName.charAt(0)}</Avatar>
                  )}
                </Grid>
                <Grid item xs>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{comment.userName}</Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>{comment.commentText}</Typography>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item>
                      <Rating name="rating" value={comment.rating} readOnly />
                    </Grid>
                    <Grid item>
                      <Typography variant="caption" color="textSecondary">
                        {formatDate(comment.commentDate)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {comment.commentImg && (
                  <Grid item>
                    <Tooltip title="Lihat gambar" placement="top">
                      <img src={`https://localhost:7249/Resources/${comment.commentImg}`} alt="Comment" style={{ maxWidth: 100, cursor: 'pointer' }} onClick={() => handleOpen(index)} />
                    </Tooltip>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Box sx={{ position: 'relative', maxWidth: '90%', maxHeight: '90%', overflow: 'hidden' }}>
            <IconButton sx={{ position: 'absolute', top: 0, right: 0, zIndex: 1, bgcolor: '#E9E9E9' }} onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <ImageList sx={{ height: 'auto', width: '500px' }} cols={1}>
              {comments.map((comment, index) => (
                <ImageListItem key={index} sx={{ display: index === selectedImageIndex ? 'block' : 'none' }}>
                  <img src={`https://localhost:7249/Resources/${comment.commentImg}`} alt="Comment" style={{ width: '100%', height: 'auto' }} />
                  <ImageListItemBar
                    title={<Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{comment.userName}</Typography>}
                    subtitle={`${comment.commentText} | ${formatDate(comment.commentDate)}`}
                    actionIcon={<Rating name="rating" value={comment.rating} readOnly />}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <IconButton sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} onClick={handlePrev}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <IconButton sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} onClick={handleNext}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
}
