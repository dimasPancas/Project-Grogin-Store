/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Collapse, TextField, Typography, Box, Card, CardContent, CardActions, Stack, FormHelperText, Grid } from '@mui/material';
import { Rating } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import { PhotoCamera } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function OrderReviewCollapse({ productId, productName, orderDetailId, existingReview, onReviewAdded }) {
  const { authToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [review, setReview] = useState(existingReview);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const formik = useFormik({
    initialValues: {
      commentText: '',
      rating: 0,
      commentImg: null,
    },
    validationSchema: Yup.object({
      commentText: Yup.string()
        .required('Text ulasan harus diisi!')
        .max(100, 'Batas panjang ulasan adalah 100 karakter.'),
      rating: Yup.number()
        .min(1, 'Rating harus minimal 1 bintang.')
        .max(5, 'Rating tidak bisa lebih dari 5 bintang.'),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append('ProductId', productId);
        formData.append('CommentText', values.commentText);
        formData.append('OrderDetailId', orderDetailId);
        formData.append('Rating', values.rating);
        formData.append('CommentImg', values.commentImg);

        const response = await axios.post(`https://localhost:7249/api/Comment/${orderDetailId}`, formData, {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Ulasan berhasil dikirim:', response.data);
        setReview(response.data.data);
        setOpen(false);
        onReviewAdded(response.data.data);
      } catch (error) {
        console.error('Error submitting review:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Box>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button variant='contained' color='primary' onClick={handleOpen} size="small"
          >
            {open ? 'Tutup' : (review ? 'Ulasan Anda' : 'Beri Ulasan')}
          </Button>
        </Grid>
      </Grid>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {review ? (
          <Card sx={{ mt: 2 }}>
            <CardContent sx={{ display: 'block', }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                Ulasan Anda
              </Typography>
              <Typography variant="body1">{review.commentText}</Typography>
              {review.commentImg && (
                <img
                  src={`https://localhost:7249/Resources/${review.commentImg}`}
                  alt="Comment Image"
                  style={{ width: '100px', height: '100px', borderRadius: '10px', display: 'block', marginTop: '10px' }}
                />
              )}
              <Rating value={review.rating} readOnly sx={{ mt: 1 }} />
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {new Date(review.commentDate).toLocaleString('id-ID')}
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                  Ulasan untuk produk: {productName}
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Ulasan"
                  name="commentText"
                  value={formik.values.commentText}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.commentText && Boolean(formik.errors.commentText)}
                  helperText={formik.touched.commentText && formik.errors.commentText}
                  variant="outlined"
                  sx={{ mb: 1 }}
                />
                <Box>
                  <Rating
                    name="rating"
                    value={formik.values.rating}
                    precision={1}
                    onChange={(event, newValue) => {
                      formik.setFieldValue('rating', newValue);
                    }}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.rating && formik.errors.rating && (
                    <FormHelperText error>{formik.errors.rating}</FormHelperText>
                  )}
                </Box>
                <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
                  <input
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={(e) => formik.setFieldValue('commentImg', e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="contained-button-file">
                    <Button variant="outlined" component="span" startIcon={<PhotoCamera />}>
                      Tambahkan Gambar
                    </Button>
                  </label>
                  {formik.values.commentImg && (
                    <img
                      src={URL.createObjectURL(formik.values.commentImg)}
                      alt="Comment Image"
                      style={{ width: '50px', height: '50px', borderRadius: '10px' }}
                    />
                  )}
                </Stack>
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}
                </Button>
              </CardActions>
            </Card>
          </form>
        )}
      </Collapse>
    </Box>
  );
}
