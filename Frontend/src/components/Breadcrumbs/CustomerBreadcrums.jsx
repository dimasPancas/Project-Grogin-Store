import { Breadcrumbs, Link, Typography, Box, Container } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

// Fungsi untuk memeriksa apakah string adalah GUID
function isGuid(str) {
  const pattern = /^[0-9a-f]{8}-([0-9a-f]{4}-){3}[0-9a-f]{12}$/i;
  return pattern.test(str);
}

// Fungsi untuk mengganti semua simbol dengan spasi
function formatBreadcrumb(value) {
  return value.replace(/[^a-zA-Z0-9 ]/g, ' ');
}

// Fungsi untuk menentukan label dari GUID berdasarkan URL path sebelumnya
function getLabelFromPath(path, value) {
  if (isGuid(value)) {
    if (path.includes('histori-pesanan')) return 'Detail Pesanan';
    if (path.includes('produk')) return 'Produk';
    if (path.includes('ulasan')) return 'Detail Ulasan';
    // Tambahkan kondisi lain sesuai kebutuhan
    return 'Detail';
  }
  return formatBreadcrumb(value);
}

export default function CustomerBreadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Container sx={{ mt: 9, py: 1, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Breadcrumbs
          separator="/"
          sx={{
            color: 'text.primary',
            '& .MuiBreadcrumbs-separator': {
              color: 'text.secondary',
              fontSize: '1.2rem',
            },
            '& .MuiBreadcrumbs-li': {
              backgroundColor: '#f5f5f5',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              px: 1
            },
          }}
        >
          <Link component={RouterLink} to="/" color="inherit" underline="hover" sx={{ display: 'flex', alignItems: 'center', fontSize: '1.2rem' }}>
            <HomeIcon sx={{ fontSize: '1.2rem', mr: 0.5 }} />
            Beranda
          </Link>
          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const displayValue = getLabelFromPath(location.pathname, value);

            return last ? (
              <Typography key={to} variant="body1" fontWeight="bold" sx={{ textTransform: 'capitalize', fontSize: '1.2rem', transition: 'color 0.3s ease' }}>
                {displayValue}
              </Typography>
            ) : (
              <Link
                component={RouterLink}
                to={to}
                color="inherit"
                underline="hover"
                key={to}
                sx={{ textTransform: 'capitalize', fontSize: '1.2rem', transition: 'color 0.3s ease', '&:hover': { color: 'primary.main' } }}
              >
                {displayValue}
              </Link>
            );
          })}
        </Breadcrumbs>
      </Box>
    </Container>
  );
}
